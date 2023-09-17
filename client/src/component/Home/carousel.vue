<template>
  <div>
    <div class="carousel-caption-container">
      <div class="carousel-caption-text">
        <h1>Collection </h1>
        <h1>Hair & Beard</h1>
        <p>Here are many variations of passages of Lorem Ipsum available, but the majority suffered</p>
      </div>
    </div>
    <b-carousel id="carousel-1" v-model="slide" :interval="10000" controls indicators background="#ababab"
      img-width="5" img-height="100" style="text-shadow: 1px 1px 2px #ffffff;" @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd">
      <b-carousel-slide img-src="https://storage.googleapis.com/hairdressr-prod-blog/barberare-kungsholmen/barbershop.jpg" />
      <b-carousel-slide img-src="https://images.squarespace-cdn.com/content/v1/6401e14b44c9bd5c9d86ac28/598a0554-ab45-4bc4-80d4-1f8a558c0cf3/tpbsm-homepage.JPG" />
      <b-carousel-slide img-src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAhy2WcsMW1bz82VrS3qznmFVtX74KEKVKRw&usqp=CAU" />
    </b-carousel>
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

  .b-carousel-slide {

  img-width: 50;
  img-height: 50;

  }
  .b-carousel-slide img {
    width: 10%;
    height: auto;
  }

  .carousel-caption-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    pointer-events: none;
  }

  .carousel-caption-text {
    position: absolute;
    top: 50%;
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
  }

</style>
