import AuthLayout from "../../layouts/AuthLayout";
import LoginForm from "../../components/auth/LoginForm";
import { Typography } from "@mui/material";

const LoginPage = () => {
  return (
    <AuthLayout>
      <Typography variant="h5" gutterBottom align="center">
        Login
      </Typography>
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;
