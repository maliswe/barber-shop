<template>
  <div class="container">
    <headerPhoto />
    <div class="serviceCard">
      <serviceCard v-for="service in services" :key="service._id" :service="service" />
    </div>
  </div>

</template>

<script>
import { services } from '@/api/serviceApi'
import serviceCard from '../component/Service/serviceCard.vue'
import headerPhoto from '../component/Service/headerPhoto.vue'

export default {
  name: 'About',
  components: {
    serviceCard,
    headerPhoto
  },
  data() {
    return {
      services: []
    }
  },

  async created() {
    await this.fetchServices()
  },

  methods: {
    async fetchServices() {
      try {
        const response = await services.getAllServices()
        this.services = response.data
        console.log('Fetched services:', this.services)
      } catch (error) {
        console.error('Error fetching services:', error)
      }
    }
  }
}
</script>

<style>

.serviceCard{
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  flex-flow: wrap;
  gap: 50px;
}

.container{
  padding-top: 70px;
  display: flex;
  flex-direction: column;
}

</style>
