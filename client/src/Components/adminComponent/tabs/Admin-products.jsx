import "./admin-tab.css";
import { AdminPortal } from "../admin-portal";
import { useEffect, useState } from "react";
import PorductList from "../../ProductListComponent/PorductList";

export const AdminProducts = () => {

    return(
        <div>
            <div className="admin-body">
                <AdminPortal/>
                <div className="admin-products">

                    <PorductList />
                
                </div>
            </div>
        </div>
    )
} 