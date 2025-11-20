// frontend/src/pages/Profile.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// Você precisaria criar rotas no backend e funções na api.js
// para buscar dados e posts de um usuário específico.

const Profile = () => {
    const { username } = useParams(); // Pega o nome de usuário da URL, ex: /profile/calvodiscord
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // Lógica para buscar as informações do usuário e seus posts
        console.log(`Buscando perfil de ${username}`);
    }, [username]);

    if (!user) {
        return <div>Carregando perfil...</div>;
    }

    return (
        <div>
            <h2>{user.username}</h2>
            {/* Exibir foto de perfil, número de seguidores, etc. */}
            <div className="posts-grid">
                {/* Mapear e exibir os posts do usuário */}
            </div>
        </div>
    );
};

export default Profile;
