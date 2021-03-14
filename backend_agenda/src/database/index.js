const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/contacts_book", {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
}).then(() => {
    console.log("Sucessfull connection on MongoDB ")
} ).catch((error) => {
    console.log("ERROR!"+ error)
    process.exit()
}) 
mongoose.Promise = global.Promise

module.exports = mongoose
