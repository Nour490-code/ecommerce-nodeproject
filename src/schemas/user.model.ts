import { Schema } from 'mongoose';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const userSchema = new Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  phone: String,
  password: { type: String, required: true },
  role: String,
  profileImg: String,
  isActive: Boolean,
  isVerified: Boolean,
  address: String
});
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  const hash = bcrypt.hashSync(this.password, salt);
  this.password = hash;
  return next();
});
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password).catch((e) => false);
};
const User = mongoose.model('User', userSchema);
export default User;
