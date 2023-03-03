module.exports = app => {

    const task = require("../controllers/task.controller")

    let router = require("express").Router()

    router.post("/", task.create)

    router.get("/", task.findAll)

    router.get("/:uid", task.findAllOfUser)

    router.get("/:uid/:title", task.findOne)

    //TODO: regarder si on peut passer un objet direct
    //router.put(/:uid/:title/:description/:category/:status/:date/:done)

    router.delete("/:uid/:title", task.delete)

    router.delete("/:uid", task.deleteAllOfUser)

    router.delete("/", task.deleteAll)

    app.use('/api/task', router)
}