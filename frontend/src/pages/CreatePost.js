// frontend/src/pages/CreatePost.js
import React, { useState } from 'react';
import { createPost } from '../api'; // Função a ser criada na api.js
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
    const [file, setFile] = useState(null);
    const [caption, setCaption] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', file);
        formData.append('caption', caption);

        try {
            await createPost(formData);
            navigate('/'); // Volta para o feed após postar
        } catch (error) {
            console.error('Erro ao criar post:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Novo Post</h2>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
            <input type="text" placeholder="Escreva uma legenda..." value={caption} onChange={(e) => setCaption(e.target.value)} />
            <button type="submit">Publicar</button>
        </form>
    );
};

export default CreatePost;
