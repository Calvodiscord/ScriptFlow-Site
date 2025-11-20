import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Navbar = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    let user = null;
    if (token) {
        user = jwtDecode(token);
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav>
            <Link to="/">Home</Link>
            {user ? (
                <>
                    {user.user.isAdmin && <Link to="/admin">Admin</Link>}
                    <button onClick={handleLogout}>Sair</button>
                </>
            ) : (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Cadastro</Link>
                </>
            )}
        </nav>
    );
};

export default Navbar;
