<template>
    <div>
        <footer class="main-footer">
            <FooterLogo />
            <FooterServices />
            <FooterContact />
        </footer>
        <div class="rights-reserved">
            © 2023 Old School | All Rights Reserved
        </div>
    </div>
</template>
<script>
import FooterLogo from './descriptionForm.vue'
import FooterServices from './popularServicesForm.vue'
import FooterContact from './contactUsForm.vue'

export default {
  components: {
    FooterLogo,
    FooterServices,
    FooterContact
  }
}
</script>
<style lang="scss" scoped>
.main-footer {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0;
    background-image: url('../../assets/footerBg.png');
    background-repeat: repeat;
    background-position: center;
    background-size: contain;
    background-color: #292727;
    // Mobile view adjustments
    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;

        > * {  // Targeting direct children
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
    }
}

.rights-reserved {
    background-image: url('../../assets/footerBg.png');
    background-color: #292727;
    text-align: center;
    padding: 10px 0;
    color: aliceblue;
    font-family: 'Fira Sans';
    font-weight: 600;
    font-size: 1rem;
    position: relative;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 10%; // Adjust to set the starting point of the line
        right: 10%; // Adjust to set the ending point of the line
        height: 2px;
        background-color: rgba(147, 146, 144, 0.2);
    }

    // Mobile view adjustments
    @media (max-width: 768px) {
        font-size: 0.9rem;
        padding: 8px 0;
        background-image: url('../../assets/footerBg.png');
        background-repeat: repeat;

    }
}
</style>
