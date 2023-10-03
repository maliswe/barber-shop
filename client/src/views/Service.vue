<template>
  <div :class="{ 'container': true, 'blur-background': showModel }">
    <headerPhoto />
    <div class="serviceCard">
      <serviceCard
      v-for="service in services" :key="service._id" :service="service"
      @service-deleted="handleServiceDeleted"
      />
      <div class="holder">
        <button class="rectangle-button" @click="showFormModel">
          <i class="fas fa-plus"></i>
        </button>
      </div>
    </div>
    <serviceForm :showModel="showModel" @close-modal="closeModal" @fetch-services="fetchServices"/>
  </div>
</template>

<script>
import { services } from '@/api/serviceApi'
import serviceCard from '../component/Service/serviceCard.vue'
import headerPhoto from '../component/Service/headerPhoto.vue'
import serviceForm from '../component/Service/serviceForm.vue'

export default {
  name: 'Service',
  components: {
    serviceCard,
    headerPhoto,
    serviceForm
  },
  data() {
    return {
      services: [],
      showModel: false
    }
  },

  async created() {
    await this.fetchServices()
  },

  methods: {
    async handleServiceDeleted(serviceId) {
      this.services = this.services.filter(service => service._id !== serviceId)
    },
    async fetchServices() {
      try {
        const response = await services.getAllServices()
        this.services = response.data
        console.log('Fetched services:', this.services)
      } catch (error) {
        console.error('Error fetching services:', error)
      }
    },
    showFormModel() {
      this.showModel = true
    },
    closeModal() {
      this.showModel = false
    }
  }
}
</script>

<style>

.container.blur-background .serviceCard{
  filter: blur(10px);
}

.serviceCard{
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  flex-flow: wrap;
  gap: 50px;
}

.container{
  padding-top: 170px;
  padding-bottom: 60px;
  display: flex;
  flex-direction: column;
}

.rectangle-button {
  width: 100px;
  height: 80px;
  background-color: #3498db; /* Adjust the button background color */
  border: none;
  color: white;
  border-radius: 5px;
}

.holder {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 300px;
  width: max(7rem, 350px);
  height: max(9rem, 350px);
  box-shadow: 0px 4px 50px 0px rgba(0, 0, 0, 0.07);
  backdrop-filter: blur(10px); /* Adjust the blur intensity as needed */
}

</style>
