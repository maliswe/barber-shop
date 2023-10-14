<template>
  <div class="container">
    <headerPhoto class="headerPhoto" />
    <button v-if="isLoggedIn && (role === 'Admin')" class="btn btn-primary" @click="openEditModal">Edit Text</button>
    <textSection class="textSection" :text="textContent" />
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
            <textarea v-model="editedText" class="form-control" rows="10"></textarea>
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
  data() {
    return {
      textContent: 'Text shouLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis Quis ipsum suspendisse ultrices gravida Risus commodo viverra send do eiusmod maecenas accumsan lacus vel facilisis. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrice QuIt is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrice Quis ipsum suspendisse ultrices gravida Risus commodo viverra send do eiusmod maecenas accumsan lacus vel facilisis.is ipsum suspendisse ultrices gravida Risus commodo viverra send do eiusmod maecenas accumsan lacus vel facilisis. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrice QuIt is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrice Quis ipsum suspendisse ultrices gravida Risus commodo viverra send do eiusmod maecenas accumsan lacus vel facilisis.is ipsum suspendisse ultrices gravida Risus commodo viverra send do eiusmod maecenas accumsan lacus vel facilisis. ld be here',
      editedText: ''
    }
  },
  methods: {
    openEditModal() {
      this.editedText = this.textContent
      $('#editModal').modal('show')
    },
    saveEditedText() {
      this.textContent = this.editedText
      $('#editModal').modal('hide')
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
