<template>
  <div class="carousel-content">
    <div class="h1-text">
      <h1>Our Best Features</h1>
    </div>
    <div class="p1-text">
      <p>
        <span class="sentence"
          >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.</span
        >
        <span class="sentence"
          >Quis ipsum suspendisse ultrices gravida.Risus commodo viverra
          maecenas accumsan lacus vel facilisis</span
        >
        <span class="sentence1"
          >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.</span
        >
      </p>
    </div>
    <div class="p2-text">
      <p></p>
      <div class="barberFade">
        <img src="../../assets/Barber.svg" class="barberFade" />
      </div>
      <img src="../../assets/Calender Icon.svg" class="calendar-icon" />
      <img src="../../assets/thumbs.svg" class="thumbs-icon" />
      <img src="../../assets/sizIcon.svg" class="size-icon" />
      <img src="../../assets/disIcon.svg" class="discount-icon" />
    </div>
    <p class="feature1">Good Discount</p>
    <p class="feature2">Easy way to appointment</p>
    <p class="feature3">Best team</p>
    <p class="feature4">300+ Happy Customers</p>
  </div>
</template>

<style>
.carousel-content {
  position: absolute;
  bottom: -700px;
  left: 30px;
  right: 0px;
  color: #fff;
  padding: 20px;
  text-align: absolute;
  z-index: 2;
}

.barberFade {
  width: auto;
  height: 300px;
  position: absolute;
  bottom: -70px;
  left: 645px;
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
  bottom: 10%;
  left: 318px;
  right: 0;
  color: #000000;
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

.calendar-icon {
  width: 30px;
  position: absolute;
  bottom: -50px;
  left: 350px;
}

.thumbs-icon {
  width: 30px;
  position: absolute;
  bottom: -100px;
  left: 350px;
}

.size-icon {
  width: 30px;
  position: absolute;
  bottom: -50px;
  left: 700px;
}

.discount-icon {
  width: 30px;
  position: absolute;
  bottom: -100px;
  left: 700px;
}

.feature1 {
  position: absolute;
  right: 5px;
  left: 400px;
  bottom: -115px;
  color: #000000;
  white-space: nowrap;
}

.feature2 {
  position: absolute;
  right: 5px;
  left: 400px;
  bottom: -60px;
  color: #000000;
  white-space: nowrap;
}

.feature3 {
  position: absolute;
  right: 5px;
  left: 750px;
  bottom: -112px;
  color: #000000;
  white-space: nowrap;
}

.feature4 {
  position: absolute;
  right: 5px;
  left: 750px;
  bottom: -62px;
  color: #000000;
  white-space: nowrap;
}
</style>

<script>
</script>
