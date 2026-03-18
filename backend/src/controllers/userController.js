import User from "../users/user.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../middleware/asyncHandler.js";
import generateToken from "../middleware/generateToken.js";


const userRegistration = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // 1️⃣ Validate fields
  if (!username?.trim() || !email?.trim() || !password?.trim()) {
    throw new ApiError(400, "All fields are required");
  }

  // 2️⃣ Check existing user
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  // 3️⃣ Create user
  const user = new User({
    username,
    email,
    password,
  });

  // 4️⃣ Save user
  await user.save();

  // 5️⃣ Remove password from response
  user.password = undefined;

  // 6️⃣ Send response
  return res
    .status(201)
    .json(new ApiResponse(201, "User registered successfully", user));
});

const loginUser = asyncHandler(async (req, res) => {

  const { email, password } = req.body;

  // 1️⃣ Validate fields
  if (!email?.trim() || !password?.trim()) {
    throw new ApiError(400, "Email and password are required");
  }

  // 2️⃣ Find user
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // 3️⃣ Check password
  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid password!");
  }

  // 4️⃣ Remove password
  user.password = undefined;

  const token = generateToken(user)
   console.log(token)

  // 5️⃣ Send response
  return res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax'
    })
    .json(new ApiResponse(200, "User logged in successfully",{ user, token }));
});

const getAllUsers = asyncHandler(async (req, res) => {

  // 🔐 Restrict access to admin only
  if (req.user.role !== 'admin') {
    throw new ApiError(403, "Access denied: Admin only");
  }

  const users = await User.find().select("-password");

  if (users.length === 0) {
    throw new ApiError(404, "No users found");
  }

  return res.status(200).json(
    new ApiResponse(200, users, "Users fetched successfully")
  );
});


const deleteUser = asyncHandler(async (req, res) => {

  const { id } = req.params;

  // 1️⃣ Check if user is admin
  if (req.user.role !== "admin") {
    throw new ApiError(403, "Access denied. Admins only");
  }

  // 2️⃣ Delete user
  const user = await User.findByIdAndDelete(id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // 3️⃣ Send response
  return res
    .status(200)
    .json(new ApiResponse(200, null, "User deleted successfully"));
});

const updateUserRole = asyncHandler(async (req, res) => {
  const { userId } = req.params
  const { role } = req.body

  // console.log(req)

  const allowedRoles = ['admin', 'user']
  if (!allowedRoles.includes(role)) {
    throw new ApiError(400, "Invalid role")
  }

  // prevent self role change
  if (req.user.userId === userId) {
    throw new ApiError(400, "You cannot change your own role")
  }

  const user = await User.findByIdAndUpdate(
    userId,
    { role },
    { new: true }
  ).select("-password")

  // console.log(user)

  if (!user) {
    throw new ApiError(404, "User not found")
  }

  return res.status(200).json(
    new ApiResponse(200, user, "User role updated successfully")
  )
})

const updateUserProfile = asyncHandler(async (req, res) => {
  const userId = req.user.userId;

  const {
    username,
    email,
    password,
    profileImage,
    profession,
    bio,
  } = req.body;

  let user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // update fields
  if (username) user.username = username;

  if (email && email !== user.email) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ApiError(400, "Email already in use");
    }
    user.email = email;
  }

  if (password) user.password = password;
  if (profileImage) user.profileImage = profileImage;
  if (profession) user.profession = profession;
  if (bio) user.bio = bio;

  await user.save();

  // ✅ Fetch updated user WITHOUT password
  const updatedUser = await User.findById(userId).select("-password");

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    user: updatedUser,
  });
});


const logoutUser = asyncHandler(async (req, res) => {
  return res
        .status(200)
        .clearCookie("token", {
            httpOnly: true,
            secure: true,      // change to true in production
            sameSite: "Lax"
        })
        .json(
            new ApiResponse(200, null, "User logged out successfully")
        );
})


export { userRegistration, loginUser, getAllUsers, updateUserProfile, updateUserRole, logoutUser, deleteUser };
