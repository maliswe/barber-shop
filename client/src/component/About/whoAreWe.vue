<template>
    <div class="box">
      <img src="@/assets/about2.png" alt="Hair style">
    </div>

</template>

<style scoped>
.box {
    background-color: rgba(249, 250, 251, 1);
    max-width: 1140px;
    width: 100%;
    max-height: 595.33px;
    height: 100%;
}

.box img {
  margin-top: 5%;
  margin-left: 5%;
  max-width: fit-content;
  width: 90%;
}

@media (max-width: 768px) {
  .box {
    width: min(100%, 1140px);
    height: min(70%, 595.33px);
  }
  .box img {
    margin: 5%;
    width: fill;
    height: fill;
}
}
</style>
