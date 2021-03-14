<template>
  <div class="container">
    <h1 class="jumbotron">{{ message }}</h1>
    <img v-if="avatar" :src="avatar" alt="" />
    <img v-else :src="imageStatic" alt="" />

    <div class="col-2">
      <label>Foto de Perfil</label>
      <input
        type="file"
        ref="inputFile"
        name="image"
        accept="image/*"
        @change="handleFile"
      />

      <div class="col-12 container-camera">
        <!-- <button
          class="container-image"
          type="button"
          @click="openFileDialog()"
        ></button> -->
      </div>

      <label>Nome e Sobrenome</label>
      <input v-model="contact.name" />
      <br />
      <label>E-mail</label> <br />
      <input type="email" v-model="contact.email" />
      <br />
      <label>Telefone Celular</label>
      <input type="number" v-model="contact.phone" />
      <br />
      <label>Endereço</label>
      <input v-model="contact.address" />
      <br />
      <br />

      <button
        class="mt-3 mb-3 btn btn-primary"
        v-if="!contact._id"
        @click="createContact()"
      >
        Adicionar
      </button>
      <button class="mt-3 mb-3 btn btn-primary" v-else @click="updateContact()">
        Salvar
      </button>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th scope="col">Nome</th>
          <th scope="col">Celular</th>
          <th scope="col">Email</th>
          <th scope="col">Endereço</th>
          <th scope="col">Data</th>
          <th scope="col">Ação</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in list" :key="item.id">
          <!-- <th scope="row">{{ item.id }}</th> -->
          <td>{{ item.name }}</td>
          <td>{{ item.phone }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.address }}</td>
          <td>{{ item.date }}</td>
          <td>
            <button @click="editar(item)" class="btn btn-info">
              Editar
            </button>
            <button @click="deleteContact(item)" class="btn btn-danger">
              Excluir
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import api from "../services/apiService";

export default {
  name: "home-components",
  data: () => ({
    message: "Agenda de Contatos",
    contact: {},
    avatar: null,
    imageStatic: require("@/assets/avatar_perfil.png"),

    //index: null,
    list: []
  }),

  mounted() {
    //const contacts = JSON.parse(localStorage.getItem("contacts"));
    //this.list = contacts ? contacts : [];
    this.listContacts();
  },

  methods: {
    async listContacts() {
      await api
        .listar()
        .then(response => {
          this.list = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },

    async createContact() {
      const formData = new FormData();

      formData.append("name", this.contact.name);
      formData.append("email", this.contact.email);
      formData.append("phone", this.contact.phone);
      formData.append("address", this.contact.address);
      formData.append("file", this.contact.file, this.contact.file.name);

      await api
        .criar(formData)
        .then(() => {
          this.listContacts();
          this.contact = {};
        })
        .catch(error => {
          console.log(error);
        });
    },

    async updateContact() {
      await api
        .editar(this.contact)
        .then(() => {
          this.listContacts();
          this.contact = {};
        })
        .catch(error => {
          console.log(error);
        });
    },

    async deleteContact(item) {
      const A = confirm("Voce tem certeza que deseja excluir?");
      if (A == true) {
        await api
          .excluir(item._id)
          .then(() => {
            this.listContacts();
          })
          .catch(error => {
            console.log(error);
          });
      }
    },

    editar(item) {
      this.contact = { ...item };
    },

    openFileDialog() {
      this.$refs.inputFile.value = null;
      this.$refs.inputFile.click();
    },

    handleFile(event) {
      let image = event.target.files[0];
      console.log(image);
      let reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = event => {
        this.avatar = event.target.result;
        //this.contact.file = ;
      };
    }
  }
};
</script>

<style></style>
