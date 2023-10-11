<template>
  <div class="gallery" @click="handleImageClick">
    <div class="delete-button" v-if="isLoggedIn && (role === 'Admin')" @click="handleDelete">
      <i class="fas fa-times-circle"></i>
    </div>
    <img :src="getImageUrl(gallery.image)" alt="Gallery Image" />
  </div>
</template>

<script>
import { galleries } from '@/api/galleryApi'
import { mapState } from 'vuex'

export default {
  props: {
    gallery: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState(['isLoggedIn', 'role'])
  },
  data() {
    return {
      imageURL: ''
    }
  },

  methods: {
    getImageUrl(imageBufferObject) {
      if (!imageBufferObject || !imageBufferObject.data || !Array.isArray(imageBufferObject.data)) {
        return null
      }
      const blob = new Blob([new Uint8Array(imageBufferObject.data)], { type: imageBufferObject.type })
      const dataUrl = URL.createObjectURL(blob)
      this.imageURL = dataUrl
      return dataUrl
    },
    async handleDelete(event) {
      event.stopPropagation()
      const confirmation = window.confirm('Do you really want to delete?')
      if (confirmation) {
        try {
          await galleries.deleteGallery(this.gallery._id)
          this.$emit('gallery-deleted', this.gallery._id)
        } catch (error) {
          console.error('Error fetching galleries:', error)
        }
      }
    },
    async handleImageClick() {
      this.$emit('click', this.imageURL)
    }
  }
}
</script>

<style scoped>
.gallery {
    display: flex;
    flex-direction: row;
}

.gallery img {
  max-width: fill;
  cursor: pointer;
}

.delete-button {
  position: absolute;
  border-radius: 20px;
  padding: 8px;
  cursor: pointer;
  font-size: 23px;
}

.delete-button i {
  color: rgb(255, 136, 0);
  transition: color 0.3s ease-in-out;
}

.delete-button:hover i{
  color: red;
  font-size: 30px;
}

</style>
