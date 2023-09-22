import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { SemesterRegistrationService } from "./semesterRegistration.service";
import pick from "../../../shared/pick";
import { semesterRegistrationFilterableFields } from "./semesterRegistration.constants";

const insertIntoDB=catchAsync(async(req:Request,res:Response) =>{
    const result =await SemesterRegistrationService.insertIntoDB(req.body);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Semester Registration successfully created",
        data:result
    })
    // console.log(result);
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, semesterRegistrationFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await SemesterRegistrationService.getAllFromDB(filters, options);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'SemestervRegistrations are fetched successfully',
        meta: result.meta,
        data: result.data
    });
});

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await SemesterRegistrationService.getByIdFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'SemesterRegistration fetched successfully',
        data: result
    });
});

const deleteByIdFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await SemesterRegistrationService.deleteByIdFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'SemesterRegistration deleted successfully',
        data: result
    });
});

const updateOneInDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await SemesterRegistrationService.updateOneInDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Semester Registration updated successfully',
        data: result
    });
});


const startMyRegistration = catchAsync(async (req: Request, res: Response) => {

    const user = (req as any).user;
    // console.log(user)
    const result = await SemesterRegistrationService.startMyRegistration(user.userId)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student SemesterRegistration started successfully',
        data: result
    });
});

const enrollIntoCourse = catchAsync(async (req: Request, res: Response) => {
    const user = (req as any).user;
    console.log(user)
    const result = await SemesterRegistrationService.enrollIntoCourse(user.userId, req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student SemesterRegistration course enrolled successfully',
        data: result
    });
});

const withdrawFromCourse = catchAsync(async (req: Request, res: Response) => {

    const user = (req as any).user;
    const result = await SemesterRegistrationService.withdrewFromCourse(user.userId, req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student Withdraw from course successfully',
        data: result
    });
});

const confirmMyRegistration = catchAsync(async (req: Request, res: Response) => {

    const user = (req as any).user;
    const result = await SemesterRegistrationService.confirmMyRegistration(user.userId)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Confirm your registration!',
        data: result
    });
})




export const SemesterRegistrationController={
    insertIntoDB,
    getAllFromDB,
    getByIdFromDB,
    deleteByIdFromDB,
    updateOneInDB,
    startMyRegistration,
    enrollIntoCourse,
    withdrawFromCourse,
    confirmMyRegistration
}