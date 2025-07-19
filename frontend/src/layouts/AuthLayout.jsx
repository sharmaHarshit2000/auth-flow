import { Box, Container, Paper } from "@mui/material";

const AuthLayout = ({ children }) => {
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
        <Paper elevation={3} sx={{ padding: 4, borderRadius: 2 }}>
          {children}
        </Paper>
      </Container>
    </Box>
  );
};

export default AuthLayout;
