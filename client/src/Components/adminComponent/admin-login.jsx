import { useFormik } from 'formik';
import * as Yup from 'yup'; 
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from 'react';
import { TextField, InputAdornment, IconButton  } from '@mui/material';
import "./admin-comp.css";
import logo from "../../Assets/logo.jpg";
import { postAdminLogin } from '../../Services/NextronAppServices';
import { useNavigate } from 'react-router-dom';

export const AdminLogin = () => {
    const navigate = useNavigate();
    const [passwordType, setPasswordType] = useState("password");
  
    const togglePassword = () => {
        if (passwordType === "password") {
        setPasswordType("text")
        return;
        }
        setPasswordType("password")
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
          email: '',
          password: ''
        },
        validationSchema: Yup.object().shape({
          email: Yup.string()
            .email("Please enter a valid email")
            .required("Mail Address Is Required"),
          password: Yup.string()
            .required("Password Is Required")
        }),
        onSubmit: async (values) => {
          let data = {
            email: values.email,
            password: values.password
          };

          await postAdminLogin(data)
          .then((res) => {
            if(res?.data?.statusCode === 200) {
                window.sessionStorage.setItem("admin_token", JSON.stringify(res?.data?.jwtAccessToken));
                window.sessionStorage.setItem("admin_detail", JSON.stringify(res?.data?.user));
                navigate("/admin/dashboard");
            }
            console.log("Res: ", res);
          })
          .catch((err) => {
            console.log(err);
          });
            
        },
    })

    return (
        <div>
            <section className="logincomponent">
        
                <div className="main-div">
                    <div>
                        <div className="logo">
                            <img src={logo} alt='' style={{ marginBottom: "40px" }} />
                        </div>
                    </div>
                    
                    <form onSubmit={handleSubmit}>

                        <div style={{ marginBottom: "20px" }}>
                            <TextField
                            name="email"
                            type="email"
                            fullWidth
                            placeholder="Email Address"
                            variant="outlined"
                            value={values.email}
                            onChange={handleChange}
                            id="email"
                            onBlur={handleBlur}
                            />
                            {errors.email && touched.email && <p style={{ color: 'red', fontSize: '12px' }}>{errors.email}</p>}
                        </div>

                        <div style={{ marginBottom: "20px" }}>
                            <TextField
                            value={values.password}
                            onChange={handleChange}
                            id="password"
                            fullWidth
                            type={passwordType === "password" ? "password" : "text"}
                            placeholder="Password"
                            onBlur={handleBlur}
                            variant="outlined"

                            InputProps={{
                                endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password"
                                    edge="end"
                                    onClick={togglePassword}
                                    >
                                    {passwordType === "password" ? (
                                        <VisibilityOffIcon />
                                    ) : (
                                        <VisibilityIcon />

                                    )}
                                    </IconButton>
                                </InputAdornment>
                                )
                            }}
                            />
                            {errors.password && touched.password && <p style={{ color: 'red', fontSize: '12px' }}>{errors.password}</p>}
                        </div>

                        {/* <div className="forgot">
                            <span className="cursorpointer" onClick={() => {
                            navigate(`/${Values.key}/forgot-password`)
                            }}>Forgot password?</span>
                        </div> */}
                        <button type="submit" className="button">
                            Login
                        </button>
                    </form>
                </div>
                    
            </section>
        </div>
    )
}