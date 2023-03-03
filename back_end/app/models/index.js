const dbConfig = require("../config/db.config")

const mongoose = require("mongoose")
mongoose.Promise = global.Promise

const db = {}
db.mongoose = mongoose
db.url = dbConfig.url
db.task = require("./task.model.js")(mongoose);
db.user = require("./user.model.js")(mongoose);
db.category = require("./category.model")(mongoose)
//ajouter les modeles

module.exports = db

