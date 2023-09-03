import express from 'express';
import { AcademicFacultyController } from './academicFaculty.controller';


const router= express.Router();

router.post(
    '/',
    AcademicFacultyController.insertInDB
    );


export const AcademicFacultyRoutes=router;