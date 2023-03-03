module.exports = app => {

    const category = require("../controllers/category.controller")

    let router = require("express").Router()

    router.post("/", category.create)

    router.get("/", category.findAll)

    router.get("/:uid", category.findAllOfUser)

    router.get("/:uid/:title", category.findOne)

    router.put("/:uid/:title", category.update)

    router.delete("/:uid/:title", category.delete)

    router.delete("/:uid", category.deleteAllOfUser)

    router.delete("/", category.deleteAll)

    app.use('/api/category', router)
}