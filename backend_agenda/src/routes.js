const Router = require("express")
const contactRoutes = require("./controllers/contactsControllers")
const multer = require("multer")
const multerConfig = require("./config/multer")

const routes = Router()

routes.get("/api/v1/contacts", contactRoutes.index)
routes.post("/api/v1/contacts", multer(multerConfig).single("file"), contactRoutes.create)
routes.get("/api/v1/contacts/:id", contactRoutes.show)
routes.delete("/api/v1/contacts/:id", contactRoutes.delete)
routes.put("/api/v1/contacts/:id", contactRoutes.update)


module.exports = routes 