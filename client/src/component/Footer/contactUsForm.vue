<template>
    <div class="footer-contact">
        <h3>Contact Information</h3>
        <div class="contact-info">
            <p class="phone"><i class="fas fa-phone"></i> 123-456-7890</p>
            <p class="email"><i class="fas fa-envelope"></i> example@example.com</p>
            <p class="address"><i class="fas fa-map-marker-alt"></i> 1234 Street, City</p>
        </div>
    </div>
</template>
<style scoped>
.footer-contact {
    flex: 0.8;
    padding: 10px;
    margin-left: 0%;
    font-size: 0.9em;
    background-image: url('../../assets/footerBg.png');
    background-repeat: repeat; /* to prevent the image from repeating */
    background-position: center; /* to center the background image */
    background-size: contain;
    background-position: center;
    background-color: #292727;
    color: aliceblue;
    font-family: 'Roboto';
}

h3 {
    position: relative;
    display: inline-block;
    font-size: 20px;
    font-weight: 700;
    color: aliceblue;
    line-height: 3;
    margin-top: 30px;
}

h3::after {
    content: "";
    position: absolute;
    left: 10px;
    bottom: -5px;
    /* adjust as needed */
    width: 20px;
    /* width of the line to fit under "P" and "O" */
    height: 4px;
    background-color: #EBB273;
    transform: translateX(-50%);
}

p {
    font-size: 14px;
    font-weight: 500;
    color: #939290;
    list-style-type: none;
    padding-left: 2;
    line-height: 3;
}

</style>
