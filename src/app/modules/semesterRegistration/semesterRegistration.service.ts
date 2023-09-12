import { SemesterRegistration, SemesterRegistrationStatus } from "@prisma/client";
import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";

const insertIntoDB =async(data:SemesterRegistration):Promise<SemesterRegistration > =>{

    const isAnySemesterRegUpcomingOrOngoing =await prisma.semesterRegistration.findFirst({
        where:{
            OR:[
                {
                    status:SemesterRegistrationStatus.UPCOMING
                },
                {
                    status:SemesterRegistrationStatus.ONGING
                }
            ]
        }
    });

    if (isAnySemesterRegUpcomingOrOngoing) {
        throw new ApiError(httpStatus.BAD_REQUEST,
            `Thers is already an ${isAnySemesterRegUpcomingOrOngoing.status} registration.`
        )
    }



    const result = await prisma.semesterRegistration.create({
        data
    });

    return result
};

export const SemesterRegistrationService={
    insertIntoDB
}