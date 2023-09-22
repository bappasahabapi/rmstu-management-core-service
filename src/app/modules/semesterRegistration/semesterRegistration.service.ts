/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma, SemesterRegistration, SemesterRegistrationStatus, StudentSemesterRegistration } from "@prisma/client";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import prisma from "../../../shared/prisma";
import { IGenericResponse } from "../../../interfaces/common";
import { IEnrollCoursePayload, ISemesterRegistrationFilterRequest } from "./semesterRegistration.interface";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { semesterRegistrationRelationalFields, semesterRegistrationRelationalFieldsMapper, semesterRegistrationSearchableFields } from "./semesterRegistration.constants";

const insertIntoDB = async (data: SemesterRegistration): Promise<SemesterRegistration> => {

    const isAnySemesterRegUpcomingOrOngoing = await prisma.semesterRegistration.findFirst({
        where: {
            OR: [
                {
                    status: SemesterRegistrationStatus.UPCOMING
                },
                {
                    status: SemesterRegistrationStatus.ONGOING
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

const getAllFromDB = async (
    filters: ISemesterRegistrationFilterRequest,
    options: IPaginationOptions
): Promise<IGenericResponse<SemesterRegistration[]>> => {
    const { limit, page, skip } = paginationHelpers.calculatePagination(options);
    const { searchTerm, ...filterData } = filters;

    const andConditions = [];

    if (searchTerm) {
        andConditions.push({
            OR: semesterRegistrationSearchableFields.map((field) => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive'
                }
            }))
        });
    }

    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map((key) => {
                if (semesterRegistrationRelationalFields.includes(key)) {
                    return {
                        [semesterRegistrationRelationalFieldsMapper[key]]: {
                            id: (filterData as any)[key]
                        }
                    };
                } else {
                    return {
                        [key]: {
                            equals: (filterData as any)[key]
                        }
                    };
                }
            })
        });
    }

    const whereConditions: Prisma.SemesterRegistrationWhereInput =
        andConditions.length > 0 ? { AND: andConditions } : {};

    const result = await prisma.semesterRegistration.findMany({
        include: {
            academicSemester: true
        },
        where: whereConditions,
        skip,
        take: limit,
        orderBy:
            options.sortBy && options.sortOrder
                ? { [options.sortBy]: options.sortOrder }
                : {
                    createdAt: 'desc'
                }
    });
    const total = await prisma.semesterRegistration.count({
        where: whereConditions
    });

    return {
        meta: {
            total,
            page,
            limit
        },
        data: result
    };
};

const getByIdFromDB = async (id: string): Promise<SemesterRegistration | null> => {
    const result = await prisma.semesterRegistration.findUnique({
        where: {
            id
        },
        include: {
            academicSemester: true
        }
    });
    return result;
};

const deleteByIdFromDB = async (id: string): Promise<SemesterRegistration> => {
    const result = await prisma.semesterRegistration.delete({
        where: {
            id
        },
        include: {
            academicSemester: true
        }
    });
    return result;
};

//handle the status : UPCOMING->ONGOING->ENDED [ONE DIRECTIONAL]


const updateOneInDB = async (
    id: string,
    payload: Partial<SemesterRegistration>
): Promise<SemesterRegistration> => {

    console.log(payload.status);

    // check if the id exist or not
    const isExist = await prisma.semesterRegistration.findUnique({
        where: {
            id
        }
    })

    if (!isExist) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Data not found!")
    }

    if (payload.status && isExist.status === SemesterRegistrationStatus.UPCOMING && payload.status !== SemesterRegistrationStatus.ONGOING) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Can only move from UPCOMING to ONGOING")
    }

    if (payload.status && isExist.status === SemesterRegistrationStatus.ONGOING && payload.status !== SemesterRegistrationStatus.ENDED) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Can only move from ONGOING to ENDED")
    }

    const result = await prisma.semesterRegistration.update({
        where: {
            id
        },
        data: payload,
        include: {
            academicSemester: true
        }
    })

    return result;
};

//todo: ----------------- Start Registration is started ---------------------

const startMyRegistration = async (authUserId: string): Promise<{
    semesterRegistration: SemesterRegistration | null,
    studentSemesterRegistration: StudentSemesterRegistration | null
}> => {
    const studentInfo = await prisma.student.findFirst({
        where: {
            studentId: authUserId
        }
    });
    // console.log(studentInfo)
    if (!studentInfo) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Student Info not found!")
    }

    const semesterRegistrationInfo = await prisma.semesterRegistration.findFirst({
        where: {
            status: {
                in: [SemesterRegistrationStatus.ONGOING, SemesterRegistrationStatus.UPCOMING]
            }
        }
    })
    // console.log(semesterRegistrationInfo)

    if (semesterRegistrationInfo?.status === SemesterRegistrationStatus.UPCOMING) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Registration is not started yet")
    }

    let studentRegistration = await prisma.studentSemesterRegistration.findFirst({
        where: {
            student: {
                id: studentInfo?.id
            },
            semesterRegistration: {
                id: semesterRegistrationInfo?.id
            }
        }
    });
    // console.log(studentRegistration)


    if (!studentRegistration) {
        studentRegistration = await prisma.studentSemesterRegistration.create({
            data: {
                student: {
                    connect: {
                        id: studentInfo?.id
                    }
                },
                semesterRegistration: {
                    connect: {
                        id: semesterRegistrationInfo?.id
                    }
                }
            }
        })
    }

    return {
        semesterRegistration: semesterRegistrationInfo,
        studentSemesterRegistration: studentRegistration
    }
};


const enrollIntoCourse = async (authUserId: string, payload: IEnrollCoursePayload
    // payload: {
    // offeredCourseId:string,
    // offeredCourseSectionId:string
    // }
) => {
    // console.log(authUserId,payload)
    // return studentSemesterRegistrationCourseService.enrollIntoCourse(authUserId, payload)


    const student = await prisma.student.findFirst({
        where: {
            studentId: authUserId
        }
    });
    // console.log(student);

    const semesterRegistration = await prisma.semesterRegistration.findFirst({
        where: {
            status: SemesterRegistrationStatus.ONGOING
        }
    });
    // console.log(semesterRegistration);

    const offeredCourse = await prisma.offeredCourse.findFirst({
        where: {
            id: payload.offeredCourseId
        },
        include: {
            course: true
        }
    })

    const offeredCourseSection = await prisma.offeredCourseSection.findFirst({
        where: {
            id: payload.offeredCourseSectionId
        }
    })

    if (!student) {
        throw new ApiError(httpStatus.NOT_FOUND, "Student not found");
    }
    if (!semesterRegistration) {
        throw new ApiError(httpStatus.NOT_FOUND, "Semester Registration not found!")
    }

    if (!offeredCourse) {
        throw new ApiError(httpStatus.NOT_FOUND, "Offered Course not found!")
    }
    if (!offeredCourseSection) {
        throw new ApiError(httpStatus.NOT_FOUND, "Offered Course Section not found!")
    }

    // const enrollCourse=await prisma.studentSemesterRegistrationCourse.create({
    //     data:{
    //         studentId:student?.id,
    //         semesterRegistrationId:semesterRegistration?.id,
    //         offeredCourseId:payload.offeredCourseId,
    //         offeredCourseSectionId:payload.offeredCourseSectionId
    //     }
    // })
    // return enrollCourse

    if (
        offeredCourseSection.maxCapacity &&
        offeredCourseSection.currentlyEnrolledStudent &&
        offeredCourseSection.currentlyEnrolledStudent >= offeredCourseSection.maxCapacity
    ) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Student capacity is full!")
    }

    await prisma.$transaction(async (transactionClient) => {
        await transactionClient.studentSemesterRegistrationCourse.create({
            data: {
                studentId: student?.id,
                semesterRegistrationId: semesterRegistration?.id,
                offeredCourseId: payload.offeredCourseId,
                offeredCourseSectionId: payload.offeredCourseSectionId
            }
        });

        await transactionClient.offeredCourseSection.update({
            where: {
                id: payload.offeredCourseSectionId
            },
            data: {
                currentlyEnrolledStudent: {
                    increment: 1
                }
            }
        });


        await transactionClient.studentSemesterRegistration.updateMany({
            where: {
                student: {
                    id: student.id
                },
                semesterRegistration: {
                    id: semesterRegistration.id
                }
            },
            data: {
                totalCreditsTaken: {
                    increment: offeredCourse.course.credits
                }
            }
        })

    });

    return {
        message: "Successfully enrolled into course"
    };

}

export const SemesterRegistrationService = {
    insertIntoDB,
    getAllFromDB,
    getByIdFromDB,
    deleteByIdFromDB,
    updateOneInDB,
    startMyRegistration,
    enrollIntoCourse
}