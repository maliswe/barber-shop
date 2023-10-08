<template>
  <div class="modal-overlay" v-if="showEdit">
    <div class="modal-content">
      <h1>Update a barber</h1>
      <div class="form-container">
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
            <label for="experties">Experties:</label>
            <textarea v-model="form.experties" id="experties" required></textarea>
          </div>

          <div class="form-group">
            <label for="service">Services:</label>
            <input v-model="form.service" id="service">
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
import { barber } from '@/api/barberApi'

export default {
  props: {
    showEdit: {
      type: Boolean,
      required: true
    },
    currentService: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      form: {
        name: '',
        phone: null,
        email: '',
        password: null,
        experties: null,
        service: null
      }
    }
  },
  watch: {
    currentService: {
      handler(newService) {
        // Update form whenever currentService changes
        if (newService) {
          this.form.name = newService.name || ''
          this.form.phone = newService.phone || null
          this.form.email = newService.email || ''
          this.form.experties = newService.experties || ''
          this.form.service = newService.service || ''
        }
      },
      immediate: true // Call the handler immediately with the current value
    }
  },
  methods: {
    handleSubmit() {
      const formData = {
        name: this.form.name,
        phone: this.form.phone,
        email: this.form.email,
        experties: this.form.experties,
        service: this.form.service
      }
      if (this.form.password) {
        formData.password = this.form.password
      }

      barber.updateBarber(this.currentService.phone, formData)
        .then(() => {
          this.$emit('close-modal')
          this.$emit('barber-updated')
        })
        .catch(error => {
          console.error('Error adding service:', error)
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
