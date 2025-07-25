import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const users = [];
const otps = {}; // { identifier: { otp, expiresAt } }

const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

const generateToken = (payload, secret, expiresIn) =>
  jwt.sign(payload, secret, { expiresIn });

const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "Strict",
  secure: process.env.NODE_ENV === "production",
};

export const signup = async (req, res) => {
  const { name, email, mobile, password } = req.body;
  const existing = users.find((u) => u.email === email || u.mobile === mobile);
  if (existing) return res.status(400).json({ message: "User already exists" });

  const hashed = await bcrypt.hash(password, 10);

  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    mobile,
    password: hashed,
    verified: false,
  };
  users.push(newUser);

  const otp = generateOTP();
  otps[email] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 };

  console.log(`[OTP] Email OTP for ${email}: ${otp}`);

  return res.status(200).json({ message: "OTP sent to email" });
};

export const verifySignup = (req, res) => {
  const { email, otp } = req.body;

  const user = users.find((u) => u.email === email);
  if (!user) return res.status(404).json({ message: "User not found" });

  const record = otps[email];
  if (!record || record.otp !== otp || Date.now() > record.expiresAt) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  user.verified = true;
  delete otps[email];

  return res.status(200).json({ message: "Signup verified" });
};

export const login = async (req, res) => {
  const { identifier, password } = req.body;

  const user = users.find(
    (u) => u.email === identifier || u.mobile === identifier
  );
  if (!user || !user.verified) {
    return res.status(401).json({ message: "Invalid credentials or not verified" });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: "Invalid credentials" });

  const otp = generateOTP();
  otps[identifier] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 };

  console.log(`[OTP] Login OTP for ${identifier}: ${otp}`);

  return res.status(200).json({ message: "OTP sent" });
};

export const verifyLogin = (req, res) => {
  const { identifier, otp } = req.body;

  const user = users.find(
    (u) => u.email === identifier || u.mobile === identifier
  );
  if (!user) return res.status(404).json({ message: "User not found" });

  const record = otps[identifier];
  if (!record || record.otp !== otp || Date.now() > record.expiresAt) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  delete otps[identifier];

  const accessToken = generateToken(
    { id: user.id },
    process.env.JWT_SECRET,
    "10m" 
  );
  const refreshToken = generateToken(
    { id: user.id },
    process.env.REFRESH_SECRET,
    "1d"
  );

  res.cookie("accessToken", accessToken, COOKIE_OPTIONS);
  res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);

  return res.status(200).json({
    message: "Login successful",
    user: { name: user.name, email: user.email },
  });
};

export const refresh = (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ message: "No refresh token" });

  try {
    const decoded = jwt.verify(token, process.env.REFRESH_SECRET);
    const newAccessToken = generateToken(
      { id: decoded.id },
      process.env.JWT_SECRET,
      "10m"
    );
    res.cookie("accessToken", newAccessToken, COOKIE_OPTIONS);
    res.status(200).json({ message: "Token refreshed" });
  } catch (err) {
    res.status(403).json({ message: "Invalid refresh token" });
  }
};

export const getMe = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = users.find((u) => u.id === decoded.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user });
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

