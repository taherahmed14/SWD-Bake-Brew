import React, { useEffect, useState } from 'react';
import { verifyUser } from '../../Services/NextronAppServices';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

export const VerifyUser = () => {
    const { token, record, role } = useParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState("Verifying User...");
    const [status, setStatus] = useState(false);

    useEffect(() => {
        verify();
    }, []);

    const verify = async () => {
        await verifyUser({ token: token.split("-")[1], record })
        .then((result) => {
          console.log("Result::", result);
          setMessage(result.data.message);
          setStatus(true);
        })
        .catch((error) => console.log("error", error));
    }

    const handleLogin = () => {
        if(role === "customer")
            navigate("/login");
        else
            navigate("/admin/login");
    }

    return (
        <>
            <div className='center'>
                <h2>{message}</h2>
                {status ?
                    <Button type="submit" variant="contained" color="primary" onClick={handleLogin}>
                        Login
                    </Button> : ""
                }
            </div>
        </>
    );
}