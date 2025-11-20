// frontend/src/pages/Login.js

import React, { useState } from 'react';
import { login } from '../api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const { data } = await login(formData);
            localStorage.setItem('token', data.token);
            navigate('/'); // Redireciona para a Home após o login
            window.location.reload(); // Recarrega para a navbar atualizar
        } catch (error) {
            console.error('Erro no login:', error);
            alert('Credenciais inválidas ou conta banida.');
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <h2>Login</h2>
            <input type="email" name="email" placeholder="Email" onChange={onChange} required />
            <input type="password" name="password" placeholder="Senha" onChange={onChange} required />
            <button type="submit">Entrar</button>
        </form>
    );
};

export default Login;
