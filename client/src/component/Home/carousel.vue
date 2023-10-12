<template>
  <div class="carousel-container">
    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel" data-interval="5000">
      <ol class="carousel-indicators">
        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
      </ol>
      <div class="carousel-inner">
        <div v-for="(image, index) in images" :key="index" :class="{ 'carousel-item': true, active: index === 0 }">
          <img class="d-block w-100" :src="image" :alt="'Slide ' + (index + 1)">
        </div>
      </div>
    </div>
    <div class="carousel-overlay">
      <h1>
        Collection <br>
        hair & beard
      </h1>
      <p>
        Here are many variations of passages of Lorem Ipsum <br>
        available, but the majority suffered
      </p>
      <button @click="navigateToPage">See All Services</button>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    images: {
      type: Array,
      default: () => [
        // Update these paths with your new images:
        require('../../assets/barber-1.png'),
        require('../../assets/barber-2.png'),
        require('../../assets/barber-3.png')
      ]
    }
  },
  mounted() {
    $('#carouselExampleIndicators').carousel()
  },
  methods: {
    navigateToPage() {
      this.$router.push({ name: 'Service' })
    }
  }
}
</script>

<style lang="scss" scoped>
.carousel-container {
  position: relative; // This makes sure the absolute positioned child is relative to this container

  .carousel-overlay {
    position: absolute; // This makes the text overlay the carousel
    top: 60%; // Center it vertically
    left: 30%; // Center it horizontally
    transform: translate(-50%, -50%); // Adjust for exact centering
    z-index: 10; // Make sure the text is above the images
    color: #fff; // Making the text color white for visibility
    font-size: 4rem;
    font-weight: 800;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

    h1 {
      font-size: 4rem;
      font-weight: bold;
    }

    p {
      padding-top: 5%;
      font-size: 1.5rem;
      font-weight: 100;
      color: rgba(205, 209, 212, 0.774);
    }
  }

  .carousel-overlay button {
    margin-top: 7.5%;
    padding: 10px 20px;
    background-color: #ffffff00;
    border: 2px solid #E7A356; // This will give the button a border
    border-radius: 5px;
    color: #ffffff;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;
    font-size: 1.5rem;

    &:hover {
      background-color: #E7A356;
      color: #ffffff;
    }
  }
}

.carousel-indicators li {
  border-radius: 50%; // Makes the shape circular
  width: 10px; // Define the width of the actual circle
  height: 10px; // Define the height of the actual circle
  margin: 1px 8px; // Adjust spacing if needed
  background-color: rgba(255, 255, 255, 0.5); // A transparent white background for non-active indicators
  border: 2px; // White border around the indicator

  &.active {
    // This targets the currently active indicator
    background-color: white; // Background color for active indicator
    border-color: white; // White border for active indicator
    outline: 4px solid #E7A356; // Adds an additional outer border
    outline-offset: 2px; // Adjusts the space between the border and the outline
  }
}

.carousel-item {
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.637); // Black shape with 30% opacity
    z-index: 5; // Ensuring it's above the image but below any other content (like text)
  }

  img {
    z-index: 1; // This ensures the image is beneath the overlay
  }
}

@media (max-width: 1140px) and (min-width: 999px) {
  .carousel-container {

    .carousel-overlay {

      h1 {
        font-size: 3.5rem;
      }

      p {
        font-size: 1.3rem;
      }

      button {
        font-size: 1.3rem;
        padding: 9px 19px;
      }
    }
  }
}

@media (max-width: 998px) and (min-width: 799px) {
  .carousel-container {

    .carousel-overlay {

      h1 {
        font-size: 3rem;
      }

      p {
        font-size: 1.2rem;
      }

      button {
        font-size: 1.2rem;
        padding: 8px 18px;
      }
    }
  }
}

@media (max-width: 798px) and (min-width: 413px) {
  .carousel-container {

    .carousel-overlay {

      h1 {
        font-size: 2rem;
      }

      p {
        font-size: 1rem;
      }

      button {
        font-size: 1rem;
        padding: 6px 16px;
      }
    }
  }
}

@media (max-width: 412px) {
  .carousel-container {

    .carousel-overlay {
      padding: 10%;
      margin-left: 10px;
      margin-top: 5%;
      display: flex;
      flex-direction: column;
      align-items: flex-start; // To align items to the left

      h1 {
        font-size: 1rem;
        margin-bottom: 0.5rem; // reduce bottom margin
        margin-top: 0; // remove top margin
      }

      p {
        font-size: 0.5rem;
        margin-bottom: 0.5rem; // give it a small bottom margin
        padding: 0;
      }

      button {
        font-size: 0.9rem;
        padding: 5px 10px; // some padding to make the button look good
        margin-bottom: 0; // remove the huge bottom margin
      }
    }
  }
}
</style>
