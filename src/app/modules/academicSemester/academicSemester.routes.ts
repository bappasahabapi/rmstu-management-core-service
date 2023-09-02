import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterController } from './academicSemester.controller';
import { AcademicSemesterValidation } from './academicSemeter.validation';


const router = express.Router();


router.post(
    '/',
    validateRequest(AcademicSemesterValidation.create), 
    AcademicSemesterController.insertInDB
);

router.get('/',AcademicSemesterController.getAllFromDB)


export const AcademicSemesterRoutes = router;