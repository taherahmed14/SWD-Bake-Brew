import React, { useState } from 'react';
import { TextField, Button, Box, Select, MenuItem, FormControl, InputLabel, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AdminPortal } from '../admin-portal';
import { postAdminRegister, postUserRegister } from '../../../Services/bbAppServices';

const AddAdmin = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'admin',
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

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
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const token = sessionStorage.getItem("token");
      await postAdminRegister({ ...formData, role: "admin" }, token)
      .then((result) => {
        console.log("Result::", result);
        setFormData({
          name: '',
          email: '',
          role: 'admin',
        });
        navigate("/admin/admin-records");
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
    <>
        <div className="admin-body">
            <AdminPortal/>
            <div className="tab-body">
                <form onSubmit={handleSubmit}>
                    <h2>Add New Admin</h2>
    {/* //Title, Price, discount price, discount, category, quantity, product image */}
                    <Grid container spacing={2} p={4}>
                        <Grid item xs={6}>
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
                        </Grid>
                        <Grid item xs={6}>
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
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                            label="Role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            error={errors.role}
                            helperText={errors.role}
                            disabled
                            />
                        </Grid>
                    </Grid>
                    <br />

                    <div style={{ marginLeft: "30px" }}>
                        <Button type="submit" variant="contained" color="primary">
                            Submit
                        </Button>
                    </div>
                </form>    
            </div>
        </div>
    </>
    
  );
};

export default AddAdmin;
