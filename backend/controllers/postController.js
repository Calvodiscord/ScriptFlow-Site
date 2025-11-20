// backend/controllers/postController.js

const Post = require('../models/Post');
const User = require('../models/User');
const cloudinary = require('cloudinary').v2;

// Configuração do Cloudinary (coloque suas credenciais do .env)
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Criar um novo post
exports.createPost = async (req, res) => {
    try {
        // Faz o upload da imagem para o Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);

        const newPost = new Post({
            user: req.user.id,
            imageUrl: result.secure_url,
            caption: req.body.caption,
        });

        const post = await newPost.save();
        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no servidor');
    }
};

// Obter posts para o feed (de usuários que você segue)
exports.getFeedPosts = async (req, res) => {
    try {
        const currentUser = await User.findById(req.user.id);
        const userPosts = await Post.find({ user: req.user.id });
        const friendPosts = await Promise.all(
            currentUser.following.map(friendId => {
                return Post.find({ user: friendId });
            })
        );
        res.json(userPosts.concat(...friendPosts));
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no servidor');
    }
};

// Curtir/Descurtir um post
exports.likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // Verifica se o post já foi curtido pelo usuário
        if (post.likes.includes(req.user.id)) {
            // Descurtir
            await post.updateOne({ $pull: { likes: req.user.id } });
            res.status(200).json("Post descurtido");
        } else {
            // Curtir
            await post.updateOne({ $push: { likes: req.user.id } });
            res.status(200).json("Post curtido");
        }
    } catch (err) {
        res.status(500).json(err);
    }
};
