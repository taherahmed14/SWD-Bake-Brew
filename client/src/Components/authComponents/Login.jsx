import React, { useState } from 'react';
import { Button, TextField, Typography, Box } from "@mui/material";
import axios from 'axios';
import { postUserLogin } from '../../Services/bbAppServices';
import { useNavigate } from 'react-router-dom';
import ToasterComponent from '../CommonComponents/ToasterComponent';
import { toast } from 'react-toastify';
import { Captcha } from '../Captcha/Captcha';
import { useAuth } from '../../Context/Auth.context';

const LoginForm = (props) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const navigate = useNavigate();
  const { captcha, setCaptchaStatus, setCsrf } = useAuth();

  const validateEmail = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const validatePassword = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.password) {
        newErrors.password = 'Password is required';
        isValid = false;
    } else if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{16,}$/.test(formData.password)
    ) {
        newErrors.password = 'Password must be 16 characters long including uppercase, lowercase letters, numbers, and special characters';
        isValid = false;
    }
    if(!captcha) {
      newErrors.captcha = 'Captcha is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!emailSubmitted && validateEmail()) {
        setEmailSubmitted((p) => !p);
    }

    else if (validatePassword()) {
        console.log(formData);
        await postUserLogin({ ...formData, role: props.role })
        .then((result) => {
            console.log("Result::", result);
            if(result.data.status === 400) {
              toast.error(result.data.message[0]);
            }
            sessionStorage.setItem("user", result.data.user.id);
            sessionStorage.setItem("role", props.role);
            setCaptchaStatus(null);

            setCsrf(result.data.csrfToken);

            navigate("/2fa");
            setFormData({
                email: '',
                password: ''
            });
        })
        .catch((error) => {
          toast.error(error.message[0]);
          console.log("error", error);
        });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleBack = () => {
    setEmailSubmitted((p) => !p);
  }

  return (
    <Box width={400} margin="auto" marginTop={15} padding={4} boxShadow={2}>
        <Typography variant="h5" gutterBottom>
            Login
        </Typography>
        
        <form onSubmit={handleSubmit}>
            {
                !emailSubmitted ?
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
                :
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
            }
            { emailSubmitted ? 
                <Button variant="contained" color="primary" style={{ marginRight: '10px' }} onClick={handleBack}>
                    Back
                </Button> : "" 
            }

            <Button type="submit" variant="contained" color="primary">
                { !emailSubmitted ? "Next" : "Submit" }
            </Button>
            {emailSubmitted ? 
              <div>
                <Captcha />
                <p style={{ fontSize: "12px", color: "red" }}>{errors.captcha ? errors.captcha : ""}</p>
              </div> : ""}
        </form>

        <div style={{ marginTop: "10px" }}>
            Don't have an account? 
            <span>
                <a href="/register">Register</a>
            </span>
        </div>
        <ToasterComponent />
    </Box>
  );
};

export default LoginForm;
