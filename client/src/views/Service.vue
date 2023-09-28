<template>
  <div>
    <div v-if="services.length === 0">Loading services...</div>

    <div v-else>
      <serviceCard v-for="service in services" :key="service._id" :service="service" />
    </div>
  </div>
</template>

<script>
import { services } from '@/api/serviceApi'
import serviceCard from '../component/Service/serviceCard.vue'

export default {
  name: 'About',
  components: {
    serviceCard
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
