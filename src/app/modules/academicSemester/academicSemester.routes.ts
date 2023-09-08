import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterController } from './academicSemester.controller';
import { AcademicSemesterValidation } from './academicSemeter.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';


const router = express.Router();


router.post(
    '/',
    auth(ENUM_USER_ROLE.SUPER_ADMIN,ENUM_USER_ROLE.ADMIN),
    validateRequest(AcademicSemesterValidation.create), 
    AcademicSemesterController.insertInDB
);

router.get('/',AcademicSemesterController.getAllFromDB);
router.get('/:id',AcademicSemesterController.getDataById);

router.patch(
    '/:id',
    auth(ENUM_USER_ROLE.SUPER_ADMIN,ENUM_USER_ROLE.ADMIN),
    validateRequest(AcademicSemesterValidation.update),
    AcademicSemesterController.updateOneInDB
);

router.delete(
    '/:id',
    AcademicSemesterController.deleteByIdFromDB
);


export const AcademicSemesterRoutes = router;