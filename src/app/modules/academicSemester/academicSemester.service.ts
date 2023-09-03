import { AcademicSemester, Prisma, PrismaClient } from "@prisma/client";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { AcademicSemesterSearchAbleFields } from "./academicSemester.consstants";
import { IAcademicSemesterFilterRequest } from "./academicSemester.interface";

const prisma = new PrismaClient();
const insertInDB = async (academicSemesterData: AcademicSemester): Promise<AcademicSemester> => {
    const result = await prisma.academicSemester.create({
        data: academicSemesterData
    })
    return result;
};

const getAllFromDB = async (filters: IAcademicSemesterFilterRequest, options: IPaginationOptions): Promise<IGenericResponse<AcademicSemester[]>> => {

    //todo: for pagination
    const { page, limit, skip } = paginationHelpers.calculatePagination(options);

    //todo: for filtering data
    // console.log(filters) --> { searchTerm: 'fall', code: '03' }

    const {searchTerm,...filterData}=filters;

    // console.log(filterData)


    // push the search term in the and conditon
    const andConditions =[];

    if(searchTerm){
        andConditions.push({
            // OR:['title','code','startMonth','endMonth'].map((field)=>({
            OR:AcademicSemesterSearchAbleFields.map((field)=>({
                [field]:{
                    contains:searchTerm,
                    mode:'insensitive'
                }
            }))
        })
    }

    //todo: handle the ...filtersdata part

    if(Object.keys(filters).length>0){
        andConditions.push({
            AND: Object.keys(filterData).map((key)=>({
                [key]:{
                    equals:(filterData as any )[key]
                }
            }))
        })
    }

    const whereConditions:Prisma.AcademicSemesterWhereInput= 
    andConditions.length>0 ?{AND:andConditions} : {};

    const result = await prisma.academicSemester.findMany({

        // where:{
        //     OR:[
        //         {
        //             title:{
        //                 contains:searchTerm,
        //                 mode:'insensitive'
        //             }
        //         },
        //         {
        //             code:{
        //                 contains:searchTerm,
        //                 mode:'insensitive'
        //             }
        //         },  
               
        //     ]
            
        // },

        where: whereConditions,

        skip,
        take: limit
    });
    const total = await prisma.academicSemester.count();
    return {
        meta: {
            total,
            page,
            limit
        },
        data: result
    }
}

export const AcademicSemesterService = {
    insertInDB,
    getAllFromDB
}