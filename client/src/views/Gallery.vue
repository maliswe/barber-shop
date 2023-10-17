<!--
* The "Gallery" component displays a collection of images and provides the ability to view them in a popup, add new images (for Admins), and delete images.
* It communicates with the "headerPhoto," "Popup," and "galleryAddForm" child components.
-->
<template>
    <div class="gallery-container">
      <div class="gallery-row">
        <div v-if="isLoading" class="loading-circle">
        <i class="fas fa-circle-notch fa-spin"></i>
      </div>
        <headerPhoto class="gallery-img"
        v-for="gallery in galleries"
        :key="gallery._id"
        :gallery="gallery"
        @gallery-deleted="handleGalleryDeleted"
        @click="openPopup"
        />
      </div>
      <Popup
      :show="showModel"
      :image="popupImage"
      @close="closeModal"
      />
      <div class="addHolder" v-if="isLoggedIn && (role === 'Admin')">
        <button class="rectangle-button" @click="showFormModel">
          <i class="fas fa-plus"></i>
        </button>
      </div>
      <galleryAddForm :showFormModel="showAdd" @close-modal="closeModal" @fetch-galleries="fetchGalleries"/>
  </div>
</template>

<script>

import headerPhoto from '../component/Gallery/galleryPhoto.vue'
import Popup from '../component/Gallery/popUp.vue'
import galleryAddForm from '../component/Gallery/galleryAddForm.vue'
import { galleries } from '@/api/galleryApi'
import { mapState } from 'vuex'

export default {
  name: 'Gallery',
  components: {
    headerPhoto,
    Popup,
    galleryAddForm
  },
  computed: {
    ...mapState(['isLoggedIn', 'role'])
  },
  data() {
    return {
      galleries: [],
      showModel: false,
      popupImage: '',
      showAdd: false,
      isLoading: true
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
        this.isLoading = false
      } catch (error) {
        console.error('Error fetching galleries:', error)
      }
    },
    closeModal() {
      this.showModel = false
      this.showAdd = false
    },
    showFormModel() {
      this.showAdd = true
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
.addHolder {
  display: flex;
  justify-content: center;
  align-items: center;
}
.gallery-container {
    display: block;
    padding-top: 20%;
    padding-bottom: 20%;
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
.loading-circle {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  z-index: 1;
}

.loading-circle i {
  font-size: 150px;
  color: #3498db;
}

</style>
