const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const UserModel = require("../models/userModel");
const config = require("../config");
const JWT_SECRET = config.jwt.secret;
const JWT_EXPIRATION = config.jwt.expiresIn;

function accessTokenGenerator(user) {
  const payload = {
    uuid: user.uuid,
    email: user.email,
    name: user.name,
    tokenVersion: user.token_version,
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
}

async function login(request, response) {
  const { email, password } = request.body;

  if (!email || !password) {
    return response
      .status(400)
      .json({ message: "Missing email and/or password." });
  }

  try {
    const user = await UserModel.getUserByEmail(email);

    if (!user) {
      return response
        .status(401)
        .json({ message: "Invalid email and/or password." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return response
        .status(401)
        .json({ message: "Invalid email and/or password." });
    }

    const accessToken = accessTokenGenerator(user);
    const refreshToken = jwt.sign(
      { uuid: user.uuid, tokenVersion: user.token_version },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    await UserModel.setRefreshToken(user.uuid, refreshToken);

    return response.status(200).json({ accessToken, refreshToken });
  } catch (err) {
    console.error("Login Error:", err);

    return response
      .status(500)
      .json({ message: "Server Error. Please try again later." });
  }
}

async function register(request, response) {
  const { name, email, password } = request.body;
  
  if (!name || !email || !password) {
    return response
      .status(400)
      .json({ message: "Missing name, email and/or password." });
  }

  try {
    const user = await UserModel.getUserByEmail(email);

    if (user) {
      return response
        .status(409)
        .json({ message: "An account with this email already exists." });
    }

    const uuid = uuidv4();
    const passwordHash = await bcrypt.hash(password, 12);

    await UserModel.createUser({ uuid, name, email, passwordHash });

    return response.status(201).json({ message: "Account created." });
  } catch (err) {
    console.error("Registration Error:", err);

    return response
      .status(500)
      .json({ message: "Server Error. Please try again later." });
  }
}

async function refreshToken(request, response) {
  const { refreshToken } = request.body;
  if (!refreshToken) return response.status(400).json({message: "Refresh token is required."});

  try {
    const payload = jwt.verify(refreshToken, JWT_SECRET);
    const user = await UserModel.getUserById(payload.uuid);
    
    if (!user || user.token_version !== payload.tokenVersion)
      return response.status(401).json({message: "Refresh token is invalid or expired."});

    const accessToken = accessTokenGenerator(user);
    return response.status(200).json({accessToken});
  } catch (err) {
    console.error("Refresh token error:", err);
    return response.status(401).json({message: "Invalid refresh token."});
  }
}

async function logout(request, response) {
  try {
    const userUuid = request.user.uuid;

    await UserModel.incrementTokenVersion(userUuid);

    return response.status(200).json({ message: "Logged out successfully." });
  } catch (err) {
    console.error("Logout Error:", err);

    return response
      .status(500)
      .json({ message: "Server Error. Please try again later." });
  }
}

module.exports = {
  login,
  register,
  refreshToken,
  logout,
};
