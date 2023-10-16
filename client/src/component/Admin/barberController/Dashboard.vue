<!--
This component displays a list of barbers with their details in a table format. Users can
add, edit, or delete barber records. It utilizes two subcomponents, 'addBarberForm' and
'updateBarberForm', for adding and updating barber information.
-->
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
              <button class="edit-button" @click="editBarber(barber)"><i class="fas fa-edit"></i></button>
              <button class="delete-button" @click="deleteBarber((barber.phone))"><i class="fas fa-trash-alt"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="form-overlay" v-if="showUpdateBarberFormModal">
        <updateBarberForm ref="updateBarberForm" :showEdit="showUpdateBarberFormModal" :currentService="currentBarber" @barber-updated="onBarberUpdated" @close-modal="closeUpdateBarberForm" />
      </div>
      <div class="form-overlay" v-if="showAddBarberFormModal">
        <addBarberForm ref="addBarberForm" :showModel="showAddBarberFormModal" @barber-updated="onBarberUpdated" @close-modal="closeAddBarberForm" />
      </div>
      <div class="container" v-else>
      <h1>No barbers added yet.</h1>
      <button class="add-button" @click="showAddBarberForm">
        <i class="fas fa-plus"></i> Add Barber
      </button>
    </div>
    </div>
  </template>

<script>
import { barber } from '@/api/barberApi'
import addBarberForm from './addBarberForm.vue'
import updateBarberForm from './updateBarberForm.vue'

export default {
  data() {
    return {
      barbers: [],
      showAddBarberFormModal: false,
      showUpdateBarberFormModal: false,
      currentBarber: null
    }
  },
  created() {
    this.getAllBarbers()
  },
  components: {
    addBarberForm,
    updateBarberForm
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
    editBarber(barber) {
      this.showUpdateBarberFormModal = true
      this.currentBarber = barber
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

    closeAddBarberForm() {
      this.showAddBarberFormModal = false
    },
    showUpdateBarberForm() {
      this.showUpdateBarberFormModal = true
    },

    closeUpdateBarberForm() {
      this.showUpdateBarberFormModal = false
    },
    onBarberUpdated() {
      this.getAllBarbers()
    }
  }
}
</script>

<style scoped>
.container{
  padding-bottom: 20%;
}
.form-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
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
  background-color: #3498db;
  border: none;
  color: white;
  border-radius: 5px;
}
@media (max-width: 767px) {
  .barber-table {
    width: 90%;
    overflow-x: none; /* Enable horizontal scrolling on small screens */
  }

  .barber-table th, .barber-table td {
    padding: 0.3rem; /* Adjust padding for smaller screens */
    font-size: 0.6rem; /* Adjust font size for smaller screens */
  }

  .edit-button i, .delete-button i {
    font-size: 0.6rem; /* Adjust icon size for smaller screens */
  }
}

</style>
