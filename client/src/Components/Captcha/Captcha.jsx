import ReCAPTCHA from 'react-google-recaptcha';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../Context/Auth.context';

export const Captcha = () => {
    const { setCaptchaStatus } = useAuth();
    const test = useRef();

    const handleChange = () => {
        console.log("Test captcha::", test.current.getValue());
        setCaptchaStatus(test.current.getValue());
    }

    return (
        <>
            <div style={{marginTop: "10px"}}>
                <ReCAPTCHA ref={test} onChange={handleChange} sitekey={process.env.REACT_APP_SITE_KEY} />
            </div>
        </>
    );
}