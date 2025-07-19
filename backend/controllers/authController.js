const users = [];
const otps = {}; // { email/mobile: { otp, expiresAt } }

const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

const generateToken = (payload, secret, expiresIn) =>
  jwt.sign(payload, secret, { expiresIn });

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

  otps[email] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 }; // 5 minutes

  console.log(`[OTP] Email OTP for ${email}: ${otp}`);

  return res.status(200).json({ message: "OTP sent to email" });
};

export const verifySignup = (req, res) => {
  const { email, otp } = req.body;

  const user = user.find((u) => u.email == email);
  if (!user) return res.status(404).json({ message: "User not found" });

  const record = otps[email];
  if (!record || record.otp !== otp || Date.now() > record.expiresAt) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  user.verified = true;
  delete otps[email];

  return res.status(200).json({ message: "Signup verified" });
};
