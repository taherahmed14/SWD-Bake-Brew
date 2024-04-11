import sidebaricon from "../../Assets/sidebar-icon.png";
import "./admin-comp.css";
import { NavLink, Navigate, useNavigate, useLocation } from "react-router-dom";

export const AdminSidebar = () => {
    const navigate = useNavigate();
    const url = useLocation();
    const params = url.pathname.split("/");
    const role = sessionStorage.getItem("role");

    return (
        <div>
             <div className="admin-sidebar">
                <p style={{ padding: "15px" }}>Hi {role === "super_admin" ? "Super Admin" : "Admin"}</p>
                <div
                    className={
                        params[2] === "products" ? 
                            "sidebar-detail active-tab" : 
                            "sidebar-detail"
                        }
                    onClick={() => navigate("/admin/products")}
                >
                    <div>
                        <img src={sidebaricon} alt="" />
                    </div>
                    <div className="sidebar-text">
                        All Products
                    </div>
                </div>

                <div
                    className={
                        params[2] === "create-product" ? 
                            "sidebar-detail active-tab" : 
                            "sidebar-detail"
                        }
                    onClick={() => navigate("/admin/create-product")}
                >
                    <div>
                        <img src={sidebaricon} alt="" />
                    </div>
                    <div className="sidebar-text">
                        Create Product
                    </div>
                </div>
                
                {
                    role === "super_admin" ?
                    <div 
                        className={
                            params[2] === "admin-records" ? 
                                "sidebar-detail active-tab" : 
                                "sidebar-detail"
                            }
                        onClick={() => navigate("/admin/admin-records")}
                    >
                        <div>
                            <img src={sidebaricon} alt="" />
                        </div>
                        <div className="sidebar-text">
                            Admin Records
                        </div>
                    </div> : ""
                }

                {
                    role === "super_admin" ?
                    <div 
                        className={
                            params[2] === "add-admin" ? 
                                "sidebar-detail active-tab" : 
                                "sidebar-detail"
                            }
                        onClick={() => navigate("/admin/add-admin")}
                    >
                        <div>
                            <img src={sidebaricon} alt="" />
                        </div>
                        <div className="sidebar-text">
                            Add Admin
                        </div>
                    </div> : ""
                }
            </div>
        </div>
    )
}