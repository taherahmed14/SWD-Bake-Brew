import "./admin-tab.css";
import { AdminPortal } from "../admin-portal";
import { useEffect, useState } from "react";
import axios from "axios";
import { Buffer } from "buffer";

export const WarrantyTab = () => {
    const [warrantyData, setWarrantyData] = useState([]);
    const baseUrl = process.env.REACT_APP_BASE_URL;

    useEffect(() => {
        getWarrantyData();
    }, []);

    const getWarrantyData = () => {
        const token = JSON.parse(sessionStorage.getItem("admin_token"));
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        axios.get(`${baseUrl}admin-api/get-warranty?pageSize=10&page=0`, config)
        .then((res) => {
            console.log("Res: ", res);
            setWarrantyData(res.data.warranty);
        })
        .catch((err) => {
            console.log("Err: ", err);
        }); 
    }

    const handleViewFile = (fileBuffer, filename) => {
        const data = {
            "type": "Buffer",
            "data": fileBuffer
         }
        console.log("File buffer: ", data);
        const buffer = Buffer.from(fileBuffer);
        const blob = new Blob([buffer]);
                                
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
    }

    const formatDate = (date) => {
        console.log("Date: ", date);  
        const newDate = date.split("-")[2];
        const newMonth = date.split("-")[1];
        const newYear = date.split("-")[0];

        return `${newDate}-${newMonth}-${newYear}`
    }

    return(
        <div>
            <div className="admin-body">
                <AdminPortal/>
                <div className="tab-body">
                    <h2>Warranty Records</h2>
                    <div>
                        <table className="warranty-table"> 
                            <tr>
                                <td>S.no</td>
                                <td>Name</td>
                                <td>Email</td>
                                <td>Phone</td>
                                <td>Invoice File</td>
                                <td>Product File</td>
                                <td>Serial No File</td>
                                <td>Purchased at</td>
                                <td>Approve</td>
                                <td>Deny</td>
                            </tr>

                            <tbody>
                                {warrantyData.map((warranty, index) => (
                                    <tr>
                                        <td>{index+1}</td>
                                        <td>{warranty.name}</td>
                                        <td>{warranty.email}</td>
                                        <td>{warranty.contactNumber}</td>
                                        <td 
                                            style={{color: "blue", cursor: "pointer"}} 
                                            onClick={() => handleViewFile(warranty.invoiceData.data, warranty.invoiceFilename)}>
                                            Download
                                        </td>
                                        <td 
                                            style={{color: "blue", cursor: "pointer"}} 
                                            onClick={() => handleViewFile(warranty.productData.data, warranty.productFilename)}>
                                            Download
                                        </td>
                                        <td 
                                            style={{color: "blue", cursor: "pointer"}} 
                                            onClick={() => handleViewFile(warranty.serialNoData.data, warranty.serialNoFilename)}>
                                            Download
                                        </td>
                                        <td>
                                            {warranty?.createdat.length > 0 ? 
                                                formatDate(warranty?.createdat?.split("T")[0])
                                                :
                                                ""
                                            }
                                        </td>
                                        <td>
                                            <button>Approve</button>
                                        </td>
                                        <td>
                                            <button>Deny</button>
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