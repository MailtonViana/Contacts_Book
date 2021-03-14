const Contact = require("../models/contactModels")

const contactRoutes = {
    async index(request, response){
        try {
            const contacts = await Contact.find()
            return response.status(200).json(contacts)
        } catch (error) {
            return response.status(500).json({error: "Erro interno"+ error})
        }
    },

    async create(request, response){
        const {name, email, phone, address} = request.body
        const { originalName: nameImage, size, filename: key } = request.file;

        if(!name){
            return response.status(400).json({
                message: "Parametre Name is requered"})
        } 
        if(!email){
            return response.status(400).json({
                message: "Parametre Email is requered"})
        } 
        if(!phone){
            return response.status(400).json({
                message: "Parametre Phone is requered"})
        } 
        if(!address){
            return response.status(400).json({
                message: "Parametre Address is requered"})
        } 
        const contact = {
            name, 
            email,
            phone,
            address,
            image: {
                nameImage,
                size,
                key,
                url: `http://localhost:3333/contacts/uploads/${key}`,
            },
        }

        await Contact.create(contact).then((res) => {
            return response.status(201).json(res)
        }).catch((error) => {
            return response.status(400).json({
                message: "The contact was not created" + error})
        } )
    },
    
    async show(request, response){
        const {id} = request.params
        const contact = await Contact.find({_id:`${id}`})
        if(!contact){
            return response.status(400).json({
                message: "Contact not found"})
        }
            return response.status(200).json(contact)
    },
    
    async update(request, response){
        const {name, email, phone, address} = request.body
        const {id} = request.params
        const contactFounded = await Contact.find({_id:`${id}`})
        if(!contactFounded){
            return response.status(400).json({
                message: "Contact not found"})
        }
        const contact = {
            name, email, phone, address
        }

        await Contact.findByIdAndUpdate(`${id}`, {...contact})  //Salva no banco
        .then(() => {
            return response.status(200).json({
                message: "Contact updated sucessfully"
             })
        }).catch((error) => {
            return response.status(400).json({
                message: "The contact was not updated" + error})
        } )
        
    },

    async delete(request, response){
        const {id} = request.params
        const contact = await Contact.find({_id:`${id}`})
        if(!contact){
            return response.status(400).json({
                message: "Contact not found"})
        }
        await Contact.deleteOne({_id:`${id}`})
        return response.status(200).json({
            message: "Contact successfully deleted"})
    },

    async upload(request, response) {
        return response.status(201).json({ message: "Ok!" });
    },

}
module.exports = contactRoutes