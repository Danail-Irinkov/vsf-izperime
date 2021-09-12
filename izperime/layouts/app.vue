<template>
  <div id="layout">
	  <Notification />
    <AppHeader />
    <nuxt />
    <BottomNavigation />
    <BasketSidebar />
    <ServiceModal/>
    <OrdersModal/>
    <BasketTimeSlotModal/>
    <AddCardModal/>
    <AccountModal/>
    <LoginModal />
  </div>
</template>

<script>
import AppHeader from '~/components/AppHeader.vue';
import BottomNavigation from '~/components/BottomNavigation.vue';
import TopBar from '~/components/TopBar.vue';
import BasketSidebar from '~/components/izperime/BasketSidebar.vue';
import LoginModal from '~/components/LoginModal.vue';
import ServiceModal from '~/components/izperime/ServiceModal';
import OrdersModal from '~/components/izperime/OrdersModal';
import BasketTimeSlotModal from '~/components/izperime/BasketTimeSlotModal';
import AddCardModal from '~/components/izperime/AddCardModal';
import AccountModal from '~/components/izperime/AccountModal';
import Notification from '~/components/Notification';

export default {
  name: 'AppLayout',
  components: {
    TopBar,
    AppHeader,
    BottomNavigation,
    BasketSidebar,
	  ServiceModal,
	  OrdersModal,
	  BasketTimeSlotModal,
	  AddCardModal,
	  AccountModal,
	  Notification,
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
