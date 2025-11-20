// frontend/src/components/Post.js
import React from 'react';
// Você precisará criar a função 'likePost' na sua api.js
// import { likePost } from '../api'; 

const Post = ({ post }) => {
    const handleLike = async () => {
        try {
            // await likePost(post._id);
            console.log("Post curtido/descurtido!");
            // Idealmente, você atualizaria o estado para refletir a curtida em tempo real
        } catch (error) {
            console.error("Erro ao curtir o post", error);
        }
    };

    return (
        <div style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <h4>{post.user.username}</h4>
            <img src={post.imageUrl} alt={post.caption} style={{ width: '100%' }} />
            <p><strong>{post.user.username}</strong> {post.caption}</p>
            <button onClick={handleLike}>
                Curtir ({post.likes.length})
            </button>
            <div>
                {/* Aqui você pode mapear e exibir os comentários */}
            </div>
        </div>
    );
};

export default Post;
