const mongoose = require("../database")
const contactSchema = new mongoose.Schema({
     name: {
         type: String,
         require: true
     },
     email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true 
     },
     phone: {
         type: String,
         require: true
     },
     address: {
         type: String,
         require: true
     },
     date: {
         type: Date,
         default: Date.now
     },
     image: {
        nameImage: String,
        size: Number,
        key: String,
        url: String,
        createdAt: {
          type: Date,
          default: Date.now
        }
    }
});

const Contact = mongoose.model("Contact", contactSchema)  //cria collection

module.exports = Contact