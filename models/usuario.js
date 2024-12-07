module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    senha: DataTypes.STRING,
  });
  return Usuario;
};

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


router.post('/register', async (req, res) => {
  const { nome, email, senha } = req.body;
  const hashedSenha = await bcrypt.hash(senha, 10);
  const usuario = await Usuario.create({ nome, email, senha: hashedSenha });
  res.json(usuario);
});


router.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  const usuario = await Usuario.findOne({ where: { email } });
  if (usuario && await bcrypt.compare(senha, usuario.senha)) {
    const token = jwt.sign({ id: usuario.id }, 'seu_segredo', { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Credenciais inválidas' });
  }
});
