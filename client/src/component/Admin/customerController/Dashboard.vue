<!--
* This component displays a list of customer accounts with their details in a table format. Users
* can add, edit, or delete customer records. It utilizes two subcomponents, 'addCustomerForm' and
* 'updateCustomerForm', for adding and updating customer information.
-->
<template>
    <div>
      <div class="container" v-if="customers.length > 0">
        <h1>Customers accounts</h1>
        <div class="table-controls">
        <div class="search-bar">
          <input type="text" v-model="searchTerm" placeholder="Search by phone" />
          <button @click="searchCustomer()">
            <i class="fas fa-search"></i>
          </button>
        </div>
        <button class="delete-all-button" @click="deleteAllCustomer">
          <i class="fas fa-trash-alt"></i>  Delete All
        </button>
        <div class="message" v-if="message">{{ message }}</div>
      </div>
        <table class="customer-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
            <th>
                <button class="add-button" @click="showAddCustomerForm">
                  <i class="fas fa-plus"></i>
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(customer, index) in customers" :key="customer._id" :class="index % 2 === 0 ? 'gray-row' : 'white-row'">
              <td>{{ customer.name }}</td>
              <td>{{ customer.email }}</td>
              <td>{{ customer.phone }}</td>
              <td>
              <button class="edit-button" @click="editCustomer(customer)"><i class="fas fa-edit"></i></button>
              <button class="delete-button" @click="deleteCustomer((customer.phone))"><i class="fas fa-trash-alt"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="container" v-else>
      <h1>No customers added yet.</h1>
      <button class="add-button" @click="showAddCustomerForm">
        <i class="fas fa-plus"></i> Add Barber
      </button>
      </div>
      <div class="form-overlay" v-if="showUpdateCustomerFormModal">
        <updateCustomerForm ref="updateCustomerForm" :showEdit="showUpdateCustomerFormModal" :currentCustomer="currentCustomer" @customer-updated="onCustomerUpdated" @close-modal="closeUpdateCustomerForm" />
      </div>
      <div class="form-overlay" v-if="showAddCustomerFormModal">
        <addCustomerForm ref="addCustomerForm" :showModel="showAddCustomerFormModal" @customer-added="onCustomerUpdated" @close-modal="closeAddCustomerForm" />
      </div>
      <div>
      <b-col lg="4" class="pb-2">
        <router-link :to="{ name: 'AdminDashboard' }">
          <b-button variant="warning" size="lg">Admin Accounts ></b-button>
        </router-link>
      </b-col>
      <b-col lg="4" class="pb-2">
        <router-link :to="{ name: 'BarberController' }">
          <b-button variant="warning" size="lg">Barber Accounts ></b-button>
        </router-link>
      </b-col>
    </div>
    </div>
  </template>

<script>
import { customer } from '@/api/customerApi'
import addCustomerForm from './addCustomerForm.vue'
import updateCustomerForm from './updateCustomerForm.vue'

export default {
  data() {
    return {
      customers: [],
      showAddCustomerFormModal: false,
      showUpdateCustomerFormModal: false,
      currentCustomer: null,
      searchTerm: '',
      message: ''
    }
  },
  created() {
    this.getAllCustomers()
  },
  components: {
    addCustomerForm,
    updateCustomerForm
  },
  methods: {
    getAllCustomers() {
      customer.getAllCustomer()
        .then(response => {
          this.customers = response.data
        })
        .catch(error => {
          console.error('Error getting customers:', error)
        })
    },
    editCustomer(customer) {
      this.showUpdateCustomerFormModal = true
      this.currentCustomer = customer
    },
    async deleteCustomer(userPhone) {
      console.log('Delete')
      const confirmation = window.confirm('Do you really want to delete?')
      if (confirmation) {
        customer.deleteCustomer(userPhone)
          .then(() => {
            this.customer = this.customers.filter(customers => customers.phone !== userPhone)
            this.getAllCustomers()
            console.log('Deleted an Customer')
          })
          .catch(error => {
            console.error('Error deleting an customer:', error)
          })
      }
    },
    showAddCustomerForm() {
      this.showAddCustomerFormModal = true
    },

    closeAddCustomerForm() {
      this.showAddCustomerFormModal = false
    },
    showUpdateCustomerForm() {
      this.showUpdateCustomerFormModal = true
    },

    closeUpdateCustomerForm() {
      this.showUpdateCustomerFormModal = false
    },
    onCustomerUpdated() {
      this.getAllCustomers()
    },
    async deleteAllCustomer() {
      const confirmation = window.confirm('Do you really want to delete all customers?')
      if (confirmation) {
        await customer.deleteAllCustomer()
        console.log('Deleted all customers')
        this.customers = []
      }
    },
    showMessage(message) {
      this.message = message
      setTimeout(() => {
        this.message = '' // Clear the message after 1 second
      }, 1000)
    },
    async searchCustomer() {
      if (!this.searchTerm) {
        await this.getAllCustomers()
        return
      }
      try {
        const response = await customer.getCustomer(this.searchTerm)
        this.customers = [response.data]
        console.log(this.customers)
      } catch (error) {
        this.showMessage('User not found')
      }
    }

  }
}
</script>

<style scoped>
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
.container{
  padding-bottom: 10%;
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
.customer-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 50px;
}

.customer-table th, .customer-table td {
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
  .customer-table {
    width: 90%;
    overflow-x: none; /* Enable horizontal scrolling on small screens */
  }

  .customer-table th, .customer-table td {
    padding: 0.3rem; /* Adjust padding for smaller screens */
    font-size: 0.6rem; /* Adjust font size for smaller screens */
  }

  .edit-button i, .delete-button i {
    font-size: 0.6rem; /* Adjust icon size for smaller screens */
  }
}

</style>
