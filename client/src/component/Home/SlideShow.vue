<template>
  <div>
    <div class="header">
      <h1>Our Best Services</h1>
    </div>
    <div class="image-container">
      <div
        v-for="(image, index) in images"
        :key="index"
        :class="['image-item', 'image-' + (index + 1), { 'selected': index === currentIndex }]"
        @click="setCurrentIndex(index)"
        :style="imagePositions[index]"
      >
        <img
          :src="require(`@/component/images/${image}`)"
          :alt="`Image ${index + 1}`"
          class="resizable-image"
        />
        <div class="overlay" v-if="index === currentIndex"></div>
        <div class="thumbnail-buttons">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: ['first.png', 'second.png', 'third.png', 'forth.png'],
      currentIndex: 0,
      imagePositions: [
        { left: '320px', bottom: '-1400px' },
        { left: '640px', bottom: '-1400px' },
        { left: '960px', bottom: '-1400px' },
        { left: '1280px', bottom: '-1400px' } // Adjust positions as needed
      ]
    }
  },
  methods: {
    setCurrentIndex(index) {
      this.currentIndex = index
    }
  }
}
</script>

<style>
.image-item {
  text-align: center;
  padding: 20px;
  cursor: pointer;
  position: absolute;
  width: 300px;
  height: 400px;
}
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Dark overlay color */
  display: none;
  transition: opacity 0.3s;
}

.selected .overlay {
  display: block;
}

.image-1 {
  left: 320px;
  bottom: '-1400px';
}

.image-2 {
  left: 640px;
  bottom: '-1400px';
}

.image-3 {
  left: 960px;
  bottom: '-1400px';
}

.image-4 {
  left: 1280px;
  bottom: '-1400px';
}

.resizable-image {
  width: 100%;
  height: auto;
}
</style>
