<template>
  <div class="gallery" @click="handleImageClick">
    <div v-if="false" class="delete-button" @click="handleDelete">
      <i class="fas fa-times-circle"></i>
    </div>
    <img :src="getImageUrl(gallery.image, gallery.name, gallery.description)" alt="Gallery Image" />
  </div>
</template>

<script>
import { galleries } from '@/api/galleryApi'
export default {
  props: {
    gallery: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      imageURL: '',
      imageName: '',
      imageDescription: ''
    }
  },

  methods: {
    getImageUrl(imageBufferObject, imageName, imageDescription) {
      if (!imageBufferObject || !imageBufferObject.data || !Array.isArray(imageBufferObject.data)) {
        return null
      }

      const blob = new Blob([new Uint8Array(imageBufferObject.data)], { type: imageBufferObject.type })
      const dataUrl = URL.createObjectURL(blob)
      this.imageURL = dataUrl
      this.imageName = imageName
      this.imageDescription = imageDescription
      return dataUrl
    },
    async handleDelete() {
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
    async handleEdit() {
      this.$emit('edit-gallery', this.gallery)
    },
    async handleImageClick() {
      this.$emit('click', this.imageURL, this.imageName, this.imageDescription)
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

.delete-button i {
  color: rgb(255, 136, 0);
  transition: color 0.3s ease-in-out;
}

.delete-button:hover i{
  color: red;
  font-size: 30px;
}

</style>
