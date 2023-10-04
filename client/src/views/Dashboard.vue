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
                <button class="add-button" @click="showFormModel">
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
              <button @click="showEditModal(barber)" class="edit-button"><i class="fas fa-edit"></i></button>
              <button @click="deleteBarber(barber._id)" class="delete-button"><i class="fas fa-trash-alt"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <p>No barbers available.</p>
      </div>
    </div>
  </template>

<script>
import { barber } from '@/api/barberApi'

export default {
  data() {
    return {
      barbers: [],
      editedBarber: null
    }
  },
  created() {
    this.getAllBarbers()
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
    deleteBarber(userId) {
      barber.deleteBarber(userId)
        .then(() => {
          this.getAllBarbers()
        })
        .catch(error => {
          console.error('Error deleting barber:', error)
        })
    },
    showEditModal(barber) {
      this.editedBarber = barber
    }
  }
}
</script>

<style scoped>
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
