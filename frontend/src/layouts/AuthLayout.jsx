import { Box, Container, Paper } from "@mui/material";

const AuthLayout = ({ children }) => {
    return (
        <Box
            sx={{
                backgroundColor: "#f0f2f5",
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                px: 2,
            }}
        >
            <Container maxWidth="sm">
                <Paper
                    elevation={3}
                    sx={{
                        padding: 4,
                        borderRadius: 3,
                        backgroundColor: "#fff",
                    }}
                >
                    {children}
                </Paper>
            </Container>
        </Box>
    );
};

export default AuthLayout;
