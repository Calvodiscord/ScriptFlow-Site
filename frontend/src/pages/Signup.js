// frontend/src/pages/Signup.js

import React, { useState } from 'react';
import { register } from '../api';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const navigate = useNavigate();

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const { data } = await register(formData);
            localStorage.setItem('token', data.token);
            navigate('/');
            window.location.reload();
        } catch (error) {
            console.error('Erro no cadastro:', error);
            alert('Erro ao criar conta. Verifique os dados.');
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <h2>Cadastre-se</h2>
            <input type="text" name="username" placeholder="Nome de usuário" onChange={onChange} required />
            <input type="email" name="email" placeholder="Email" onChange={onChange} required />
            <input type="password" name="password" placeholder="Senha" onChange={onChange} required />
            <button type="submit">Cadastrar</button>
        </form>
    );
};

export default Signup;
