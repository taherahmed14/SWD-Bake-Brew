import React, { useState } from 'react';
import { TextField, Button, Box, Select, MenuItem, FormControl, InputLabel, Typography, Grid } from '@mui/material';
// import { postUserRegister } from '../../Services/NextronAppServices';
import { useNavigate } from 'react-router-dom';
import { AdminPortal } from '../admin-portal';
import { createNewProduct } from '../../../Services/bbAppServices';

const CreateProduct = () => {
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        discountPrice: '',
        discount: '',
        category: '',
        quantity: '',
        image: null,
    });
    const [errors, setErrors] = useState({
        title: false,
        price: false,
        discountPrice: false,
        discount: false,
        image: false,
    });
    const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;

    const formErrors = {};
    if (!formData.title.trim()) {
      formErrors.title = true;
      isValid = false;
    }
    if (!formData.price.trim()) {
      formErrors.price = true;
      isValid = false;
    }
    if (!formData.category) {
      formErrors.category = true;
      isValid = false;
    }
    if (!formData.quantity) {
      formErrors.quantity = true;
      isValid = false;
    }
    if (!formData.image) {
      formErrors.image = true;
      isValid = false;
    }
    
    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("create form::", formData);
    if (validateForm()) {
        console.log("create form inside::", +formData.price);
        const imageForm = new FormData();
        
        imageForm.append('title', formData.title);
        imageForm.append('price', formData.price);
        imageForm.append('discount', formData.discount);
        imageForm.append('category', formData.category);
        imageForm.append('quantity', formData.quantity);
        imageForm.append('file', formData.image);

        console.log("Form app:", imageForm);

        const token = sessionStorage.getItem("token");

        await createNewProduct(imageForm, token)
        .then((result) => {
            console.log("Result::", result);
            setFormData({
                title: '',
                price: '',
                discountPrice: '',
                discount: '',
                category: '',
                quantity: '',
                image: null,
            });
            navigate("/admin/products");
        })
        .catch((error) => console.log("error", error));
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: false });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && !['image/jpeg', 'image/png'].includes(file.type)) {
        setErrors({ ...errors, image: true });
        return;
    }
    setFormData({ ...formData, image: file });
    setErrors({ ...errors, image: false });
  };

  return (
    <>
        <div className="admin-body">
            <AdminPortal/>
            <div className="tab-body">
                <form onSubmit={handleSubmit}>
                    <h2>Create New Product</h2>
    {/* //Title, Price, discount price, discount, category, quantity, product image */}
                    <Grid container spacing={2} p={4}>
                        <Grid item xs={6}>
                            <TextField
                            label="Title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            fullWidth
                            required
                            margin="normal"
                            error={errors.title}
                            helperText={errors.title && "Title is required"}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                            label="Price"
                            name="price"
                            type="number"
                            value={formData.price}
                            onChange={handleChange}
                            fullWidth
                            required
                            margin="normal"
                            error={errors.price}
                            helperText={errors.price && "Price is required"}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                            label="Discount"
                            name="discount"
                            type="number"
                            value={formData.discount}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            error={errors.discount}
                            helperText={errors.discount && "Invalid discount"}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth required margin="normal">
                                <InputLabel>Category</InputLabel>
                                <Select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    error={errors.category}
                                    helperText={errors.category && "Category is required"}
                                >
                                    <MenuItem value="Bake">Bake</MenuItem>
                                    <MenuItem value="Brew">Brew</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth required margin="normal">
                                <InputLabel>Quantity</InputLabel>
                                <Select
                                    name="quantity"
                                    value={formData.quantity}
                                    onChange={handleChange}
                                    error={errors.quantity}
                                    helperText={errors.quantity && "Quantity is required"}
                                >
                                    <MenuItem value={1}>10</MenuItem>
                                    <MenuItem value={2}>15</MenuItem>
                                    <MenuItem value={3}>25</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={8}>
                            <input
                            accept="image/jpeg,image/png"
                            id="contained-button-file"
                            multiple
                            type="file"
                            style={{ display: 'none' }}
                            onChange={handleImageChange}
                            error={errors.image}
                            helperText={errors.image && "Image is required"}
                            />
                            <label htmlFor="contained-button-file">
                                <Button variant="contained" component="span">
                                    Upload Image
                                </Button>
                            </label>
                            {errors.image && (
                                <Typography color="error" variant="body2">
                                    Invalid file type. Please select a JPEG or PNG image.
                                </Typography>
                            )}
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

export default CreateProduct;
