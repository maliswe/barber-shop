<!--
This component displays a list of barbers with their details in a table format. Users can
add, edit, or delete barber records. It utilizes two subcomponents, 'addBarberForm' and
'updateBarberForm', for adding and updating barber information.
-->
<template>
    <div>
      <div class="container" v-if="barbers.length === 0" >
        <h1>No barbers added yet.</h1>
        <button class="add-button" @click="showAddBarberForm">
          <i class="fas fa-plus"></i> Add Barber
        </button>
      </div>
      <div class="container" v-if="barbers.length > 0">
        <h1>Barber accounts</h1>
        <div class="table-controls">
        <div class="search-bar">
          <input type="text" v-model="searchTerm" placeholder="Search by phone" />
          <button @click="searchBarber()">
            <i class="fas fa-search"></i>
          </button>
        </div>
        <button class="delete-all-button" @click="deleteAllBarbers">
          <i class="fas fa-trash-alt"></i>  Delete All
        </button>
        <div class="message" v-if="message">{{ message }}</div>
      </div>
        <table class="barber-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
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
        <addBarberForm ref="addBarberForm" :showModel="showAddBarberFormModal" @barber-added="onBarberUpdated" @close-modal="closeAddBarberForm" />
      </div>
      <div>
      <b-col lg="4" class="pb-2">
        <router-link :to="{ name: 'AdminDashboard' }">
          <b-button variant="warning" size="lg">Admin Accounts ></b-button>
        </router-link>
      </b-col>
      <b-col lg="4" class="pb-2">
        <router-link :to="{ name: 'CustomerController' }">
          <b-button variant="warning" size="lg">Customer Accounts ></b-button>
        </router-link>
      </b-col>
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
      currentBarber: null,
      searchTerm: '',
      message: ''
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
    },
    async deleteAllBarbers() {
      const confirmation = window.confirm('Do you really want to delete all Barbers?')
      if (confirmation) {
        await barber.deleteAllBarber()
        console.log('Deleted all barbers')
        this.barbers = []
      }
    },
    showMessage(message) {
      this.message = message
      setTimeout(() => {
        this.message = ''
      }, 1000)
    },
    async searchBarber() {
      if (!this.searchTerm) {
        await this.getAllBarbers()
        return
      }
      try {
        const response = await barber.getBarber(this.searchTerm)
        this.barbers = [response.data]
      } catch (error) {
        this.showMessage('Barber not found')
      }
    }
  }
}
</script>

<style scoped>
.container{
  padding-bottom: 20%;
}
.message {
  color: red;
  margin-top: 3%;
  margin-bottom: 3%;
}
.table-controls {
  margin-bottom: -5%;
}

.search-bar {
  display: inline-block;
}

.search-bar input {
  margin-right: 5px;
}
.search-bar button {
  color: #3498db;
  background: none;
  border: none;
  cursor: pointer;
}
.delete-all-button {
  vertical-align:top;
  display: inline-block;
  background-color: #e74c3c;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  margin-left: 20px;
}

.delete-all-button:hover {
  background-color: #c0392b;
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
  .search-bar input {
    font-size: 14px;
  }

  .search-bar button {
    font-size: 14px;
  }

  .delete-all-button {
    font-size: 0.8rem;
    padding: 0.2rem 0.4rem;
  }
  .table-controls {
    margin-bottom: -15%;
  }
  .message {
    font-size: 0.8rem;
    margin-top: 1%;
    margin-bottom: -1%;
  }
}

</style>
