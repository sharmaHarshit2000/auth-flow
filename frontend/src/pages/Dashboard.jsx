import { Container, Typography, Paper, Button } from "@mui/material";

const Dashboard = () => {
    return (
        <Container maxWidth="md" sx={{ mt: 8 }}>
            <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
                <Typography variant="h4" gutterBottom>
                    Welcome to Your Dashboard
                </Typography>
                <Typography variant="body1" gutterBottom>
                    This is a protected page shown after successful login verification.
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3 }}
                    onClick={() => alert("Perform action or navigate")}
                >
                    Continue
                </Button>
            </Paper>
        </Container>
    );
};

export default Dashboard;
