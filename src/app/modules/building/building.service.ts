import { Building, Prisma } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IBuildingFilterRequest } from "./building.interface";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IGenericResponse } from "../../../interfaces/common";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { buildingSearchableFields } from "./building.constants";

const insertIntoDB = async (data: Building): Promise<Building> => {
    const result = await prisma.building.create({
        data
    })
    return result;
}


// //TODO: without filtering and pagination
const getAllFromDB1= async ()=>{
    const result =await prisma.building.findMany();
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



export const BuildingService = {
    insertIntoDB,
    getAllFromDB1, //not used
    getAllFromDB
    
}