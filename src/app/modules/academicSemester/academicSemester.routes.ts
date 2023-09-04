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

router.get('/',AcademicSemesterController.getAllFromDB);
router.get('/:id',AcademicSemesterController.getDataById);

router.patch(
    '/:id',
    validateRequest(AcademicSemesterValidation.update),
    AcademicSemesterController.updateOneInDB
);

router.delete(
    '/:id',
    AcademicSemesterController.deleteByIdFromDB
);


export const AcademicSemesterRoutes = router;