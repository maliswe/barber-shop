<template>
  <div>
    <b-button variant="outline-primary" class="custom-button"
      >See All Services</b-button
    >
  </div>
</template>

<script>
export default {
  name: 'ServicesButton'
}
</script>

<style>
.custom-button {
  box-sizing: border-box;
  position: absolute;
  width: 267.14px;
  height: 84.36px;
  left: 100px;
  top: 700px;
  border: 2.81195px solid #e7a356;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 0px 0px 7.02988px 7.02988px;
  color: #e7a356;
  background-color: transparent;
  font-family: 'Fira Sans', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 25.3076px;
  line-height: 30px;
  text-transform: capitalize;
}

.custom-button:hover {
  background-color: #e7a356;
  color: #fff;
}
</style>
