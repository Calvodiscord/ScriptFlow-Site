// frontend/src/pages/Home.js

import React, { useEffect, useState } from 'react';
// Você precisará criar a função getFeedPosts na sua api.js
// e um componente Post.js para renderizar cada post.

const Home = () => {
    const [posts, setPosts] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchPosts = async () => {
            // Exemplo, você precisa criar essa função em api.js
            // const { data } = await getFeedPosts();
            // setPosts(data);
        };

        if (token) {
            // fetchPosts();
            console.log("Buscando posts do feed...");
        }
    }, [token]);

    if (!token) {
        return <h2>Bem-vindo! Faça <a href="/login">login</a> ou <a href="/signup">cadastre-se</a> para continuar.</h2>;
    }

    return (
        <div>
            <h1>Feed</h1>
            {/* Aqui você faria um .map() nos 'posts' para renderizar cada um */}
            <p>Seu feed aparecerá aqui.</p>
        </div>
    );
};

export default Home;
