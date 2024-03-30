import { NavLink, Navigate, useNavigate, useLocation } from "react-router-dom";
import logo from "../../Assets/logo.jpg";
import Avatar from '@mui/material/Avatar';
import "./admin-comp.css";
import { useState } from "react";
import { AdminSidebar } from "./admin-sidebar";

export const AdminPortal = () => {
    const [dropdown, showdropdown] = useState(false);
    const navigate = useNavigate();
    const url = useLocation();
    const params = url.pathname.split("/");

    const handleClick = () => {
        showdropdown(p => !p);
    };

    const handleLogout = () => {
        sessionStorage.clear();
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
                <div className="inner">
                    <NavLink to="/">
                    <img className="logo" src={logo} alt="logo" />
                    </NavLink>
                </div>
                
                <div className="third_div">
                    Hi Admin
                    <Avatar 
                        className="avatar" 
                        src="/broken-image.jpg" 
                        // alt="account"
                        sx={{ width: 30, height: 30 }}
                        onClick={handleClick} />
                </div>
            </div>

            {dropdown ? 
                <div className="dropdown">
                    <div onClick={handleLogout}>Logout</div>
                </div>  
                :
                ""
            }
        </div>
    )
}