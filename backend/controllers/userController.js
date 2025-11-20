const User = require('../models/User');

// Função para o painel de admin
exports.getAllUsers = async (req, res) => {
    if (!req.user.isAdmin) return res.status(403).json({ msg: 'Acesso negado' });
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        res.status(500).send('Erro no servidor');
    }
};

exports.banUser = async (req, res) => {
    if (!req.user.isAdmin) return res.status(403).json({ msg: 'Acesso negado' });
    try {
        await User.findByIdAndUpdate(req.params.id, { isBanned: true });
        res.json({ msg: 'Usuário banido com sucesso' });
    } catch (err) {
        res.status(500).send('Erro no servidor');
    }
};

exports.unbanUser = async (req, res) => {
    if (!req.user.isAdmin) return res.status(403).json({ msg: 'Acesso negado' });
    try {
        await User.findByIdAndUpdate(req.params.id, { isBanned: false });
        res.json({ msg: 'Banimento do usuário removido' });
    } catch (err) {
        res.status(500).send('Erro no servidor');
    }
};
