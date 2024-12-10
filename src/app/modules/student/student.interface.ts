
import { Types } from 'mongoose';

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};
export type TLocalGuardian = {
  name: string;
  occupation: string;
  address: string;
  contactName: string;
};

export type TStudent = {
  id: string;
  user : Types.ObjectId;
  name: TUserName;
  gender: 'Male' | 'Female' | 'Other';
  dateOfBirth: string;
  email: string;
  contactNumber: string;
  emergencyContactNo: string;
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  admissionSemester : Types.ObjectId;
  admissionDepartment : Types.ObjectId;
  profileImg?: string;
  isDeleted: boolean
};

// For Creating Static Model

// export interface StudentModel extends Model<TStudent> {

//   isUserExists(id: string): Promise<TStudent | null>;

// }





// Creating a custom  instance method 

// export type StudentMethod = {
//   isUserExists(id: string): Promise<TStudent | null>;
// };

// export type StudentModel = Model<TStudent, Record<string, never>, StudentMethod>;
