<!--
* This component fetches a list of services and allows users to select multiple services.
* Selected services are displayed in a list, and the component calculates the total price and duration of the selected services.
* Users can proceed to the booking page with the selected services and details.
-->
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
  computed: {
    totalPrice() {
      return this.selectedServices.reduce((total, serviceId) => {
        const service = this.services.find(s => s._id === serviceId)
        return total + (service ? service.price : 0)
      }, 0)
    },
    totalDuration() {
      return this.selectedServices.reduce((total, serviceId) => {
        const service = this.services.find(s => s._id === serviceId)
        return total + (service ? service.duration : 0)
      }, 0)
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
      this.$router.push({
        name: 'Booking',
        query: {
          selectedServices: JSON.stringify(this.selectedServices),
          totalPrice: this.totalPrice,
          totalDuration: this.totalDuration
        }
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
      const foundService = this.services.find(service => service._id === serviceId)
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
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;

    @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 450px) {
        grid-template-columns: repeat(1, 1fr);
    }
    div {
        padding: 10px;
        border: 1px solid #ccc;
        cursor: pointer;
        transition: background-color 0.3s;

        &.selected {
            background-color: #e0e0e0;
        }
    }
}

.selected-services-section {
    padding: 20px 0;

    h4 {
        margin-bottom: 10px;
    }

    ol {
        list-style-type: none;
        padding: 0;
        margin: 0;

        li {
            padding: 10px 0;
            position: relative;

            .deselect-icon {
                margin-left: 10px;
                cursor: pointer;
                transition: color 0.3s;
                &:hover {
                    color: red;
                }
            }
        }
    }
}

button {
    width: 100%;
    max-width: 180px;
    height: 50px;
    margin-top: 20px;
    border-radius: 8px;
    background: rgba(231, 163, 86, 1);
    color: rgba(255, 255, 255, 1);
    border-color: rgba(231, 163, 86, 1);

    @media (max-width: 480px) {
        width: 100%;
    }
}
</style>
