<template>
    <div class="service-card" @click="selectService" :class="{ 'selected-service': isSelected }">
        <img :src="getImageUrl(service.image)" alt="Service Image" />
        <div class="NamePrice">
            <h2 class="name">{{ service.name }}</h2>
            <p class="price">${{ service.price }}</p>
        </div>
        <p class="duration"> {{ service.duration }} min</p>
        <button @click.stop="selectService" class="booking" :disabled="isSelected">
            {{ isSelected ? "Deselect" : "Select" }}
        </button>

    </div>
</template>
<script>
export default {
  props: {
    service: {
      type: Object,
      required: true
    },
    selected: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isSelected() {
      return this.selected
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
    },
    selectService() {
      this.$emit('select-service', this.service)
    }
  }
}
</script>
<style lang="scss" scoped>
.service-card {
    display: flex;
    flex-direction: column;
    background-color: rgb(255, 255, 255);
    max-width: auto;
    width: 100%;
    height: auto; // Default to 450px
    box-shadow: 0px 4px 50px 0px rgba(0, 0, 0, 0.07);
    backdrop-filter: blur(10px); // Adjust the blur intensity as needed

    @media (max-width: 768px) {
        height: 160px; // Change height to 160px for smaller screens
    }

    img {
        max-width: fill;
        max-height: 200px;
    }

    .name {
        font-size: 1.0rem;
        font-weight: 650;
    }

    .NamePrice {
        margin-top: 5%;
        margin-left: 8%;
        margin-right: 8%;
        display: flex;
        align-items: baseline;
        justify-content: space-between;
    }

    .price {
        font-size: 0.9rem; // Note: I changed this from vw to rem for consistency
        letter-spacing: 0em;
        font-weight: 650;
    }

    .duration {
        background-color: rgba(255, 235, 212, 1);
        color: rgba(231, 163, 86, 1);
        border-radius: 26px;
        padding: 1px 5px 2px 5px;
    }

    .booking {
        height: 50px;
        width: 180px;
        max-width: 180px;
        max-height: 50px;
        border-radius: 8px;
        background: rgba(231, 163, 86, 1);
        color: rgba(255, 255, 255, 1);
        border-color: rgba(231, 163, 86, 1);

        &:disabled {
            background: rgba(200, 200, 200, 1); // A faded grey color
            cursor: not-allowed;
        }
    }
}
</style>
