<template>
    <div>
      <div class="container" v-if="admins.length > 0">
        <h1>Admin accounts</h1>
        <table class="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
            <th>
                <button class="add-button" @click="showAddAdminForm">
                  <i class="fas fa-plus"></i>
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(admin, index) in admins" :key="admin._id" :class="index % 2 === 0 ? 'gray-row' : 'white-row'">
              <td>{{ admin.name }}</td>
              <td>{{ admin.email }}</td>
              <td>{{ admin.phone }}</td>
              <td>
              <button class="edit-button" @click="editAdmin(admin)"><i class="fas fa-edit"></i></button>
              <button class="delete-button" @click="deleteAdmin((admin.phone))"><i class="fas fa-trash-alt"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="form-overlay" v-if="showUpdateAdminFormModal">
        <updateAdminForm ref="updateAdminForm" :showEdit="showUpdateAdminFormModal" :currentAdmin="currentAdmin" @admin-updated="onAdminUpdated" @close-modal="closeUpdateAdminForm" />
      </div>
      <div class="form-overlay" v-if="showAddAdminFormModal">
        <addAdminForm ref="addAdminForm" :showModel="showAddAdminFormModal" @admin-added="onAdminUpdated" @close-modal="closeAddAdminForm" />
      </div>
      <div>
        <b-col lg="4" class="pb-2"><b-button variant="warning" href="barber-controller" size="lg">Barber Accounts</b-button></b-col>
        <b-col lg="4" class="pb-2"><b-button variant="warning" href="customer-controller" size="lg">Customer Accounts</b-button></b-col>
      </div>

    </div>
  </template>

<script>
import { admin } from '@/api/adminApi'
import addAdminForm from './addAdminForm.vue'
import updateAdminForm from './updateAdminForm.vue'

export default {
  data() {
    return {
      admins: [],
      showAddAdminFormModal: false,
      showUpdateAdminFormModal: false,
      currentAdmin: null
    }
  },
  created() {
    this.getAllAdmins()
  },
  components: {
    addAdminForm,
    updateAdminForm
  },
  methods: {
    getAllAdmins() {
      admin.getAllAdmins()
        .then(response => {
          this.admins = response.data
        })
        .catch(error => {
          console.error('Error getting admins:', error)
        })
    },
    editAdmin(admin) {
      this.showUpdateAdminFormModal = true
      this.currentAdmin = admin
    },
    async deleteAdmin(userPhone) {
      console.log('Delete')
      const confirmation = window.confirm('Do you really want to delete?')
      if (confirmation) {
        admin.deleteAdmin(userPhone)
          .then(() => {
            this.admin = this.admins.filter(admins => admins.phone !== userPhone)
            this.getAllAdmins()
            console.log('Deleted an Admin')
          })
          .catch(error => {
            console.error('Error deleting an admin:', error)
          })
      }
    },
    showAddAdminForm() {
      this.showAddAdminFormModal = true
    },

    closeAddAdminForm() {
      this.showAddAdminFormModal = false
    },
    showUpdateAdminForm() {
      this.showUpdateAdminFormModal = true
    },

    closeUpdateAdminForm() {
      this.showUpdateAdminFormModal = false
    },
    onAdminUpdated() {
      this.getAllAdmins()
    }
  }
}
</script>

<style scoped>
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
.admin-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 50px;
}

.admin-table th, .admin-table td {
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