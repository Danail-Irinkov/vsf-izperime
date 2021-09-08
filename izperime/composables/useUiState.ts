import Vue from 'vue';
import VueCompositionAPI, { reactive, computed } from '@vue/composition-api';

// We need to register it again because of Vue instance instantiation issues
Vue.use(VueCompositionAPI);

const state = reactive({
	isAccountMenuOpen: true,
	activeServiceCategory: 0,
	hoverServiceCategory: 0,
	is_new_hover_set: false,
	currentServiceModal: null,
	isAccountModalOpen: false,
	isOrdersModalOpen: false,
	isBasketSidebarOpen: false,
	isBasketTimeSlotModalOpen: false,
	currentTimeSlot: 'collection',
	// Original States
  isCartSidebarOpen: false,
  isWishlistSidebarOpen: false,
  isLoginModalOpen: false,
  isCategoryGridView: true,
  isFilterSidebarOpen: false,
  isMobileMenuOpen: false
});

const useUiState = () => {
	const isAccountMenuOpen = computed(() => state.isAccountMenuOpen);
	const toggleAccountMenu = () => {
		if (state.isMobileMenuOpen) toggleMobileMenu();
		state.isAccountMenuOpen = !state.isAccountMenuOpen;
	};

	const activeServiceCategory = computed(() => state.activeServiceCategory);
	const setActiveCategory = (index) => {
		state.activeServiceCategory = index
	};

	const hoverServiceCategory = computed(() => state.hoverServiceCategory);
	const setHoverCategory = (index) => {
		state.hoverServiceCategory = index
	};
	const unsetHoverCategory = (index) => {
		state.hoverServiceCategory = state.activeServiceCategory
		console.log('unsetHoverCategory', state.hoverServiceCategory)
	};
	const setNewHoverSet = (bool) => {
		state.is_new_hover_set = bool
	};
	const is_new_hover_set = computed(() => state.is_new_hover_set);

	const setServiceModal = (service) => {
		state.currentServiceModal = service
	};
	const currentServiceModal = computed(() => state.currentServiceModal);

	const isOrdersModalOpen = computed(() => state.isOrdersModalOpen);
	const toggleOrdersModal = () => {
		state.isOrdersModalOpen = !state.isOrdersModalOpen;
	};

	const isAccountModalOpen = computed(() => state.isAccountModalOpen);
	const toggleAccountModal = () => {
		state.isAccountModalOpen = !state.isAccountModalOpen;
	};

	// ORIGINAL VSF STATES
	const isMobileMenuOpen = computed(() => state.isMobileMenuOpen);
	const toggleMobileMenu = () => {
		state.isMobileMenuOpen = !state.isMobileMenuOpen;
	};

  const isCartSidebarOpen = computed(() => state.isCartSidebarOpen);
  const toggleCartSidebar = () => {
    if (state.isMobileMenuOpen) toggleMobileMenu();
    state.isCartSidebarOpen = !state.isCartSidebarOpen;
  };

  const isBasketSidebarOpen = computed(() => state.isBasketSidebarOpen);
  const toggleBasketSidebar = () => {
    state.isBasketSidebarOpen = !state.isBasketSidebarOpen;
  };

  const isBasketTimeSlotModalOpen = computed(() => state.isBasketTimeSlotModalOpen);
  const currentTimeSlot = computed(() => state.currentTimeSlot);
  const toggleBasketTimeSlotModal = (currentTimeSlot) => {
  	console.log('toggleBasketTimeSlotModal START', isBasketTimeSlotModalOpen.value)
    state.currentTimeSlot = currentTimeSlot
    state.isBasketTimeSlotModalOpen = !state.isBasketTimeSlotModalOpen;
	  console.log('toggleBasketTimeSlotModal START', isBasketTimeSlotModalOpen.value)
  };

  const isWishlistSidebarOpen = computed(() => state.isWishlistSidebarOpen);
  const toggleWishlistSidebar = () => {
    if (state.isMobileMenuOpen) toggleMobileMenu();
    state.isWishlistSidebarOpen = !state.isWishlistSidebarOpen;
  };

  const isLoginModalOpen = computed(() => state.isLoginModalOpen);
  const toggleLoginModal = () => {
    if (state.isMobileMenuOpen) toggleMobileMenu();
    state.isLoginModalOpen = !state.isLoginModalOpen;
  };

  const isCategoryGridView = computed(() => state.isCategoryGridView);
  const changeToCategoryGridView = () => {
    state.isCategoryGridView = true;
  };
  const changeToCategoryListView = () => {
    state.isCategoryGridView = false;
  };

  const isFilterSidebarOpen = computed(() => state.isFilterSidebarOpen);
  const toggleFilterSidebar = () => {
    state.isFilterSidebarOpen = !state.isFilterSidebarOpen;
  };

  return {
	  isAccountMenuOpen,
	  toggleAccountMenu,
	  activeServiceCategory,
	  setActiveCategory,
	  hoverServiceCategory,
	  setHoverCategory,
	  unsetHoverCategory,
	  setNewHoverSet,
	  is_new_hover_set,
	  setServiceModal,
	  currentServiceModal,
	  isOrdersModalOpen,
	  toggleAccountModal,
	  isAccountModalOpen,
	  toggleOrdersModal,
	  isBasketSidebarOpen,
	  toggleBasketSidebar,
	  isBasketTimeSlotModalOpen,
	  toggleBasketTimeSlotModal,
	  currentTimeSlot,
	  // Original VSF states
    isCartSidebarOpen,
    isWishlistSidebarOpen,
    isLoginModalOpen,
    isCategoryGridView,
    isFilterSidebarOpen,
    isMobileMenuOpen,
    toggleCartSidebar,
    toggleWishlistSidebar,
    toggleLoginModal,
    changeToCategoryGridView,
    changeToCategoryListView,
    toggleFilterSidebar,
    toggleMobileMenu
  };
};

export default useUiState;
