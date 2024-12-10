import { TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';


const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

const updateAcademicFacultyFromDB = async(id:string,payload:Partial<TAcademicFaculty>)=>{

    const result = await AcademicFaculty.findOneAndUpdate({_id:id},payload,{new:true});
    return result;
}

const getAllAcademicFaculties = async () => {
  const result = await AcademicFaculty.find();
  return result;
};

const getSingleAcademicFaculty = async (id: string) => {
  const result = await AcademicFaculty.findById({ _id: id });
  return result;
};

export const AcademicFacultyServices = {
  createAcademicFacultyIntoDB,
  getAllAcademicFaculties,
  getSingleAcademicFaculty,
  updateAcademicFacultyFromDB
};
