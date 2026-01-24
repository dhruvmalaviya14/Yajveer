import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/Apierror.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Admin } from "../models/admin.model.js";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await Admin.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshTokenadmin = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generting refresh and access token"
    );
  }
};



const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  if (!email) {
    throw new ApiError(400, "email is required");
  }

  const user = await Admin.findOne({
    $or: [{ email }],
  });

  if (!user) {
    throw new ApiError(404, "Admin Does not exist");
  }

  const ispasswordvalid = await user.ispasswordcorrect(password);

  if (!ispasswordvalid) {
    throw new ApiError(401, "Password is incorrect");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const loggedInUser = await Admin.findById(user._id).select(
    "-password -refreshtokenadmin"
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
    .cookie("accessTokenadmin", accessToken, options)
    .cookie("refreshTokenadmin", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "Admin logged In Successfully"
      )
    );
});

const logoutAdmin = asyncHandler(async (req, res) => {
  if (!req.user?._id) {
    throw new ApiError(401, "Unauthorized: No user to log out");
  }

  await Admin.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshTokenadmin: null,
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
    // domain : "https://yajveerback.vercel.app",
  };

  return res
    .status(200)
    .clearCookie("accessTokenadmin", options)
    .clearCookie("refreshTokenadmin", options)
    .json({ success: true, message: "Logged out successfully" });
});

export { loginAdmin, logoutAdmin };
