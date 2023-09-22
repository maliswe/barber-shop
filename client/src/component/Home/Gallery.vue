<template>
  <div class="gallery-container">
    <div class="gallery-title">
      <div class="title-text">
        <h1>Salon Gallery</h1>
      </div>
    </div>
    <div class="image-container">
      <div class="image-row">
        <div class="image">
          <img src="../../assets/1.png" alt="1" />
        </div>
        <div class="image">
          <img src="../../assets/2.png" alt="2" />
        </div>
        <div class="image">
          <img src="../../assets/3.png" alt="3" />
        </div>
      </div>
      <div class="image-row">
        <div class="image">
          <img src="../../assets/4.png" alt="4" />
        </div>
        <div class="image">
          <img src="../../assets/5.png" alt="5" />
        </div>
        <div class="image">
          <img src="../../assets/6.png" alt="6" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gallery-container {
  position: absolute;
  width: 1140px;
  height: 591px;
  left: 229px;
  top: 2057px;
}

.gallery-title {
  position: absolute;
  width: 208px;
  height: 61px;
  left: 466px;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.title-text {
  position: absolute;
  bottom: -250px;
  left: 110px;
  right: 0;
  color: #000000;
  padding: 20px;
  z-index: 2;
  white-space: nowrap;
}

.image-container {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  position: absolute;
  top: 300px;
  left: 350px;
  right: 100px;
}

.image-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.image {
  position: relative;
  width: 700px;
  height: auto;
  border-radius: 4px;
  margin-right: 20px;
}
.image:last-child {
  margin-right: 0;
}
.image img {
  width: 100%;
  height: auto;
  object-fit: cover;
  margin-right: 20px;
}
.image:last-child img {
  margin-right: 0;
}
</style>
