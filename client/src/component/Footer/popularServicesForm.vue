<template>
    <div class="footer-services">
        <div class="services-content">
            <h3>Popular Services</h3>
            <ul class="inside-content">
                <li>Haircut & color </li>
                <li>Nail</li>
                <li>Massage</li>
                <li>Beard</li>
                <li>Facial</li>
            </ul>
        </div>
    </div>
</template>
<style lang= "scss" scoped>
.footer-services {
    flex: 1.8;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    font-size: 0.9em;
    background-image: url('../../assets/footerBg.png');
    background-repeat: repeat; /* to prevent the image from repeating */
    background-position: center; /* to center the background image */
    background-size: contain;
    background-position: center;
    background-color: #292727;
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

.services-content {
    max-width: 80%;
}

.inside-content {
    font-size: 14px;
    font-weight: 500;
    color: #939290;
    list-style-type: none;
    padding-left: 2;
    line-height: 3;

    ::before {
        font-family: 'FontAwesome';
        content: ">>";
        margin-right: 8px;
        font-size: 10px;
    }
}
</style>
