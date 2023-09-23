<template>
    <div class="header-photo">
      <img src="@/assets/about.png" alt="Image of a man cutting a client hair" />
    </div>
</template>

<style scoped>
.header-photo {
    position: absolute;
    top: 146px;
    left: 50%; /* Center horizontally */
    transform: translateX(-50%); /* Center horizontally */
}

.header-photo img {
    width: 1140px; /* Set a fixed width */
    height: auto; /* Maintain the aspect ratio of the image */
}
</style>
