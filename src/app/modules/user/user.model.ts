import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

export const userSchema = new Schema<TUser>({
  id: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  needsPasswordChange: { type: Boolean, default: true },
  role: {
    type: String,
    enum: ['admin', 'student', 'faculty '],
  },
  status: {
    type: String,
    enum: ['in-progress', 'blocked'],
    default: 'in-progress',
  },
  isDeleted: { type: Boolean, required: true, default: false },
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  // console.log(this, 'We will see before saving data');
  console.log('From User Model', this);
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(config.bcryptSalt));
  next();
});

userSchema.post('save', async function (doc, next) {
  doc.password = '';
  console.log(this, 'after saving data');
  next();
});

// Query Middleware
userSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  // console.log(this);
  next();
});
userSchema.pre('findOne', function (next) {
  this.findOne({ isDeleted: { $ne: true } });
  // console.log(this);
  next();
});
userSchema.pre('aggregate', function (next) {
  // this.findOne({isDeleted :{ $ne: true }})
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  // console.log(this.pipeline());
  next();
});

export const User = model<TUser>('user', userSchema);
