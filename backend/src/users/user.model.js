import mongoose from 'mongoose'
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
     username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user"
    },
    profileImage: String,
    bio: {
        type: String,
        maxlength: 200,       
    },
    profession: String,
    createdAt: {
            type: Date,
            default: Date.now
    }
})


userSchema.pre("save", async function () {
  try {
    // console.log("Pre-save hook triggered");

    if (!this.isModified("password")) {
    //   console.log("Password not modified, skipping hash");
      return;
    }

    // console.log("Hashing password...");
    this.password = await bcrypt.hash(this.password, 10);
    // console.log("Password hashed successfully");
    
  } catch (error) {
    console.error("Error in pre-save hook:", error);
    throw error;
  }
});

userSchema.methods.isPasswordCorrect = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    console.error("Error in isPasswordCorrect method:", error);
    throw error;
  }
};


const User = mongoose.model("User", userSchema)
export default User