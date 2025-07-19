import { useState } from "react";
import {
    Box,
    TextField,
    Button,
    Typography,
    Container,
    Paper,
} from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { signup } from "../../api/authAPI";

const SignupForm = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        email: "",
        mobile: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        const { name, email, mobile, password } = form;
        if (!name || !email || !mobile || !password) {
            return toast.error("All fields are required");
        }

        try {
            const res = await signup(form);
            toast.success(res.data.message);
            navigate("/signup/verify", { state: { email: form.email } });
        } catch (err) {
            toast.error(
                err?.response?.data?.message || "Signup failed. Try again."
            );
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
                <Typography variant="h5" gutterBottom align="center">
                    Sign Up
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <TextField
                        label="Name"
                        name="name"
                        fullWidth
                        margin="normal"
                        value={form.name}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        fullWidth
                        margin="normal"
                        value={form.email}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Mobile"
                        name="mobile"
                        fullWidth
                        margin="normal"
                        value={form.mobile}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={form.password}
                        onChange={handleChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3 }}
                    >
                        Register
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default SignupForm;
