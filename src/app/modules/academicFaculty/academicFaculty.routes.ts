import express from 'express';
import { AcademicFacultyController } from './academicFaculty.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyValidation } from './academicFaculty.validation';


const router= express.Router();

router.post(
    '/',
    validateRequest(AcademicFacultyValidation.create),
    AcademicFacultyController.insertInDB
    );

router.get('/',AcademicFacultyController.getAllFromDB);
router.get('/:id', AcademicFacultyController.getByIdFromDB);

router.patch(
    '/:id',
    validateRequest(AcademicFacultyValidation.update),
    AcademicFacultyController.updateOneInDB
);

router.delete(
    '/:id',
    AcademicFacultyController.deleteByIdFromDB
);


export const AcademicFacultyRoutes=router;