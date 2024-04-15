import "./admin-tab.css";
import { AdminPortal } from "../admin-portal";
import { useEffect, useState } from "react";
import axios from "axios";
import { Buffer } from "buffer";
import { deleteAdmin, getAllAdmin } from "../../../Services/bbAppServices";
import delete_icon from "../../../Assets/delete.png"

export const AdminRecords = () => {
    const [adminData, setAdminData] = useState([]);
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const token = sessionStorage.getItem("token");

    useEffect(() => {
        getAdminData();
    }, []);

    const getAdminData = async () => {
        
        await getAllAdmin(token)
        .then((result) => {
            console.log("Result::", result);
            setAdminData(result.data.data);
        })
        .catch((error) => console.log("error", error));
    }

    const formatDate = (date) => {
        console.log("Date: ", date);  
        const newDate = date.split("-")[2];
        const newMonth = date.split("-")[1];
        const newYear = date.split("-")[0];

        return `${newDate}-${newMonth}-${newYear}`
    }

    const handleAdminDelete = async (id) => {
        await deleteAdmin(id, token)
        .then((result) => {
            console.log("Result::", result);
            getAdminData();
        })
        .catch((error) => console.log("error", error));
    }

    return(
        <div>
            <div className="admin-body">
                <AdminPortal/>
                <div className="tab-body">
                    <h2>Admin Records</h2>
                    <div>
                        <table className="warranty-table"> 
                            <tr>
                                <td>S.no</td>
                                <td>Name</td>
                                <td>Email</td>
                                <td>Role</td>
                                <td>Status</td>
                                <td>Created</td>
                                <td>Remove</td>
                            </tr>

                            <tbody>
                                {adminData.map((admin, index) => (
                                    <tr>
                                        <td>{index+1}</td>
                                        <td>{admin.name}</td>
                                        <td>{admin.email}</td>
                                        <td>{admin.role}</td>
                                        <td>{admin.verified === "Y" ? "Verified" : "Not Verfied" }</td>
                                        <td>
                                            {admin?.createdat.length > 0 ? 
                                                formatDate(admin?.createdat?.split("T")[0])
                                                :
                                                ""
                                            }
                                        </td>
                                        <td>
                                            <div className="delete_icon" onClick={() => handleAdminDelete(admin.id)}>
                                                <img src={delete_icon} alt="Remove" />
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>

                            
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
} 