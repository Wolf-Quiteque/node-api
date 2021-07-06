const router = require("express").Router();
const Post = require("../models/Post");
const Usuario = require("../models/Usuario");
//criar posts
router.post("/", async (req, res) => {
  const novoPost = new Post(req.body);
  try {
    const postGuardado = await novoPost.save();
    res.status(200).json(postGuardado);
  } catch (err) {
    res.status(500).json(err);
  }
});

//atualizar posts
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("post feito atualizado");
    } else {
      res.status(403).json("podes atualizar na sua conta");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//eliminar posts
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne({ $set: req.body });
      res.status(200).json("eliminado com successo");
    } else {
      res.status(403).json("podes elminar na tua conta");
    }
  } catch {
    res.status(500).json(err);
  }
});

//gostar posts / e nao gostar
router.put("/:id/gostar", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("gostaste do poste");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("parou de gostar");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id/des/gostar", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.dislikes.includes(req.body.userId)) {
      await post.updateOne({ $push: { dislikes: req.body.userId } });
      res.status(200).json("nao gostaste do poste");
    } else {
      await post.updateOne({ $pull: { dislikes: req.body.userId } });
      res.status(200).json("parou de nao gostar");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//buscar posts
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//buscar timeline

router.get("/timeline/:userId", async (req, res) => {
  try {
    const usuarioActual = await Usuario.findById(req.params.userId);
    const userPosts = await Post.find({ userId: usuarioActual._id });
    const seguirPosts = await Promise.all(
      usuarioActual.aseguir.map((seguidorId) => {
        return Post.find({ userId: seguidorId });
      })
    );
    res.status(200).json(userPosts.concat(...seguirPosts));
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/perfil/:username", async (req, res) => {
  try {
    const user = await Usuario.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user._id });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
