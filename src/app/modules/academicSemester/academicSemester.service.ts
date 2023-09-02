import { AcademicSemester, PrismaClient } from "@prisma/client";
import { IGenericResponse } from "../../../interfaces/common";
import { paginationHelpers } from "../../../helpers/paginationHelper";



const prisma =new PrismaClient();

const insertInDB=async (academicSemesterData:AcademicSemester):Promise<AcademicSemester> =>{
    const result = await prisma.academicSemester.create({
        data:academicSemesterData
    })
    return result;
};

const getAllFromDB =async(filters,options):Promise<IGenericResponse<AcademicSemester[]>> =>{

    //todo: for pagination
    const {page,limit,skip}=paginationHelpers.calculatePagination(options);


    const result =await prisma.academicSemester.findMany({
        skip,
        take:limit
    });
    const total =await prisma.academicSemester.count();
    return{
        meta:{
            total,
            page,
            limit
        },
        data:result
    }
}

export const AcademicSemesterService ={
    insertInDB,
    getAllFromDB
}