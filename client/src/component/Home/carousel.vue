<template>
  <div>
    <div class="carousel-1">
      <b-carousel id="carousel-1" v-model="slide" :interval="10000" controls indicators background="#ababab"
        style="text-shadow: 1px 1px 2px #ffffff;" @sliding-start="onSlideStart"
        @sliding-end="onSlideEnd">
        <b-carousel-slide img-src="https://storage.googleapis.com/hairdressr-prod-blog/barberare-kungsholmen/barbershop.jpg"
        img-width="50" img-height="50"/>
        <b-carousel-slide img-src="https://images.squarespace-cdn.com/content/v1/6401e14b44c9bd5c9d86ac28/598a0554-ab45-4bc4-80d4-1f8a558c0cf3/tpbsm-homepage.JPG"
        img-width="50" img-height="50"/>
        <b-carousel-slide img-src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAhy2WcsMW1bz82VrS3qznmFVtX74KEKVKRw&usqp=CAU"
        img-width="50" img-height="50"/>
      </b-carousel>
    </div>
    <div class="carousel-caption-container">
      <div class="carousel-caption-text">
        <h1>Collection</h1>
        <h1>Hair & Beard</h1>
        <p>Here are many variations of passages of Lorem Ipsum available, but the majority suffered</p>
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
  position: absolute;
  top: 200px;
  left: 2px;
  right: 2px;
  bottom: 2px;
}

.carousel-caption-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 50%;
  z-index: 1;
  pointer-events: none;
}

.carousel-caption-text {
  position: absolute;
  top: 90%;
  left: 10%;
  text-align: left;
  color: rgb(255, 255, 255);
  text-shadow: 2px 2px #000000;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.carousel-caption-text h1 {
  margin: 0;
  font-size: 60px;
}

.carousel-caption-text p {
margin: 0;
font-size: 30px;
}

@media (max-width: 500px) {
  .carousel-caption-text h1 {
    font-size: 18px;
.carousel-caption-text p{
font-size: 8px;
}
  }
}

</style>
