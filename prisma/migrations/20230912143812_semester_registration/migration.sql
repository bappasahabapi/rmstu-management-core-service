-- CreateEnum
CREATE TYPE "SemesterRegistrationStatus" AS ENUM ('UPCOMING', 'ONGING', 'ENDED');

-- CreateTable
CREATE TABLE "SemesterRegistration" (
    "id" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "status" "SemesterRegistrationStatus" DEFAULT 'UPCOMING',
    "minCredit" INTEGER NOT NULL,
    "maxCredit" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "academicSemesId" TEXT NOT NULL,

    CONSTRAINT "SemesterRegistration_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SemesterRegistration" ADD CONSTRAINT "SemesterRegistration_academicSemesId_fkey" FOREIGN KEY ("academicSemesId") REFERENCES "academic_semesters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
