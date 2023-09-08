import express from 'express';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.routes';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.routes';
import { academicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.routes';
import { facultyRoutes } from '../modules/faculty/faculty.routes';
import { studentRoutes } from '../modules/student/student.routes';
import { buildingRoutes } from '../modules/building/building.routes';
import { roomRoutes } from '../modules/room/room.routes';

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
  },
  {
    path: '/academic-departments',
    route: academicDepartmentRoutes
  },
  {
    path: '/faculties',
    route: facultyRoutes
  },
  {
    path: '/students',
    route: studentRoutes
  },
  {
    path: '/buildings',
    route: buildingRoutes
  },
  {
    path: '/rooms',
    route: roomRoutes
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
