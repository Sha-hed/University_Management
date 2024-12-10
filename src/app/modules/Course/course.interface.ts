import { Types } from 'mongoose';

export type TPrerequisite = {
  course: Types.ObjectId;
  isDeleted: boolean;
};
export type TCourse = {
  title: string;
  prefix: string;
  code: number;
  credits: number;
  preRequisiteCourses: TPrerequisite[];
};
