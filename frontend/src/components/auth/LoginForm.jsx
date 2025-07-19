import { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Link,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await login(data);
      toast.success("Login OTP sent to email/mobile");
      navigate("/login-verify", { state: { identifier: data.identifier } });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={8}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
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
            type="password"
            fullWidth
            margin="normal"
            {...register("password")}
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
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

          <Box mt={2} textAlign="center">
            <Link href="/signup" variant="body2">
              Don't have an account? Sign up
            </Link>
          </Box>
        </form>
      </Box>
    </Container>
  );
}
