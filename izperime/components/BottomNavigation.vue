<template>
<!-- TODO: create logic with isActive prop for BottomNavigationItems -->
  <SfBottomNavigation class="navigation-bottom smartphone-only"
                      style="background-color: hotpink"
                      v-show="isAccountMenuOpen">
    <div class="row h-100"
         @click="toggleBasketSidebar">
	    <div class="flex col-1">
		    <p>
		    <SfIcon
			    icon="added_to_cart"
			    color="white"
			    size="25px"
			    class="display-inline-block"
		    />
		    </p>
		    <p class="display-inline-block left-title" style="">
			    {{ $t('Your basket') }} ({{cartCount}})
		    </p>
	    </div>
	    <div class="flex col-2">
		    <p v-if="cartAmount" class="display-inline-block right-title">
			    €{{ cartAmount }}
		    </p>
		    <p>
		    <SfIcon
			    icon="chevron_right"
			    color="white"
			    size="25px"
			    class="display-inline-block"
		    />
		    </p>
	    </div>
    </div>
  </SfBottomNavigation>
</template>

<script>
import { SfBottomNavigation, SfIcon, SfCircleIcon } from '@storefront-ui/vue';
import { useUiState } from '~/composables';

import { userState } from '~/composables';
import {mapGetters} from "vuex";

export default {
  components: {
    SfBottomNavigation,
    SfIcon,
    SfCircleIcon
  },
  setup(props, { root }) {
    const { toggleBasketSidebar, toggleCartSidebar, toggleWishlistSidebar, toggleLoginModal, toggleMobileMenu, isMobileMenuOpen, isAccountMenuOpen } = useUiState();
    const { isAuthenticated } = userState();

    const handleAccountClick = async () => {
      if (isAuthenticated.value) {
        return root.$router.push('/my-account');
      }
      toggleLoginModal();
    };

    return {
      isMobileMenuOpen,
	    isAccountMenuOpen,
      toggleWishlistSidebar,
      toggleCartSidebar,
	    toggleBasketSidebar,
      toggleMobileMenu,
      handleAccountClick
    };
  },
	data() {
  	return {
	  }
	},
	computed: {
		...mapGetters({
			cartCount: 'cartCount',
			cartAmount: 'cartAmount',
		}),
	}
};
</script>
<style lang="scss" scoped>
.navigation-bottom {
  --bottom-navigation-z-index: 3;
}
.col-1 {
	width: 60%;
	text-align: start;
	justify-content: flex-start;
}
.col-2 {
	width: 40%;
	text-align: end;
	justify-content: flex-end;
}
.left-title {
	margin-left: 1rem;
	color: white;
	font-size: 20px;
	font-weight: 600;
	line-height: 20px;
}
.right-title {
	margin-right: 1rem;
	color: white;
	font-size: 20px;
	font-weight: 600;
	line-height: 18px;
}
</style>
