const Post = require('../models/Post');
const User = require('../models/User');
const cloudinary = require('cloudinary').v2;

// É importante ter a configuração do Cloudinary aqui, lendo do .env
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
        console.error("Erro ao criar post:", err.message);
        res.status(500).send('Erro no servidor');
    }
};

// Obter posts para o feed (de usuários que você segue)
exports.getFeedPosts = async (req, res) => {
    try {
        const currentUser = await User.findById(req.user.id);
        
        // Pega os Ids dos usuários que o usuário atual segue, incluindo ele mesmo
        const followingIds = [...currentUser.following, req.user.id];

        // Busca todos os posts dos usuários seguidos
        const feedPosts = await Post.find({ user: { $in: followingIds } })
            .populate('user', 'username profilePicture') // <-- MUDANÇA ESSENCIAL: Adiciona dados do usuário ao post
            .sort({ createdAt: -1 }); // Ordena os posts, do mais novo para o mais antigo

        res.json(feedPosts);
    } catch (err) {
        console.error("Erro ao buscar feed:", err.message);
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
