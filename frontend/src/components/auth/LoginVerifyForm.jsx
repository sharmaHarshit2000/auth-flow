import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
} from "@mui/material";
import { toast } from "react-toastify";
import { verifyLogin } from "../../api/authAPI";

const LoginVerifyForm = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const identifier = state?.identifier || "";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!otp || otp.length !== 6) {
      return toast.error("Please enter a valid 6-digit OTP");
    }

    try {
      setLoading(true);
      await verifyLogin({ identifier, otp });
      toast.success("Login successful");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Typography variant="h5" align="center" gutterBottom>
        Verify Login
      </Typography>
      <Typography align="center" sx={{ mb: 2 }}>
        Enter the OTP sent to <strong>{identifier}</strong>
      </Typography>

      <form onSubmit={handleVerify} noValidate>
        <TextField
          label="OTP"
          type="text"
          fullWidth
          margin="normal"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          slotProps={{
            htmlInput: {
              maxLength: 6,
            },
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </Button>

        <Box mt={2} textAlign="center">
          <Link href="/login" variant="body2">
            Back to Login
          </Link>
        </Box>
      </form>
    </>
  );
};

export default LoginVerifyForm;
