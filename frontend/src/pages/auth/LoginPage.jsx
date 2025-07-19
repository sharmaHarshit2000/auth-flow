import { Box, Container, Paper, Typography } from "@mui/material";
import LoginForm from "../../components/auth/LoginForm";

const LoginPage = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ padding: 4 }}>
          <Typography variant="h5" gutterBottom align="center">
            Login
          </Typography>
          <LoginForm />
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;