<template>
  <div id="layout" >
      <AppHeader />
      <nuxt />
      <BottomNavigation />
      <CartSidebar />
	    <ServiceModal/>
	    <AccountModal/>
	    <LoginModal />
  </div>
</template>

<script>
import AppHeader from '~/components/AppHeader.vue';
import BottomNavigation from '~/components/BottomNavigation.vue';
import TopBar from '~/components/TopBar.vue';
import CartSidebar from '~/components/CartSidebar.vue';
import LoginModal from '~/components/LoginModal.vue';
import ServiceModal from '~/components/izperime/ServiceModal';
import AccountModal from '~/components/izperime/AccountModal';

export default {
  name: 'AppLayout',

  components: {
    TopBar,
    AppHeader,
    BottomNavigation,
    CartSidebar,
	  ServiceModal,
	  AccountModal,
    LoginModal
  }
};
</script>

<style lang="scss">
@import "~@storefront-ui/vue/styles";
@import "assets/scss/global";

body {
  padding: 0;
  margin: 0;
}

#layout {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1240px;
    margin: auto;
  }
}
</style>
