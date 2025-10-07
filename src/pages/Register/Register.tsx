import React from 'react';
import style from './Register.module.css'
import RegisterForm from "../../components/Register/RegisterForm.tsx";

const Register: React.FC = () => {
    return (
        <div className={style.wrapper}>
            <RegisterForm />
        </div>
    );
};

export default Register;
