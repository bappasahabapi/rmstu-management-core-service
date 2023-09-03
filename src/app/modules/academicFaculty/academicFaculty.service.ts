import { AcademicFaculty, Prisma } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IGenericResponse } from "../../../interfaces/common";
import { IAcademicFacultyFilterRequest } from "./academicFaculty.interface";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { academicFacultySearchableFields } from "./academicFaculty.constants";


const insertInDB = async (data: AcademicFaculty): Promise<AcademicFaculty> => {
    const result = await prisma.academicFaculty.create({
        data
    })
    return result;
};

const getAllFromDB = async (
    filters: IAcademicFacultyFilterRequest,
    options: IPaginationOptions
): Promise<IGenericResponse<AcademicFaculty[]>> => {

    //* for pagination 
    const { page, limit, skip } = paginationHelpers.calculatePagination(options);
    const { searchTerm, ...filterData } = filters;

    const andConditions = [];

    if (searchTerm) {
        andConditions.push({
            OR: academicFacultySearchableFields.map((field) => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive'
                }
            }))
        });
    }

    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map((key) => ({
                [key]: {
                    equals: (filterData as any)[key]
                }
            }))
        });
    }

    const whereConditions: Prisma.AcademicFacultyWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};


    const result = await prisma.academicFaculty.findMany({
        // where: whereConditions,
        skip,
        take: limit,
        orderBy:
            options.sortBy && options.sortOrder
                ? { [options.sortBy]: options.sortOrder }
                : {
                    createdAt: 'desc'
                }
    });

    const total = await prisma.academicFaculty.count({
        where: whereConditions
    });
    return{
        meta:{
            total,
            page,
            limit
        },
        data:result
    };

};

const getByIdFromDB = async (id: string): Promise<AcademicFaculty | null> => {
    const result = await prisma.academicFaculty.findUnique({
        where: {
            id
        }
    });
    return result;
};



export const AcademicFacultyService = {
    insertInDB,
    getAllFromDB,
    getByIdFromDB
}