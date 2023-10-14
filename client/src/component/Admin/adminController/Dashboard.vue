<!--
* This component displays a table of all admin accounts, with the ability to edit and delete accounts.
  It also has a button to open a modal for adding a new admin account.
* This component emits the following events:
* admin-updated: When an admin account is updated.
-->
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
              <button class="delete-button" @click="deleteAdmin((admin))"><i class="fas fa-trash-alt"></i></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="form-overlay" v-if="showUpdateAdminFormModal">
      <updateAdminForm ref="updateAdminForm" :showEdit="showUpdateAdminFormModal" :currentAdmin="currentAdmin"
        @admin-updated="onAdminUpdated" @close-modal="closeUpdateAdminForm" />
    </div>
    <div class="form-overlay" v-if="showAddAdminFormModal">
      <addAdminForm ref="addAdminForm" :showModel="showAddAdminFormModal" @admin-added="onAdminUpdated"
        @close-modal="closeAddAdminForm" />
    </div>
    <div class="container">
      <b-col lg="4" class="pb-2">
        <router-link :to="{ name: 'BarberController' }">
          <b-button variant="warning" size="lg">Barber Accounts</b-button>
        </router-link>
      </b-col>
      <b-col lg="4" class="pb-2">
        <router-link :to="{ name: 'CustomerController' }">
          <b-button variant="warning" size="lg">Customer Accounts</b-button>
        </router-link>
      </b-col>
    </div>

  </div>
</template>

<script>
import { admin } from '@/api/adminApi'
import addAdminForm from './addAdminForm.vue'
import updateAdminForm from './updateAdminForm.vue'
import axios from 'axios'
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
    async getAllAdmins() {
      try {
        const response = await admin.getAllAdmins()
        this.admins = response.data

        // Extract PUT and DELETE URLs from HATEOAS links
        this.admins.forEach(admin => {
          const putLink = admin.links.find(link => link.type === 'PUT')
          const deleteLink = admin.links.find(link => link.type === 'DELETE')
          if (putLink) {
            admin.putUrl = putLink.href
          }

          if (deleteLink) {
            admin.deleteUrl = deleteLink.href
          }
        })
      } catch (error) {
        console.error('Error getting admins:', error)
      }
    },
    editAdmin(admin) {
      this.showUpdateAdminFormModal = true
      this.currentAdmin = admin
    },
    async deleteAdmin(admin) {
      const confirmation = window.confirm('Do you really want to delete?')
      const baseurl = 'http://localhost:3000/'
      if (confirmation) {
        try {
          // Use the HATEOAS delete link
          await axios.delete(`${baseurl}${admin.links.find(link => link.type === 'DELETE').href}`)
          this.getAllAdmins()
          console.log('Deleted an Admin')
        } catch (error) {
          console.error('Error deleting an admin:', error)
        }
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

.admin-table th,
.admin-table td {
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
</style>
