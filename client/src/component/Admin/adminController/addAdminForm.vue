<!--
* This component can be used to add a new admin to your application.
  It has a form with fields for the admin's name, phone number, email, and password.
  When the user clicks the "Save" button, the form data is submitted to the API to create the new admin.
* This component emits the following events:
* close-modal: When the modal is closed.
* admin-added: When a new admin is successfully added.
-->
<template>
  <div class="modal-overlay" v-if="showModel">
    <div class="modal-content">
      <h1>Add a new admin</h1>
      <div class="form-container">
        <errorHandler :errorMessage="errorMessage" v-if="errorMessage" />
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="name">Name:</label>
            <input v-model="form.name" type="text" id="name" required />
          </div>

          <div class="form-group">
            <label for="phone">Phone:</label>
            <input v-model="form.phone" type="number" id="phone" required />
          </div>

          <div class="form-group">
            <label for="email">Email:</label>
            <input v-model="form.email" type="text" id="email" required>
          </div>
          <div class="form-group">
            <label for="password">Password:</label>
            <input v-model="form.password" type="password" id="password" required />
          </div>
          <button type="submit">Save</button>
          <button class="close-button" @click="closeModal">Cancel</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { admin } from '@/api/adminApi'
import errorHandler from '../../errorHandler.vue'
export default {
  props: ['showModel'],
  components: {
    errorHandler
  },
  data() {
    return {
      form: {
        name: '',
        phone: null,
        email: '',
        password: null
      },
      errorMessage: ''
    }
  },
  methods: {
    handleSubmit() {
      const formData = {
        name: this.form.name,
        phone: this.form.phone,
        email: this.form.email,
        password: this.form.password
      }
      admin.createAdmin(formData)
        .then(() => {
          this.$emit('close-modal')
          this.$emit('admin-added')
        })
        .catch(error => {
          this.errorMessage = JSON.stringify(error.response.data.message)
        })
    },
    closeModal() {
      this.$emit('close-modal')
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 80%;
  margin-top: 60px;
}

.form-container {
  max-width: 400px;
  width: 100%;
}

.form-group {
  margin-bottom: 10px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input,
.form-group textarea {
  width: calc(100% - 20px);
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: none;
}

button {
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #2980b9;
}

.close-button {
  margin-top: 10px;
  margin-left: 10px;
}
</style>
