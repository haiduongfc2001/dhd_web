import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VerifyAccount = () => {
    const [verificationStatus, setVerificationStatus] = useState('');

    useEffect(() => {
        // Lấy thông tin id từ URL
        const urlParams = new URLSearchParams(window.location.search);
        const userId = urlParams.get('id');

        // Gửi yêu cầu xác thực đến backend
        axios.get('http://localhost:5000/verify')
            .then(response => {
                setVerificationStatus('Tài khoản của bạn đã được xác thực thành công');
            })
            .catch(error => {
                console.log(error);
                setVerificationStatus('Xác thực tài khoản thất bại');
            });
    }, []);

    return (
        <div>
            <h1>Xác thực tài khoản</h1>
            <p>{verificationStatus}</p>
        </div>
    );
};

export default VerifyAccount;
