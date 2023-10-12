<template>
    <div class="branding">
        <img src="../../assets/logo.png" alt="logo">
    </div>
</template>

<script>
export default {
  name: 'Logo'
}
</script>

<style lang="scss" scoped>
.branding {
    position: relative;
    max-width: 300px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url('../../assets/bg.png');
    padding: 5px 10px;
    margin-right: 20px;
    background-color: #292727;

    @media (max-width: 600px) {
        width: 100%;
    }

    img {
        width: 70%;
        transition: .5s ease all;
    }

    &::before,
    &::after {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        width: calc(33.33% - 10px);
        z-index: -1;
    }

    &::before {
        left: 0;
        background: url('../../assets/bg.png');
    }

    &::after {
        right: 0;
        background: url('../../assets/bg.png');
    }
}
</style>
