import { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Link as MuiLink,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { login } from "../../api/authAPI";

const schema = yup.object().shape({
  identifier: yup
    .string()
    .required("Email or Mobile is required")
    .test("is-valid", "Invalid Email or Mobile", (value) =>
      /^[0-9]{10}$/.test(value) || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    ),
  password: yup.string().min(6).required("Password is required"),
});

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleTogglePassword = () => setShowPassword((prev) => !prev);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await login(data);
      toast.success("Login OTP sent to email/mobile");
      navigate("/login/verify", { state: { identifier: data.identifier } });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <TextField
        label="Email or Mobile"
        fullWidth
        margin="normal"
        {...register("identifier")}
        error={Boolean(errors.identifier)}
        helperText={errors.identifier?.message}
      />

      <TextField
        label="Password"
        type={showPassword ? "text" : "password"}
        fullWidth
        margin="normal"
        {...register("password")}
        error={Boolean(errors.password)}
        helperText={errors.password?.message}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 2 }}
        disabled={loading || isSubmitting}
      >
        {loading ? "Sending OTP..." : "Login"}
      </Button>

      <Typography align="center" sx={{ mt: 2 }}>
        <MuiLink component={RouterLink} to="/signup" variant="body2">
          Don&apos;t have an account? Sign up
        </MuiLink>
      </Typography>
    </form>
  );
}
