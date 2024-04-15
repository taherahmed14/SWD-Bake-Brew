import React, { useState } from 'react';
import { Button, TextField, Typography, Box } from "@mui/material";
import axios from 'axios';
import { postVerifyOtp } from '../../Services/bbAppServices';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/Auth.context';

const TwoFactorAuthForm = () => {
  const [formData, setFormData] = useState({
    otp: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login } = useAuth();

  const validateOTP = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.otp.trim()) {
      newErrors.otp = 'OTP is required';
      isValid = false;
    } else if(formData.otp.length !== 4) {
        newErrors.otp = 'Invalid OTP';
        isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateOTP()) {
        const id = sessionStorage.getItem("user");
        formData.otp = +formData.otp;
        await postVerifyOtp({ ...formData, id, role: "customer" })
        .then((result) => {
            console.log("Result::", result);
            const token = result.data.jwtAccessToken;
            sessionStorage.setItem("token", token);
            login(token);

            const role = sessionStorage.getItem("role");
            if(role === "customer") 
              navigate("/shop");
            else 
              navigate("/admin/products");
            setFormData({
                otp: ''
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
    <Box width={400} margin="auto" marginTop={15} padding={4} boxShadow={2}>
        <Typography variant="h5" gutterBottom>
            Enter OTP
        </Typography>
        
        <form onSubmit={handleSubmit}>
            <TextField
            fullWidth
            margin="normal"
            label="OTP"
            name="otp"
            value={formData.otp}
            onChange={handleChange}
            error={!!errors.otp}
            helperText={errors.otp}
            type='number'
            />

            <Button type="submit" variant="contained" color="primary">
                Submit
            </Button>
        </form>
    </Box>
  );
};

export default TwoFactorAuthForm;
