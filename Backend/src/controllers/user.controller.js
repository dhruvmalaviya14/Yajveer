import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/Apierror.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { sendOtpMail } from "../utils/mail.js";
import { otp } from "../models/otp.model.js";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generting refresh and access token"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { email, password, mobileNumber } = req.body;
  console.log(email);
  console.log(req.body);
  if (
    // console.log(email);
    [email, password, mobileNumber].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email already exists");
  }

  const user = await User.create({
    email,
    password,
    mobileNumber,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  if (!email) {
    throw new ApiError(400, "email is required");
  }

  const user = await User.findOne({
    $or: [{ email }],
  });

  if (!user) {
    throw new ApiError(404, "User Does not exist");
  }

  const ispasswordvalid = await user.ispasswordcorrect(password);

  if (!ispasswordvalid) {
    throw new ApiError(401, "Password is incorrect");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshtoken"
  );

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 24 * 60 * 60 * 1000,
    // domain : "https://yajveerback.vercel.app"
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged In Successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  if (!req.user?._id) {
    throw new ApiError(401, "Unauthorized: No user to log out");
  }
  console.log("Finding successfully !!");
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: null,
      },
    },
    { new: true }
  );

  const isProduction = process.env.NODE_ENV === "production";

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 24 * 60 * 60 * 1000,
    // domain : "https://yajveerback.vercel.app"
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({ success: true, message: "Logged out successfully" });
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) throw new ApiError(400, "Email is required");

  const user = await User.findOne({ email });
  if (!user) throw new ApiError(404, "User not found");

  const otpnew = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 min

  await otp.deleteMany({ email });
  await otp.create({ email, code: otpnew, expiresAt });

  await sendOtpMail(email, otpnew);

  res.json(new ApiResponse(200, null, "OTP sent to your email"));
});

const verifyOtp = asyncHandler(async (req, res) => {
  const { email, code } = req.body;
  if (!code) throw new ApiError(400, "Email and OTP are required");

  const otpRecord = await otp.findOne({ email, code });
  if (!otpRecord || otpRecord.expiresAt < new Date()) {
    throw new ApiError(400, "Invalid or expired OTP");
  }

  res.json(new ApiResponse(200, null, "OTP verified"));
});

const resetPassword = asyncHandler(async (req, res) => {
  const { email, code, newPassword } = req.body;
  if (!email || !code || !newPassword)
    throw new ApiError(400, "All fields are required");

  const otpRecord = await otp.findOne({ email, code });
  if (!otpRecord || otpRecord.expiresAt < new Date()) {
    throw new ApiError(400, "Invalid or expired OTP");
  }

  const user = await User.findOne({ email });
  if (!user) throw new ApiError(404, "User not found");

  user.password = newPassword;
  await user.save();
  await otp.deleteMany({ email });

  res.json(new ApiResponse(200, null, "Password reset successful"));
});

const getTotalUsers = asyncHandler(async (req, res) => {
  const totalUsers = await User.find({}, "-password -refreshToken");
  return res
    .status(200)
    .json(
      new ApiResponse(200, { totalUsers }, "Total users retrieved successfully")
    );
});

export {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  verifyOtp,
  resetPassword,
  getTotalUsers,
};
