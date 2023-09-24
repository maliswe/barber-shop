<template>
    <div class="box">
    </div>

</template>

<style scoped>
.box {
    background-color: rgb(16, 115, 196); /* rgba(249, 250, 251, 1); */
    left: 50%; /* Center horizontally */
    transform: translateX(-50%); /* Center horizontally */
    width: 1140px;
    height: 595.33px;

}

@media (max-width: 768px) {
  .box {
    width: min(80%, 1140px);
    height: min(65%, 595.33px);
  }
}
</style>
