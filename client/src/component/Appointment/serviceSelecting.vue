<template>
    <div>

        <div v-if="isLoading">Loading...</div>

        <div v-if="error">{{ error }}</div>

        <div class="services-grid">
            <ServiceCard v-for="service in services" :key="service._id" :service="service"
                :selected="selectedServices.includes(service._id)" @select-service="toggleService" @fetch-services="fetchServices"/>
        </div>

        <div v-if="selectedServices.length > 0" class="selected-services-section">
            <h4>Selected Services:</h4>
            <ol>
                <li v-for="selectedId in selectedServices" :key="selectedId">
                {{ getServiceNameById(selectedId) }}
                    <span class="deselect-icon" @click="deselectService(selectedId)">x</span>
                </li>
        </ol>
        </div>
        <!-- You can add a button or other components to proceed to the next step after selecting the services -->
        <button v-if="selectedServices.length > 0" @click="proceed">Proceed</button>
    </div>
</template>
<script>
import ServiceCard from './ServiceCard.vue'
import { services } from '../../api/serviceApi'

export default {
  components: {
    ServiceCard
  },
  data() {
    return {
      services: [],
      selectedServices: [],
      isLoading: false,
      error: null
    }
  },
  mounted() {
    this.fetchServices()
  },
  methods: {
    toggleService(service) {
      if (this.selectedServices.includes(service._id)) {
        this.selectedServices = this.selectedServices.filter(id => id !== service._id)
      } else {
        this.selectedServices.push(service._id)
      }
    },
    proceed() {
      // Navigate to the next page with the selected services.
      // Depending on your router setup and where you want to navigate,
      // this can be something like:
      this.$router.push({
        name: 'Booking',
        query: { selectedServices: JSON.stringify(this.selectedServices) }
      })
    },
    async fetchServices() {
      try {
        const response = await services.getAllServices()
        this.services = response.data
        console.log('Fetched services:', this.services)
      } catch (error) {
        console.error('Error fetching services:', error)
        this.error = 'Unable to load the services, please try later'
      } finally {
        this.isLoading = false
      }
    },
    getServiceNameById(serviceId) {
      const foundService = this.services.find(service => service._id === serviceId) // change from service.id to service._id
      return foundService ? foundService.name : ''
    },
    deselectService(serviceId) {
      this.selectedServices = this.selectedServices.filter(id => id !== serviceId)
    }
  }
}
</script>
<style lang="scss" scoped>
.services-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr); // This ensures 3 columns
    gap: 20px;

    div {
        padding: 10px;
        border: 1px solid #ccc;
        cursor: pointer;
        transition: background-color 0.3s;

        &.selected {
            background-color: #e0e0e0; // Change this color as desired
        }
    }
}

.selected-services-section {
    padding: 20px 0;

    h4 {
        margin-bottom: 10px;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }
}

button {
    height: 50px;
    width: 180px;
    max-width: 180px;
    max-height: 50px;
    border-radius: 8px;
    background: rgba(231, 163, 86, 1);
    color: rgba(255, 255, 255, 1);
    border-color: rgba(231, 163, 86, 1);
}
</style>
