<template>
    <div>
        <h1>This is the services we provide</h1>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      responseData: {}
    }
  },
  methods: {
    fetchData() {
      axios.get('http://localhost:3000/api/v1/services')
        .then(response => {
          this.responseData = response.data
        })
        .catch(error => {
          console.error('Error fetching data:', error)
        })
    }
  },
  mounted() {
    this.fetchData()
  }
}

</script>

<style>
</style>
