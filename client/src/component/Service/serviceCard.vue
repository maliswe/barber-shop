<template>
  <div class="service-card">
    <h2>{{ service.name }}</h2>
    <p>{{ service.description }}</p>
    <p>Price: ${{ service.price }}</p>
    <p>Duration: {{ service.duration }} minutes</p>
    <img :src="getImageUrl(service.image)" alt="Service Image" />
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
/* Add any necessary styling for your service card here */
.service-card {
    border: 1px solid #ccc;
    padding: 20px;
    margin: 10px;
}
</style>
