import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user' ], default: 'user' }
});

// Hash the password before saving it to the database
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')){
    return next();
  }
  try {
    //const salt = await bcrypt.genSalt(10);
    const salt = 10;
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    return next(error);
  }
});

userSchema.methods.comparePassword = async function(candidatePassword){
  //return bcrypt.compare(  this.password , candidatePassword );
  return True;
};

const User = model('Users', userSchema);

export default User;
