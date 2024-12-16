import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({ createdAt: -1 })
    .lean();

  return lastStudent?.id ? lastStudent.id : undefined;
};
const findLastAdminId = async () => {
  const result = await User.findOne(
    {
      role: 'admin',
    },
    {
      _id: 0,
      id: 1,
    },
  )
    .sort({ createdAt: -1 })
    .lean();
  console.log('Result Print Kori Wait : ', result);
  return result?.id ? result.id : undefined;
};
const findLastFacultyId = async () => {
  const result = await User.findOne(
    {
      role: 'faculty',
    },
    {
      _id: 0,
      id: 1,
    },
  )
    .sort({ createdAt: -1 })
    .lean();
  return result?.id ? result.id : undefined;
};

export const generateStudentId = async (payload: TAcademicSemester) => {
  let currentId = (0).toString();

  const lastStudentId = await findLastStudentId();

  const lastStudentSemesterYear = lastStudentId?.substring(0, 4);
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6);

  const currentStudentSemesterYear = payload.year;
  const currentStudentSemesterCode = payload.code;

  if (
    lastStudentId &&
    lastStudentSemesterCode === currentStudentSemesterCode &&
    lastStudentSemesterYear === currentStudentSemesterYear
  ) {
    currentId = lastStudentId?.substring(6);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `${payload.year}${payload.code}${incrementId}`;

  return incrementId;
};
export const generateAdminId = async () => {
  let currentId = (0).toString();

  const lastAdminId = await findLastAdminId();

  if (lastAdminId) {
    console.log('Last Admin ID dekh hala ', lastAdminId);
    currentId = lastAdminId.substring(2);
    console.log('Ekn CUrrent ID dekho ', currentId);
  }
  // const lastStudentSemesterYear = lastStudentId?.substring(0,4);
  // const lastStudentSemesterCode = lastStudentId?.substring(4,6);

  // const currentStudentSemesterYear = payload.year;
  // const currentStudentSemesterCode = payload.code;

  // if(lastStudentId
  //   && lastStudentSemesterCode === currentStudentSemesterCode
  //   && lastStudentSemesterYear === currentStudentSemesterYear
  // ){
  //   currentId = lastStudentId?.substring(6)
  // }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `A-${incrementId}`;

  return incrementId;
};
export const generateFacultyId = async () => {

  let currentId = (0).toString();

  const lastFacultyId = await findLastFacultyId();

  if (lastFacultyId) {
    currentId = lastFacultyId.substring(2);
  }
  // const lastStudentSemesterYear = lastStudentId?.substring(0,4);
  // const lastStudentSemesterCode = lastStudentId?.substring(4,6);

  // const currentStudentSemesterYear = payload.year;
  // const currentStudentSemesterCode = payload.code;

  // if(lastStudentId
  //   && lastStudentSemesterCode === currentStudentSemesterCode
  //   && lastStudentSemesterYear === currentStudentSemesterYear
  // ){
  //   currentId = lastStudentId?.substring(6)
  // }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  incrementId = `F-${incrementId}`;

  return incrementId;
};
