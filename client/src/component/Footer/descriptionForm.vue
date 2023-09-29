<template>
    <div class="footer-logo">
        <div class="logo-container">
            <img src="../../assets/logo.png" alt="School Logo">
        </div>
        <p class="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua.</p>
        <div class="social-media">
            <!-- Here you can use SVG icons or font-awesome icons for social media links -->
            <a href="#"><i class="fab fa-facebook-f"></i></a>
            <a href="#"><i class="fab fa-instagram"></i></a>
            <a href="#"><i class="fab fa-youtube"></i></a>
            <!-- ... more icons -->
        </div>
    </div>
</template>
<style lang="scss" scoped>
.footer-logo {
    display: flex;
    justify-content: center; // Center the children horizontally
    align-items: center; // Center the children vertically
    flex-direction: column;
    margin-left: 0px;
    padding: 10px 20px;
    flex: 0.8;
    font-size: 0.9em;
    background-image: url('../../assets/footerBg.png');
    background-repeat: repeat;
    background-position: center;
    background-size: contain;
    background-color: #292727;
}

.footer-logo img {
    margin-left: 0;
    padding-left: 0;
}

.logo-container {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 30px;
    margin-bottom: 30px; // Adding space below the logo
}

.description, .social-media {
    width: 100%;
    text-align: left;
    padding-left: calc(50% - 45px);
}

.description {
    font-size: 14px;
    margin: 10px 0;
    color: #939290;
    font-family: 'Roboto';
    margin-bottom: 40px;
}

.social-media {
    display: flex;
    justify-content: flex-start;
    align-self: flex-start;
}

.social-media a{
    display: inline-block;
    background-color: #353331;
    padding: 8px;
    border-radius: 4px;
    margin: 0 5px;
    transition: 0.3s;
    &:hover {
        background-color: #292727;
    }
}

.social-media a i {
    color: #fff;  // Icon color, adjust if necessary
}
</style>
