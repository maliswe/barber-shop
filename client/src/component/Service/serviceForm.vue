<template>
  <div class="modal-overlay" v-if="showModel">
    <div class="modal-content">
      <div>
        <form @submit.prevent="handleSubmit">
          <label>Name:</label>
          <input v-model="form.name" type="text" required />

          <label>Price:</label>
          <input v-model="form.price" type="number" required />

          <label>Description:</label>
          <textarea v-model="form.description" required></textarea>

          <label>Duration:</label>
          <input v-model="form.duration" type="number" required />

          <label>Upload Image:</label>
          <input type="file" @change="handleImageUpload" accept="image/*" />

          <button type="submit">Save</button>
        </form>
        <button @click="closeModal">Close Modal</button>
      </div>
    </div>
  </div>
</template>

<script>
import { services } from '@/api/serviceApi'
export default {
  props: ['showModel'],
  data() {
    return {
      form: {
        name: '',
        price: null,
        description: '',
        duration: null,
        image: null // This will hold the image file
      }
    }
  },
  methods: {
    handleImageUpload(event) {
      const file = event.target.files[0]
      this.form.image = file
    },
    handleSubmit() {
      const formData = new FormData()
      formData.append('name', this.form.name)
      formData.append('price', this.form.price)
      formData.append('description', this.form.description)
      formData.append('duration', this.form.duration)
      formData.append('image', this.form.image)
      services.createService(formData)
        .then(() => {
          this.$emit('close-modal')
          this.$emit('fetch-services')
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
}

</style>
