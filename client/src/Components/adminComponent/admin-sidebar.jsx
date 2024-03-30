import sidebaricon from "../../Assets/sidebar-icon.png";
import "./admin-comp.css";
import { NavLink, Navigate, useNavigate, useLocation } from "react-router-dom";


export const AdminSidebar = () => {
    const navigate = useNavigate();
    const url = useLocation();
    const params = url.pathname.split("/");

    return (
        <div>
             <div className="admin-sidebar">
                <div
                    className={
                        params[2] === "dashboard" ? 
                            "sidebar-detail active-tab" : 
                            "sidebar-detail"
                        }
                    onClick={() => navigate("/admin/dashboard")}
                >
                    <div>
                        <img src={sidebaricon} alt="" />
                    </div>
                    <div>
                        Dashboard
                    </div>
                </div>
                
                <div 
                    className={
                        params[2] === "warranty" ? 
                            "sidebar-detail active-tab" : 
                            "sidebar-detail"
                        }
                    onClick={() => navigate("/admin/warranty")}
                >
                    <div>
                        <img src={sidebaricon} alt="" />
                    </div>
                    <div>
                        Warranty
                    </div>
                </div>
            </div>
        </div>
    )
}