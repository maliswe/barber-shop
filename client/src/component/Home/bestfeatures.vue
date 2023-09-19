<template>
  <div class="carousel-content">
    <div class="h1-text">
      <h1>Our Best Features</h1>
    </div>
    <div class="p1-text">
      <p>
        <span class="sentence">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
        <span class="sentence">Quis ipsum suspendisse ultrices gravida.Risus commodo viverra maecenas accumsan lacus vel facilisis</span>
        <span class="sentence1">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
      </p>
    </div>
    <div class="p2-text">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <div class="barberFade">
        <img src="../../assets/Barber.svg" class="barberFade">
      </div>
      <div class="images">
        <img src="../../assets/Calender Icon.svg">
        <img src="../../assets/thumbs.svg">
        <img src="../../assets/sizIcon.svg">
        <img src="../../assets/disIcon.svg">
      </div>
    </div>
  </div>
</template>

<style>

.images{

  position: absolute;
  top: auto;
  bottom: auto;
}

.carousel-content {
  position: absolute;
  bottom: -700px;
  left: 0px;
  right: 0px;
  color: #fff;
  padding: 20px;
  text-align: absolute;
  z-index: 1;
}

.barberFade {
  width: auto;
  height: 300px;
  position: absolute;
  bottom: -70px;
  left: 600px;
  right: 0;
  padding: 20px;
}

.h1-text h1 {
  position: absolute;
  bottom: 70px;
  left: 296px;
  right: 0;
  color: #000000;
  padding: 20px;
  z-index: 2;
}

.p1-text {
  position: absolute;
  bottom: 0;
  left: 318px;
  right: 0;
  color: #000000;
  padding: 0;
  z-index: 2;
  max-height: 200px;
  overflow-y: auto;
}

.sentence {
  display: block;
  margin-bottom: 0px;
  position: middle;
}
.sentence1 {
  display: block;
  margin-bottom: 0px;
  position: relative;
  top: 0;
  bottom: auto;
}
</style>

<script>

</script>
