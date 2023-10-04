<template>
    <div>
      <div class="container" v-if="barbers.length > 0">
        <h1>Barber accounts</h1>
        <table class="barber-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Expertise</th>
              <th>Services</th>
            <th>
                <button class="add-button" @click="showAddBarberForm">
                  <i class="fas fa-plus"></i>
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(barber, index) in barbers" :key="barber._id" :class="index % 2 === 0 ? 'gray-row' : 'white-row'">
              <td>{{ barber.name }}</td>
              <td>{{ barber.email }}</td>
              <td>{{ barber.phone }}</td>
              <td>{{ barber.experties }}</td>
              <td>{{ barber.service }}</td>
              <td>
              <button class="edit-button" ><i class="fas fa-edit"></i></button>
              <button class="delete-button" @click="deleteBarber((barber.phone))"><i class="fas fa-trash-alt"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="add-barber-form-overlay" v-if="showAddBarberFormModal">
        <addBarberForm ref="addBarberForm" :showModel="showAddBarberFormModal" @barber-added="getAllBarbers" @close-modal="closeAddBarberFormModal" />
      </div>
    </div>
  </template>

<script>
import { barber } from '@/api/barberApi'
import addBarberForm from '../component/Dashboard/addBarberForm.vue'

export default {
  data() {
    return {
      barbers: [],
      showAddBarberFormModal: false
    }
  },
  created() {
    this.getAllBarbers()
  },
  components: {
    addBarberForm
  },
  methods: {
    getAllBarbers() {
      barber.getAllbarbers()
        .then(response => {
          this.barbers = response.data
        })
        .catch(error => {
          console.error('Error getting barbers:', error)
        })
    },
    async deleteBarber(userPhone) {
      console.log('Delete')
      const confirmation = window.confirm('Do you really want to delete?')
      if (confirmation) {
        barber.deleteBarber(userPhone)
          .then(() => {
            this.barbers = this.barbers.filter(barbers => barbers.phone !== userPhone)
            this.getAllBarbers()
            console.log('Deleted a barber')
          })
          .catch(error => {
            console.error('Error deleting barber:', error)
          })
      }
    },
    showAddBarberForm() {
      this.showAddBarberFormModal = true
    },

    closeAddBarberFormModal() {
      this.showAddBarberFormModal = false
    }

  }
}
</script>

<style scoped>
.add-barber-form-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Adjust the overlay background color and opacity */
  z-index: 1000; /* Ensure the overlay is on top of other elements */
  display: flex;
  justify-content: center;
  align-items: center;
}
.barber-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 50px;
}

.barber-table th, .barber-table td {
  padding: 10px;
  border: 1px solid #ccc;
}

.gray-row {
  background-color: #f0f0f0;
}

.white-row {
  background-color: #ffffff;
}

.edit-button,
.delete-button {
  border: none;
  background: none;
  cursor: pointer;
}

.edit-button i,
.delete-button i {
  font-size: 15px;
}

.delete-button {
  color: red;
}

.add-button {
  width: fill;
  height: fill;
  background-color: #3498db; /* Adjust the button background color */
  border: none;
  color: white;
  border-radius: 5px;
}

</style>
