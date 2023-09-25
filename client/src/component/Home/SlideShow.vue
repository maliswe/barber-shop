<template>
  <div>
    <div class="header">
      <h1>Our Best Services</h1>
    </div>
    <div class="rectangle-22"></div>
    <div class="image-container">
      <div
        v-for="(image, index) in images"
        :key="index"
        :class="[
          'image-item',
          'image-' + (index + 1),
          { selected: index === currentIndex }
        ]"
        @click="setCurrentIndex(index)"
        :style="imagePositions[index]"
      >
        <img
          :src="require(`@/component/images/${image}`)"
          :alt="`Image ${index + 1}`"
          class="resizable-image"
        />
        <div class="overlay" v-if="index === currentIndex"></div>
        <div class="thumbnail-buttons"></div>
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
        { left: '50px', bottom: '-1500px' }, // Update positions here
        { left: '500px', bottom: '-1500px' }, // Adjust as needed
        { left: '950px', bottom: '-1500px' }, // Adjust as needed
        { left: '1350px', bottom: '-1500px' } // Adjust as needed
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
.header {
  position: absolute;
  width: 400px;
  height: 48px;
  left: 750px;
  top: 210%;
  font-family: 'Fira Sans', sans-serif;
  font-weight: 900;
  font-size: 38px;
  line-height: 48px;
  text-align: center;
  text-transform: capitalize;
  color: #272522;
}

.rectangle-22 {
  position: absolute;
  bottom: -1000px;
  left: 935px;
  width: 29px;
  height: 5px;
  background: #eab172;
}

.image-item {
  text-align: center;
  padding: 10px;
  cursor: pointer;
  position: absolute;
  width: 360px;
  height: 482px;
  margin-right: 20px; /* Added margin for spacing */
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%; /* Updated width to 100% */
  height: 100%; /* Updated height to 100% */
  background-color: rgba(0, 0, 0, 0.5);
  display: none;
  transition: opacity 0.3s;
}

.selected .overlay {
  display: block;
}

/* Updated styles for resizable images */
.resizable-image {
  width: 400px; /* Updated width */
  height: 500px; /* Updated height */
}
</style>
