import express from 'express';
import { AcademicSemesterController } from './academicSemester.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidation } from './academicSemeter.validation';


const router = express.Router();


router.post(
    '/',
    validateRequest(AcademicSemesterValidation.create), 
    AcademicSemesterController.insertInDB
);

router.get('/',AcademicSemesterController.getAllFromDB)


export const AcademicSemesterRoutes = router;