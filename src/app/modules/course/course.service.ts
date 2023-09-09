import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import prisma from "../../../shared/prisma";
import { ICourseCreateData } from "./course.interface";


// const insertIntoDB1 = async (data: any): Promise<any> => {
//     // const {preRequisiteCourses,...courseData}=data;

//     // console.log(preRequisiteCourses)
//     // console.log(courseData)
//     const result=await prisma.course.create({
//         data
//     })
//     return result
// }


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const insertIntoDB = async (data: ICourseCreateData): Promise<any> => {
    const { preRequisiteCourses, ...courseData } = data;

    const newCourse = await prisma.$transaction(async (transactionClient) => {
        const result = await transactionClient.course.create({
            data: courseData
        })

        if (!result) {
            throw new ApiError(httpStatus.BAD_REQUEST, "Unable to create course")
        }

        if (preRequisiteCourses && preRequisiteCourses.length > 0) {
            for (let index = 0; index < preRequisiteCourses.length; index++) {
                const createPrerequisite = await transactionClient.courseToPrerequisite.create({
                    data: {
                        courseId: result.id,
                        preRequisiteId: preRequisiteCourses[index].courseId
                    }
                })
                console.log(createPrerequisite)
            }
        }
        return result;
    })

    if (newCourse) {
        const responseData = await prisma.course.findUnique({
            where: {
                id: newCourse.id
            },
            include: {
                preRequisite: {
                    include: {
                        preRequisite: true
                    }
                },
                preRequisiteFor: {
                    include: {
                        course: true
                    }
                }
            }
        })

        return responseData;
    }

    throw new ApiError(httpStatus.BAD_REQUEST, "Unable to create course")
}

export const CourseService = {
    insertIntoDB
}