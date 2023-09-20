<template>
  <div>
    <div class="header">
      <h1>Our Best Services</h1>
    </div>
    <div class="slideshow">
      <img :src="currentImage" alt="Slideshow" />
      <button @click="prevSlide" class="slideshow-button prev">Previous</button>
      <button @click="nextSlide" class="slideshow-button next">Next</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        'first.png',
        'second.png',
        'third.png'
      ],
      currentIndex: 0
    }
  },
  computed: {
    currentImage() {
      return `/component/images/${this.images[this.currentIndex]}`
    }
  },
  methods: {
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length
    },
    prevSlide() {
      this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length
    }
  }
}
</script>

<style scoped>
.header {
  position: relative;
  padding: 2px;
}

.slideshow {
  width: 300px;
  overflow: hidden;
  position: relative;
}

.slideshow img {
  width: 100%;
  height: auto;
}

.slideshow-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
}

.slideshow-button.prev {
  left: 0;
}

.slideshow-button.next {
  right: 0;
}
</style>
