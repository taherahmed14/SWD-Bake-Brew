import { NavLink, Navigate, useNavigate, useLocation } from "react-router-dom";
import logo from "../../Assets/logo.jpg";
import Avatar from '@mui/material/Avatar';
import "./admin-comp.css";
import { useState } from "react";
import { AdminSidebar } from "./admin-sidebar";
import AdminProducts from "./tabs/Admin-products";
import PorductList from "../ProductListComponent/PorductList";

export const AdminPortal = () => {
    const [dropdown, showdropdown] = useState(false);
    const navigate = useNavigate();
    const url = useLocation();
    const params = url.pathname.split("/");
    const role = sessionStorage.getItem("role");

    const handleClick = () => {
        showdropdown(p => !p);
    };

    const handleLogout = () => {
        sessionStorage.clear();
        if(role === "super_admin")
            navigate("/org/login");
        else 
            navigate("/admin/login");
    }

    return(
        <div>
            <div>
                <div className="admin-sidebar">
                    <AdminSidebar />
                </div>
            </div>

            <div className="navbar">
                <div className="logo_text">
                    <NavLink className="logo_text_dec" to="/shop">
                         Bake & Brew
                    </NavLink>
                </div>
                
                <div className="third_div">
                    <div style={{ cursor: "pointer" }} onClick={handleLogout}>Logout</div>

                    {/* <Avatar 
                        className="avatar" 
                        src="/broken-image.jpg" 
                        // alt="account"
                        sx={{ width: 30, height: 30 }}
                        onClick={handleClick} /> */}
                </div>
            </div>

            {/* {dropdown ? 
                <div className="dropdown">
                    <p>Hi, {role === "super_admin" ? "Super Admin" : "Admin"}</p>
                    <div onClick={handleLogout}>Logout</div>
                </div>  
                :
                ""
            } */}

        </div>
    )
}