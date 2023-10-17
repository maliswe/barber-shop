<!--
 * This component is used to display a modal for updating customer details. It includes a form for
 * editing the customer's name, phone, email, and password. The form data is populated with the
 * current customer's information, if provided. Upon submission, the form data is sent to the API
 * for updating the customer record.
-->
<template>
  <div class="modal-overlay" v-if="showEdit">
    <div class="modal-content">
      <h1>Update a customer</h1>
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
            <input v-model="form.password" type="password" id="password" />
          </div>
          <button type="submit">Save</button>
          <button class="close-button" @click="closeModal">Cancel</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { customer } from '@/api/customerApi'
import errorHandler from '../../errorHandler.vue'

export default {
  props: {
    showEdit: {
      type: Boolean,
      required: true
    },
    currentCustomer: {
      type: Object,
      default: null
    }
  },
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
  watch: {
    currentCustomer: {
      handler(newCustomer) {
        if (newCustomer) {
          this.form.name = newCustomer.name || ''
          this.form.phone = newCustomer.phone || null
          this.form.email = newCustomer.email || ''
        }
      },
      immediate: true
    }
  },
  methods: {
    handleSubmit() {
      const formData = {
        name: this.form.name,
        phone: this.form.phone,
        email: this.form.email
      }
      if (this.form.password) {
        formData.password = this.form.password
      }

      customer.updateCustomer(this.currentCustomer.phone, formData)
        .then(() => {
          this.$emit('close-modal')
          this.$emit('customer-updated')
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
