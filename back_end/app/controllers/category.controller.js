const db = require("../models");
const CategoryDB = db.category;

exports.create = (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .send({ message: "Le contenu ne peut pas être vide" });
  }

  CategoryDB.create({
    uid: req.body.uid,
    title: req.body.title,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Erreur pendant la création de la nouvelle catégorie",
      });
    });
};

exports.findAll = (req, res) => {
  CategoryDB.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(500).send({
        message:
          err.message ||
          "Une erreur est survenue pendant la réucpération des catégories",
      });
    });
};

exports.findAllOfUser = (req, res) => {
  const uid = req.params.uid;
  let condition = uid
    ? { uid: { $regex: new RegExp(uid), $options: "i" } }
    : {};

  CategoryDB.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(500).send({
        message:
          err.message ||
          "Une erreur est survenue pendant la réucpération des catégories",
      });
    });
};

exports.findOne = (req, res) => {
  const uid = req.params.uid;
  const title = req.params.title;

  let condition = uid && title ? { uid: uid, title: title } : {};

  CategoryDB.findOne(condition)
    .then((data) => {
      if (!data)
        res
          .status(404)
          .send({ message: `La catégorie ${title} n'a pas été trouvé` });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: `Une erreur est survenue pendant la récupération de la catégorie ${title}`,
      });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Le contenu ne peut pas être vide",
    });
  }

  const uid = req.params.uid;
  const title = req.params.title;

  CategoryDB.collection
    .updateOne(
      { uid: uid, title: title },
      {
        $set: {
          title: title,
        },
      }
    )
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Impossible de mettre à jour la catégorie ${title}`,
        });
      } else {
        res.send({
          message: `La catégorie ${title} a correctement été mise à jour`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Une erreur est survenue pendant la mise à jour de la catégorie ${title}`,
      });
    });
};

exports.delete = (req, res) => {
  const uid = req.params.uid;
  const title = req.params.title;

  CategoryDB.collection
    .update({ uid: uid }, { $pull: { title: title } })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Impossible de supprimer le catégorie ${title}`,
        });
      } else {
        res.send({
          message: `La catégorie ${title} a été supprimée`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Une erreur est survenue pendant la suppression de la catégorie ${title}`,
      });
    });
};

exports.deleteAllOfUser = (req, res) => {
  const uid = req.params.uid;

  CategoryDB.deleteMany({
    uid: uid,
  })
    .then((data) => {
      res.send({
        message: `Toutes les catégories de l'utilisateur ${uid} ont été supprimées`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Une erreur est survenue pendant la suppression des catégories de l'utilisateur ${uid}`,
      });
    });
};

exports.deleteAll = (req, res) => {
  CategoryDB.deleteMany({}).then((data) => {
    res.send({
        message: "Toutes les catégories de tous les utilisateurs ont été supprimées"
    })
  }).catch((err) => {
    res.status(500).send({
        message: err.message || "Une erreur est survenue pendant la suppression de toutes les tâches de tous les utilisateurs"
    })
  })
};
