import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { AcademicFacultyService } from "./academicFaculty.service";
import sendResponse from "../../../shared/sendResponse";
import { AcademicFaculty } from "@prisma/client";
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import { academicFacultyFilterableFields } from "./academicFaculty.constants";


const insertInDB =catchAsync(async(req:Request,res:Response) => {
    const result =await AcademicFacultyService.insertInDB(req.body);
    sendResponse<AcademicFaculty>(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Academic Faculty created successfully",
        data:result
    })
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, academicFacultyFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await AcademicFacultyService.getAllFromDB(filters, options);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'AcademicFaculties fetched successfully',
        meta: result.meta,
        data: result.data
    });
});


export const AcademicFacultyController ={
    insertInDB,
    getAllFromDB
};