import { useState } from "react";
import {
    Box,
    TextField,
    Button,
    Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import { verifySignup } from "../../api/authAPI";

const SignupVerifyForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [otp, setOtp] = useState("");

    const email = location.state?.email;

    if (!email) {
        toast.error("No email provided. Redirecting...");
        navigate("/signup");
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!otp || otp.length !== 6) {
            return toast.error("Please enter a valid 6-digit OTP");
        }

        try {
            const res = await verifySignup({ email, otp });
            toast.success(res.data.message);
            navigate("/login");
        } catch (err) {
            toast.error(err.response?.data?.message || "OTP verification failed");
        }
    };

    return (
        <>
            <Typography variant="h5" gutterBottom align="center">
                Verify Signup
            </Typography>
            <Typography align="center" sx={{ mb: 2 }}>
                Enter the OTP sent to <b>{email}</b>
            </Typography>

            <Box component="form" onSubmit={handleSubmit}>
                <TextField
                    label="OTP"
                    fullWidth
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    slotProps={{
                        htmlInput: {
                            maxLength: 6,
                        },
                    }}
                    margin="normal"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2 }}
                >
                    Verify
                </Button>
            </Box>
        </>
    );
};

export default SignupVerifyForm;
