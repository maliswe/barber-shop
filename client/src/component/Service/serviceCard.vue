<template>
  <div class="service-card">
    <img :src="getImageUrl(service.image)" alt="Service Image" />
    <div class="NamePrice">
      <h2 class="name">{{ service.name }}</h2>
      <p class="price">${{ service.price }}</p>
    </div>
    <p class="description">{{ service.description }}</p>
    <div class="durationBook">
      <p class="duration"> {{ service.duration }} min</p>
      <button class="booking">Book</button>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    service: {
      type: Object,
      required: true
    }
  },

  methods: {
    getImageUrl(imageBufferObject) {
      if (!imageBufferObject || !imageBufferObject.data || !Array.isArray(imageBufferObject.data)) {
        return null
      }

      const blob = new Blob([new Uint8Array(imageBufferObject.data)], { type: imageBufferObject.type })
      const dataUrl = URL.createObjectURL(blob)
      return dataUrl
    }
  }
}
</script>

<style scoped>
.service-card {
    display: flex;
    flex-direction: column;
    background-color:rgb(255, 255, 255);
    max-width: 300px;
    width: 100%;
    height: min(10rem, 450px);
    height: 100%;
    box-shadow: 0px 4px 50px 0px rgba(0, 0, 0, 0.07);
}

.service-card img {
  max-width: fill;
  max-height: 200px;
}

.name{
  font-size: max(1.0rem, 17px);
  font-weight: 650;
}

.NamePrice{
    margin-top: 5%;
    margin-left: 8%;
    margin-right: 8%;
    display: flex;
    align-items: baseline;
    justify-content: space-between;
}

.price{
    color: rgba(231, 163, 86, 1);
    font-size: max(0.9vw, 12px);
    letter-spacing: 0em;
    font-weight: 650;
}

.description{
    display: flex;
    justify-content: center;
    color: rgba(136, 135, 143, 1);
    font-weight: 400;
    font-size: max(0.8vw, 13px);
    padding-bottom: 5%;
    padding-left: 5%;
    padding-right: 5%;
}

.durationBook{
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-left: 4%;
    margin-right: 4%;
    margin-bottom: 50px;
}

.duration{
    background-color: rgba(255, 235, 212, 1);
    color: rgba(231, 163, 86, 1);
    border-radius: 26px;
    padding-left: 5px;
    padding-right: 5px;
    padding-top: 1px;
    padding-bottom: 2px;
}

.booking{
    height: 50px;
    width: 180px;
    max-width: 180px;
    max-height: 50px;
    border-radius: 8px;
    background: rgba(231, 163, 86, 1);
    color: rgba(255, 255, 255, 1);
    border-color: rgba(231, 163, 86, 1);
}

@media (max-width: 768px) {
  .service-card {
    width: min(100%, 8rem);
    height: min(70%, 10rem);
  }
  .service-card img {
    width: fill;
    height: fill;
  }
  .book{
    max-width: 3rem;
    max-height: 2rem;
  }
  .description {
    font-size: min(7vw, 13);
    line-height: min(5vw, 17);
  }
}
</style>
