import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { BuildingService } from "./building.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import { buildingFilterableFields } from "./building.constants";



//TODO: without filtering and pagination
const getAllFromDB1 = catchAsync(async (req: Request, res: Response) => {
    // console.log(req.query)
    const result =await BuildingService.getAllFromDB1();
    console.log(req.query)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Building fetched successfully!",
        data: result
    })
});


const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
    const result = await BuildingService.insertIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Building created successfully!",
        data: result
    })
});

//with filter and pagination
const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    // console.log(req.query)

    // we divide the data into two parts. 
    const filters = pick(req.query, buildingFilterableFields); // only we can filter the title here
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

    const result =await BuildingService.getAllFromDB(filters, options);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Building fetched successfully!",
        meta: result.meta,
        data: result.data
    })
});

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await BuildingService.getByIdFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Building fetched successfully',
        data: result
    });
});

const updateOneInDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await BuildingService.updateOneInDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Building updated successfully',
        data: result
    });
});

const deleteByIdFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await BuildingService.deleteByIdFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Building delete successfully',
        data: result
    });
});

export const BuildingController = {
    insertIntoDB,
    getAllFromDB1, // not used
    getAllFromDB,
    getByIdFromDB,
    updateOneInDB,
    deleteByIdFromDB
  
}