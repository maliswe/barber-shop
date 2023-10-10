<template>
    <div class="gallery-container">
      <div class="gallery-row">
        <headerPhoto class="gallery-img"
        v-for="gallery in galleries"
        :key="gallery._id"
        :gallery="gallery"
        @gallery-deleted="handleGalleryDeleted"
        @edit-gallery="handleEditGallery"
        @click="openPopup"
        />
      </div>
      <Popup
      :show="showModel"
      :image="popupImage"
      @close="closeModal"
      />
  </div>
</template>

<script>

import headerPhoto from '../component/Gallery/galleryPhoto.vue'
import Popup from '../component/Gallery/popUp.vue'
import { galleries } from '@/api/galleryApi'

export default {
  name: 'Gallery',
  components: {
    headerPhoto,
    Popup
  },
  data() {
    return {
      galleries: [],
      showModel: false,
      popupImage: ''
    }
  },
  async created() {
    await this.fetchGalleries()
  },
  methods: {
    async fetchGalleries() {
      try {
        const response = await galleries.getAllGalleries()
        this.galleries = response.data
        console.log('Fetched galleries:', this.galleries)
      } catch (error) {
        console.error('Error fetching galleries:', error)
      }
    },
    closeModal() {
      this.showModel = false
      this.showEdit = false
    },
    async handleGalleryDeleted(galleryId) {
      this.galleries = this.galleries.filter(gallery => gallery._id !== galleryId)
    },
    async openPopup(image) {
      this.popupImage = image
      this.showModel = true
    }
  }
}
</script>

<style>
.gallery-container {
    display: block;
    padding-top: 200px;
    padding-bottom: 100px;
}
.gallery-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
.gallery-img {
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 20px;
}
.gallery-img >*{
  flex: 1 0 0;
  min-height: 0;
  display: flex;
}
.gallery-img img {
  max-height: 100%;
  margin-left: auto;
  margin-right: auto;
  padding: 0px 10px;
  }

</style>
