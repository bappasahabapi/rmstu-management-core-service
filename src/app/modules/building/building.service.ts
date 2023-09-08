import { Building, Prisma } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IBuildingFilterRequest } from "./building.interface";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IGenericResponse } from "../../../interfaces/common";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { buildingSearchableFields } from "./building.constants";




// //TODO: without filtering and pagination 
const getAllFromDB1= async ()=>{
    const result =await prisma.building.findMany();
    return result;
};

// -------  starts from here

const insertIntoDB = async (data: Building): Promise<Building> => {
    const result = await prisma.building.create({
        data
    })
    return result;
};

//with filtering and paginatioin
const getAllFromDB= async (
    filters:IBuildingFilterRequest,
    options:IPaginationOptions
):Promise<IGenericResponse<Building[]>> =>{

    const { page, limit, skip } = paginationHelpers.calculatePagination(options);
    const { searchTerm } = filters;


    const andConditons = [];

    if (searchTerm) {
        andConditons.push({
            OR: buildingSearchableFields.map((field) => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive'
                }
            }))
        })
    }

    //As we do not have the filter data thats we dont use that code of filters
    // {
    //     ...filters data
    // }

    
    const whereConditons: Prisma.BuildingWhereInput =
    andConditons.length > 0 ? { AND: andConditons } : {};

    const result = await prisma.building.findMany({
        skip,
        take: limit,
        where: whereConditons,
        orderBy: options.sortBy && options.sortOrder
            ? {
                [options.sortBy]: options.sortOrder
            }
            : {
                createdAt: 'desc'
            }
    });

    const total = await prisma.building.count({
        where: whereConditons
    });

    return {
        meta: {
            page,
            limit,
            total
        },
        data: result
    };
};

const getByIdFromDB = async (id: string): Promise<Building | null> => {
    const result = await prisma.building.findUnique({
        where: {
            id
        }
    });
    return result;
};

const updateOneInDB = async (id: string, payload: Partial<Building>): Promise<Building> => {
    const result = await prisma.building.update({
        where: {
            id
        },
        data: payload
    });
    return result;
};

const deleteByIdFromDB = async (id: string): Promise<Building> => {
    const result = await prisma.building.delete({
        where: {
            id
        }
    });
    return result;
};



export const BuildingService = {
    insertIntoDB,
    getAllFromDB1, //not used
    getAllFromDB,
    getByIdFromDB,
    updateOneInDB,
    deleteByIdFromDB
    
}