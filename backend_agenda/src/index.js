const express = require("express")
const cors = require ("cors")
const routes = require("./routes")
const path = require("path")

const port = 3333
const app = express()

app.use(cors())
app.use(express.json())
app.use("/contacts/uploads", express.static(path.resolve(__dirname, "..", "temp", "uploads")))
app.use(routes)

app.listen(port, () => {
    console.log("Servidor Iniciado ✔😃")
}  )