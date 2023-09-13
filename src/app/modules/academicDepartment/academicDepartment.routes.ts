import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentController } from './academicDepartment.controller';
import { AcademicDepartmentValidation } from './academicDepartment.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';


const router = express.Router();

router.get('/', AcademicDepartmentController.getAllFromDB);
router.get('/:id', AcademicDepartmentController.getByIdFromDB);

router.post(
    '/',
    // auth(ENUM_USER_ROLE.SUPER_ADMIN,ENUM_USER_ROLE.ADMIN),
    validateRequest(AcademicDepartmentValidation.create),
    AcademicDepartmentController.insertIntoDB
);

router.delete(
    '/:id',
    auth(ENUM_USER_ROLE.SUPER_ADMIN,ENUM_USER_ROLE.ADMIN),
    AcademicDepartmentController.deleteByIdFromDB
);


router.patch(
    '/:id',
    validateRequest(AcademicDepartmentValidation.update),
    AcademicDepartmentController.updateOneInDB
);


export const academicDepartmentRoutes = router;