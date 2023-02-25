const db = require("../models");
const TaskDB = db.task;

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Le contenu ne peut pas être vide" });
    return;
  }

  TaskDB.create({
    uid: req.body.uid,
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    done: req.body.done,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Une erreur est survenue pendant la création d'une nouvelle tâche.",
      });
    });
};

exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};

  TaskDB.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(500).send({
        message:
          err.message ||
          "Une erreur est survenue pendant la récupération des tâches.",
      });
    });
};

exports.findOne = (req, res) => {
  const uid = req.params.uid;
  const title = req.params.title;

  var condition =
    uid && title
      ? { uid: uid, title: title}
      : {};

  TaskDB.findOne(condition)
    .then((data) => {
        if(!data)
            res.status(404).send({ message: `La tâche ${title} n'a pas été trouvée`})
        else res.send(data)
    })
    .catch(err => {
        res.status(500).send({ message: `Une erreur est survenue pendant la récupération de la tâche ${title}`})
    })
};

exports.update = (req, res) => {
    if(!req.body){
        return res.status(400).send({
            message: "Le contenu ne peut pas être vide"
        })
    }

    const uid = req.params.uid
    const title = req.params.title
    const description = req.params.description
    const category = req.params.category
    const done = req.params.done


    TaskDB.collection.updateOne(
        {uid: uid, title: title},
        {$set: {
            title: title,
            description: description,
            category: category,
            done: done
        }}
    ).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Impossible de mettre à jour la tâche ${title}`
            })
        } else res.send({message: `La tâche ${title} a correctement été mise à jour`})
    }).catch(err => {
        res.status(500).send({
            message: `Une erreur est survenue pendant la mise à jour de la tâche ${id}`
        })
    })
};

exports.delete = (req, res) => {
    const uid = req.params.uid
    const title = req.params.title

    TaskDB.collection.update(
        { "uid": uid },
        { $pull: {"title": title}}
      ).then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Impossible de supprimer la tâche ${title}.`,
          });
        } else {
          res.send({
            message: `La tâche ${title} a été supprimée`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: `Une erreur est survenue pendant la suppression de la tâche ${title}`,
        });
      });
};

exports.deleteAllOfUser = (req, res) => {
    const uid = req.params.uid

    TaskDB.deleteMany({
        uid: uid
    })
     .then((data) => {
       res.send({
         message: `Toutes les tâches de l'utilisateur ${uid} ont été supprimées`,
       });
     })
     .catch((err) => {
       res.status(500).send({
         message:
           err.message ||
           `Une erreur est survenue pendant la suppression des tâches de l'utilisateur ${uid}`,
       });
     });
}

exports.deleteAll = (req, res) => {
    TaskDB.deleteMany({})
     .then((data) => {
       res.send({
         message: `Toutes les tâches de tous les utilisateurs ont été supprimées`,
       });
     })
     .catch((err) => {
       res.status(500).send({
         message:
           err.message ||
           "Une erreur est survenue pendant la suppression de toutes les tâches de tous les utilisateurs",
       });
     });
};
