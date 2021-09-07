<template>
  <div>
    <SfHeader
      class="sf-header--has-mobile-search app-header"
      :class="{'header-on-top': isSearchOpen}"
      :isNavVisible="isMobileMenuOpen"
    >
      <!-- TODO: add mobile view buttons after SFUI team PR -->
      <template #logo>
        <nuxt-link :to="localePath('/')" class="sf-header__logo">
          <SfImage src="/icons/logolaundr.png" alt="Vue Storefront Next" class="sf-header__logo-image"/>
        </nuxt-link>
      </template>
      <template #navigation>
        <HeaderNavigation :isMobile="isMobile" />
      </template>
      <template #aside>
	      <SfButton
		      class="sf-button--pure izperime-header-icons"
		      @click="toggleSearchModal">
	          <span class="sf-search-bar__icon">
	            <SfIcon color="var(--c-text)" size="20px" icon="search" />
	          </span>
	      </SfButton>
	      <SfButton
		      class="sf-button--pure izperime-header-icons"
		      @click="toggleAccountModal">
	          <span class="sf-search-bar__icon">
	            <SfIcon color="var(--c-text)" size="20px" icon="profile" />
	          </span>
	      </SfButton>

        <StoreLocaleSelector class="izperime-header-icons" />
      </template>
      <template #header-icons>
        <div class="sf-header__icons">
          <SfButton
            v-e2e="'app-header-account'"
            class="sf-button--pure sf-header__action"
            @click="handleAccountClick"
          >
            <SfIcon
              :icon="accountIcon"
              size="1.25rem"
            />
          </SfButton>
          <SfButton
            class="sf-button--pure sf-header__action"
            @click="toggleWishlistSidebar"
          >
            <SfIcon
              class="sf-header__icon"
              icon="heart"
              size="1.25rem"
            />
          </SfButton>
          <SfButton
            v-e2e="'app-header-cart'"
            class="sf-button--pure sf-header__action"
            @click="toggleBasketSidebar"
          >
            <SfIcon
              class="sf-header__icon"
              icon="empty_cart"
              size="1.25rem"
            />
            <SfBadge v-if="cartTotalItems" class="sf-badge--number cart-badge">{{cartTotalItems}}</SfBadge>
          </SfButton>
        </div>
      </template>
      <template #search>
        <SfSearchBar v-if="isSearchOpen"
          ref="searchBarRef"
          :placeholder="$t('Start typing to search')"
          aria-label="Search"
          class="sf-header__search"
          :value="searchTerm"
          @input="handleSearch"
          @keydown.enter="handleSearch($event)"
          @keydown.esc="closeSearch"
          v-click-outside="closeSearch"
        >
          <template #icon>
            <SfButton
              class="sf-search-bar__button sf-button--pure"
              @click="toggleSearchModal"
            >
              <span class="sf-search-bar__icon">
                <SfIcon color="var(--c-text)" size="20px" icon="cross" />
              </span>
            </SfButton>
          </template>
        </SfSearchBar>
	      <div v-else></div>
      </template>
    </SfHeader>
    <SearchResults v-if="isSearchOpen" :visible="isSearchOpen" :result="result" @close="closeSearch" @removeSearchResults="removeSearchResults" />
<!--    <SfOverlay :visible="isSearchOpen" />-->
  </div>
</template>

<script>
import { SfHeader, SfImage, SfIcon, SfButton, SfBadge, SfSearchBar, SfOverlay, SfMenuItem, SfLink } from '@storefront-ui/vue';
import { useUiState } from '~/composables';
import { useCart, useUser, cartGetters } from '@vue-storefront/commercetools';
import { computed, ref, onBeforeUnmount, watch } from '@vue/composition-api';
import { useUiHelpers } from '~/composables';
import StoreLocaleSelector from './StoreLocaleSelector';
import SearchResults from '~/components/SearchResults';
import HeaderNavigation from './HeaderNavigation';
import { clickOutside } from '@storefront-ui/vue/src/utilities/directives/click-outside/click-outside-directive.js';
import {
  mapMobileObserver,
  unMapMobileObserver
} from '@storefront-ui/vue/src/utilities/mobile-observer.js';
import debounce from 'lodash.debounce';
import mockedSearchProducts from '../mockedSearchProducts.json';

export default {
  components: {
    SfHeader,
    SfImage,
    StoreLocaleSelector,
    SfIcon,
    SfButton,
    SfBadge,
    SfSearchBar,
    SearchResults,
    SfOverlay,
    SfMenuItem,
    SfLink,
    HeaderNavigation,
  },
  directives: { clickOutside },
  setup(props, { root }) {
    const { setServiceModal, currentServiceModal, toggleBasketSidebar, toggleAccountModal, toggleWishlistSidebar, toggleLoginModal, isMobileMenuOpen } = useUiState();
    const { setTermForUrl, getFacetsFromURL } = useUiHelpers();
    const { isAuthenticated, load: loadUser } = useUser();
    const { cart } = useCart();
    const searchTerm = ref(getFacetsFromURL().phrase);
    const isSearchOpen = ref(false);
    const searchBarRef = ref(null);
    const result = ref(null);
    const isMobile = ref(mapMobileObserver().isMobile.get());

    const cartTotalItems = computed(() => {
      const count = cartGetters.getTotalItems(cart.value);
      return count ? count.toString() : null;
    });

    const accountIcon = computed(() => isAuthenticated.value ? 'profile_fill' : 'profile');

    loadUser();

    // TODO: https://github.com/DivanteLtd/vue-storefront/issues/4927
    const handleAccountClick = async () => {
      if (isAuthenticated.value) {
        return root.$router.push('/my-account');
      }

      toggleLoginModal();
    };

    const closeServiceModal = () => {
    	console.log('closeServiceModal')
	    setServiceModal(null)
    };

    const closeSearch = () => {
      if (!isSearchOpen.value) return;

      searchTerm.value = '';
      isSearchOpen.value = false;
    };

    const handleSearch = debounce(async (paramValue) => {
      if (!paramValue.target) {
        searchTerm.value = paramValue;
      } else {
        searchTerm.value = paramValue.target.value;
      }
      result.value = mockedSearchProducts;

    }, 1000);

    const closeOrFocusSearchBar = () => {
      if (isMobile.value) {
        return closeSearch();
      }
      // else {
      //   searchTerm.value = '';
      //   return searchBarRef.value.$el.children[0].focus();
      // }
    };

    watch(() => searchTerm.value, (newVal, oldVal) => {
      const shouldSearchBeOpened = (!isMobile.value && searchTerm.value.length > 0) && ((!oldVal && newVal) || (newVal.length !== oldVal.length && isSearchOpen.value === false));
      if (shouldSearchBeOpened) {
        isSearchOpen.value = true;
      }
    });

    const removeSearchResults = () => {
      result.value = null;
    };

    onBeforeUnmount(() => {
      unMapMobileObserver();
    });

    return {
	    setServiceModal,
	    currentServiceModal,
	    closeServiceModal,
      accountIcon,
      cartTotalItems,
      handleAccountClick,
	    toggleBasketSidebar,
	    toggleAccountModal,
      toggleWishlistSidebar,
      setTermForUrl,
      searchTerm,
      isSearchOpen,
      closeSearch,
      handleSearch,
      result,
      closeOrFocusSearchBar,
      searchBarRef,
      isMobile,
      isMobileMenuOpen,
      removeSearchResults
    };
  },
	methods: {
  	toggleSearchModal() {
  		console.log('toggleSearchModal')
  		this.isSearchOpen = !this.isSearchOpen
	  }
	}
};
</script>

<style lang="scss" scoped>
	::v-deep .sf-header__actions {
		display: none;
	}
.izperime-header-icons {
	margin: 0px 5px;
	display: inline-block;
	flex-wrap: nowrap;
	align-items: center;
	position: relative;
}
.sf-header {
  --header-padding:  var(--spacer-sm);
  @include for-desktop {
    --header-padding: 0;
  }
  &__logo-image {
      height: 100%;
  }
}
.header-on-top {
  z-index: 2;
}
.nav-item {
  --header-navigation-item-margin: 0 var(--spacer-base);
  .sf-header-navigation-item__item--mobile {
    display: none;
  }
}

.cart-badge {
  position: absolute;
  bottom: 40%;
  left: 40%;
}
::v-deep .sf-header__header {
		padding-top: 5px!important;
		padding-bottom: 0px!important;
}
::v-deep .app-header {
	--header-box-shadow: none!important;
	& > .sf-header__wrapper {
		background-color: var(--c-light) !important;
	}
}
</style>
