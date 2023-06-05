import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import Button from "react-bootstrap/Button";

function Test(){
    const notify = () =>
        toast.success('Cập nhật thông tin thành công!', {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });


    return (
        <div className='justify-content-center align-items-center align-content-center d-flex'>
            <Button onClick={notify}>Notify!</Button>
            <ToastContainer />
        </div>
    );
}

export default Test;