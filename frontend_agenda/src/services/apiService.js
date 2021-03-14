import { http } from "../config/axiosConfig"

export default{
    listar: () => {
        return http.get("/contacts")
    },
    criar: (contact) => {
        return http.post("/contacts", contact)
    },
    editar: (contact) => {
        return http.put(`/contacts/${contact._id}`, contact)
    },
    excluir: (id) => {
        return http.delete(`/contacts/${id}`)
    }
}