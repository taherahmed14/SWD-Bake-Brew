import React, { useState, useRef } from 'react';
import { Button, TextField, Typography, Box } from "@mui/material";
import { postUserRegister } from '../../Services/bbAppServices';
import { useNavigate } from 'react-router-dom';
import { Captcha } from '../Captcha/Captcha';
import { useAuth } from '../../Context/Auth.context';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    captcha: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { captcha, setCaptchaStatus } = useAuth();

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
      isValid = false;
    }

    if (!formData.password) {
        newErrors.password = 'Password is required';
        isValid = false;
    } else if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{16,}$/.test(formData.password)
    ) {
        newErrors.password = 'Password must be 16 characters long including uppercase, lowercase letters, numbers, and special characters';
        isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    // const captchaValue = recaptcha.current.getValue();
    if(!captcha) {
      newErrors.captcha = 'Captcha is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();    
    if (validateForm()) {
      await postUserRegister({ ...formData, role: "customer" })
      .then((result) => {
        console.log("Result::", result);
        setCaptchaStatus(null);
        navigate("/login");
        setFormData({
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        });
      })
      .catch((error) => console.log("error", error));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  return (
    <Box width={400} margin="auto" marginTop={10} padding={4} boxShadow={3}>
        <Typography variant="h5" gutterBottom>
            Register
        </Typography>
        
        <form onSubmit={handleSubmit}>
            <TextField
            fullWidth 
            margin="normal"
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            />
            <TextField
            fullWidth
            margin="normal"
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            />
            <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            />
            <TextField
            fullWidth
            margin="normal"
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            />
            <Button type="submit" variant="contained" color="primary">
            Submit
            </Button>
            <div>
              <Captcha />
              <p style={{ fontSize: "12px", color: "red" }}>{errors.captcha ? errors.captcha : ""}</p>
            </div>

        </form>

        <div style={{ marginTop: "10px" }}>
            Are you an existing user? 
            <span>
                <a href="/login">Login</a>
            </span>
        </div>
    </Box>
  );
};

export default RegisterForm;
