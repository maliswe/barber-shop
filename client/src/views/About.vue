<template>
  <div class="container">
    <headerPhoto class="headerPhoto" />
    <button v-if="isLoggedIn && (role === 'Admin')" class="btn btn-primary" @click="openEditModal">Edit Text</button>
    <textSection :text="textContent" />
    <whoAreWe class="whoAreWe" />

    <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="editModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editModalLabel">Edit Text</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <textarea v-model="textContent" class="form-control" rows="10" ></textarea>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button @click="saveEditedText" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headerPhoto from '../component/About/headerPhoto.vue'
import textSection from '../component/About/textSection.vue'
import whoAreWe from '../component/About/whoAreWe.vue'
import { mapState } from 'vuex'
import { about } from '@/api/aboutApi'

export default {
  name: 'About',
  components: {
    headerPhoto,
    textSection,
    whoAreWe
  },
  computed: {
    ...mapState(['isLoggedIn', 'role'])
  },
  created() {
    this.getAboutUs()
  },
  data() {
    return {
      textContent: '',
      editedText: ''
    }
  },
  methods: {
    openEditModal() {
      this.editedText = this.textContent
      $('#editModal').modal('show')
    },
    async saveEditedText() {
      const newText = {
        text: this.textContent
      }
      await about.updateAbout(newText)
      this.getAboutUs()
      $('#editModal').modal('hide')
    },
    async getAboutUs() {
      const textObject = await about.getAbout()
      this.textContent = textObject.data.text
    }
  }
}
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 75px;
  padding-bottom: 80px;
}

.textSection {
  width: auto;
}
</style>

*This component is responsible for displaying and, if the user has 'Admin' role, editing text content.
