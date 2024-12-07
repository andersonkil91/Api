const express = require('express');
const { Usuario } = require('../models'); 

const router = express.Router();


router.post('/usuarios', async (req, res) => {
  try {
    const novoUsuario = await Usuario.create(req.body);
    res.status(201).json(novoUsuario);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao criar usuário', error });
  }
});


router.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar usuários', error });
  }
});


router.get('/usuarios/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (usuario) {
      res.status(200).json(usuario);
    } else {
      res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar usuário', error });
  }
});


router.put('/usuarios/:id', async (req, res) => {
  try {
    const [updated] = await Usuario.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const usuarioAtualizado = await Usuario.findByPk(req.params.id);
      res.status(200).json(usuarioAtualizado);
    } else {
      res.status(404).json({ mensagem: 'Usuário não encontrado ou sem alterações' });
    }
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao atualizar usuário', error });
  }
});


router.delete('/usuarios/:id', async (req, res) => {
  try {
    const deletado = await Usuario.destroy({
      where: { id: req.params.id }
    });
    if (deletado) {
      res.status(200).json({ mensagem: 'Usuário deletado com sucesso' });
    } else {
      res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao deletar usuário', error });
  }
});

module.exports = router;
