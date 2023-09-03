import express from 'express';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.routes';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.routes';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: "/academic-semesters",
    route: AcademicSemesterRoutes
  },
  {
    path: "/academic-faculties",
    route: AcademicFacultyRoutes
  }
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
