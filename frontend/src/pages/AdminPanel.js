import React, { useState, useEffect } from 'react';
import { getAllUsers, banUser, unbanUser } from '../api';

const AdminPanel = () => {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const { data } = await getAllUsers();
            setUsers(data);
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleBan = async (id) => {
        try {
            await banUser(id);
            fetchUsers(); // Atualiza a lista
        } catch (error) {
            console.error('Erro ao banir usuário:', error);
        }
    };

    const handleUnban = async (id) => {
        try {
            await unbanUser(id);
            fetchUsers(); // Atualiza a lista
        } catch (error) {
            console.error('Erro ao desbanir usuário:', error);
        }
    };

    return (
        <div>
            <h1>Painel de Controle</h1>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.isBanned ? 'Banido' : 'Ativo'}</td>
                            <td>
                                {user.isBanned ? (
                                    <button onClick={() => handleUnban(user._id)}>Desbanir</button>
                                ) : (
                                    <button onClick={() => handleBan(user._id)}>Banir</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPanel;
