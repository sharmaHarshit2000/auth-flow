import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      bgcolor="#f8f9fa"
      p={2}
    >
      <Typography variant="h2" color="error" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        Page Not Found
      </Typography>
      <Typography variant="body1" mb={3}>
        The page you’re looking for doesn’t exist or has been moved.
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate("/")}>
        Go to Home
      </Button>
    </Box>
  );
};

export default NotFoundPage;
