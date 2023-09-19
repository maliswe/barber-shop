<template>
    <div class="logo-container">
      <div class="bg-images">
        <img src="../../assets/bg.png" class="bg-img" alt="Background 1">
        <img src="../../assets/bg.png" class="bg-img" alt="Background 2">
        <img src="../../assets/bg.png" class="bg-img" alt="Background 3">
      </div>
      <div class="branding">
        <img src="../../assets/logo.png" alt="Logo">
      </div>
    </div>
  </template>
<script>
export default {
  name: 'logo'
}
</script>
  <style scoped>
  .logo-container {
    position: relative;
    left: 0;
    top: 0;
    }
    @media (max-width: 768px) {
    .logo-container {
      position: static;
      /* other mobile-specific styles */
    }
  }

  .bg-images {
    position: absolute;
    z-index: 1;
    display: flex;
  }
  .bg-img {
    width: auto;
    height: auto;
    background-color: rgb(15, 14, 14);
    right: 0;
  }
  .branding {
    position: relative;
    z-index: 2;
  }
  </style>
