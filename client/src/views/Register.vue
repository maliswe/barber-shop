<!--
* The "Register Page" component serves as the registration page of the application.
* It displays the registration form for users and provides options for third-party registration.
* It consists of two child components, "RegisterForm" and "ThirdPartyRegister," which handle the registration process.
-->
<template>
  <div class="register-page">
    <RegisterForm />
    <div class="separator"></div>
    <ThirdPartyRegister />
  </div>
</template>
<script>
import RegisterForm from '../component/Register/ RegisterForm.vue'
import ThirdPartyRegister from '../component/Register/ThirdPartyRegister.vue'

export default {
  components: {
    RegisterForm,
    ThirdPartyRegister
  }
}
</script>

<style lang="scss" scoped>
.register-page {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20% 11%;

  .separator {
    width: 1px;
    height: 26rem;
    background-color: #534d4dbb;
    margin: 0 20px;
  }
    @media (max-width: 768px) {
    padding-top: 45%;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .separator {
      width: 15rem;
      height: 1px;
      margin: 60px 0;
    }
  }

}
</style>
