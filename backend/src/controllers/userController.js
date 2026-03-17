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

  const token = await generateToken(user)
  // console.log(token)

  // 5️⃣ Send response
  return res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: 'None'
    })
    .json(new ApiResponse(200, "User logged in successfully",{ user, token }));
});


export { userRegistration, loginUser };
