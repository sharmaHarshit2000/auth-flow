import { Typography } from "@mui/material";
import SignupForm from "../../components/auth/SignupForm";
import AuthLayout from "../../layouts/AuthLayout";

const SignupPage = () => {
  return (
    <AuthLayout>
      <Typography variant="h5" align="center" gutterBottom>
        Sign Up
      </Typography>
      <SignupForm />
    </AuthLayout>
  );
};

export default SignupPage;
