<template>
  <div>
    <div class="carousel-1">
      <b-carousel>
        id="carousel-1" v-model="slide" :interval="10000" :hide-controls="true"
        indicators background="#ababab" style="text-shadow: 1px 1px 2px #ffffff"
        @sliding-start="onSlideStart" @sliding-end="onSlideEnd"
        <b-carousel-slide img src="@/assets/barber-1.png" alt="first barber image"/>
        <b-carousel-slide img src="@/assets/barber-2.png" alt="second barber image"/>
        <b-carousel-slide img src="@/assets/barber-3.png" alt="third barber image"/>
      </b-carousel>
    </div>
    <div class="carousel-caption-container">
      <div class="carousel-caption-text">
        <h1>Collection</h1>
        <h1>Hair & Beard</h1>
        <p>
          Here are many variations of passages of Lorem Ipsum available, but the
          majority suffered
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slide: 0,
      sliding: null
    }
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true
    },
    onSlideEnd(slide) {
      this.sliding = false
    }
  }
}
</script>

<style scoped>
.carousel-1 {
  border: black;
  width: 100%;
  top: 80px;
}

.carousel-caption-container {
  width: 50%;
  height: 50%;
}

.carousel-caption-text {
  text-align: left;
  color: rgb(255, 255, 255);
  text-shadow: 2px 2px #000000;
}

.carousel-caption-text h1 {
  margin: 0;
  font-size: 60px;
}

.carousel-caption-text p {
  margin: 0;
  font-size: 30px;
}
</style>
