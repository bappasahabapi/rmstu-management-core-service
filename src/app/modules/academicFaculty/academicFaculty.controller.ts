import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { AcademicFacultyService } from "./academicFaculty.service";
import sendResponse from "../../../shared/sendResponse";
import { AcademicFaculty } from "@prisma/client";
import httpStatus from "http-status";


const insertInDB =catchAsync(async(req:Request,res:Response) => {
    const result =await AcademicFacultyService.insertInDB(req.body);
    sendResponse<AcademicFaculty>(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Academic Faculty created successfully",
        data:result
    })
});


export const AcademicFacultyController ={
    insertInDB
};