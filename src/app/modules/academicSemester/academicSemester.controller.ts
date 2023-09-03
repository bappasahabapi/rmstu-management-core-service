import { AcademicSemester } from "@prisma/client";
import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { AcademicSemesterService } from "./academicSemester.service";


const insertInDB = catchAsync(async (req: Request, res: Response) => {
    const result = await AcademicSemesterService.insertInDB(req.body);
    sendResponse<AcademicSemester>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic Semester created successfully",
        data: result
    })

});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {

    //todo: keep the filterable data in one variable
    console.log(req.query);
    const filters=pick(req.query,['searchTerm','code','startMonth','endMonth']);
    const options =pick(req.query,['limit', 'page','sortBy','sortOrder']); //paginations value

    console.log("filters",filters);
    console.log("options",options);



    const result = await AcademicSemesterService.getAllFromDB(filters,options);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: " Retrived Academic Semester data successfully",
        meta: result.meta,
        data: result.data
    })
});

export const AcademicSemesterController = {
    insertInDB,
    getAllFromDB
}