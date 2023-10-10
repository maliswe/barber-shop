<template>
  <div v-if="show" class="popup-container">
    <div class="popup-content">
      <img :src="image" alt="Full Resolution" ref="popupImage" />
      <button class="close-button" @click="closePopup">
        <i class="fas fa-times-circle"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: Boolean,
    image: String
  },
  mounted() {
    this.adjustImageDimensions()
  },
  updated() {
    this.adjustImageDimensions()
  },
  methods: {
    closePopup() {
      this.$emit('close')
    },
    adjustImageDimensions() {
      const popupImage = this.$refs.popupImage
      if (popupImage) {
        const maxHeight = window.innerHeight * 0.8 // 80% of the window height
        const maxWidth = window.innerWidth * 0.8 // 80% of the window width

        // Set image dimensions based on aspect ratio
        if (popupImage.naturalHeight > maxHeight) {
          popupImage.style.height = `${maxHeight}px`
          popupImage.style.width = 'auto'
        } else if (popupImage.naturalWidth > maxWidth) {
          popupImage.style.width = `${maxWidth}px`
          popupImage.style.height = 'auto'
        }
      }
    }
  }
}
</script>

<style scoped>
.popup-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  z-index: 999;
}

.popup-content {
  background: #fff;
  max-width: 80%;
  max-height: 80%;
  text-align: center;
  position: relative;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
}

.popup-content img {
  max-width: 100%;
  height: auto;
}

.close-button {
  font-size: 23px;
}
</style>
