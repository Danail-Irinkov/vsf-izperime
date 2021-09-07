<template>
  <div>
	  <div v-for="product in getCart">
		  <BasketProduct :product="product"></BasketProduct>
	  </div>
  </div>
</template>
<script>
import { useUiState } from '~/composables';
import {mapGetters} from "vuex";
import BasketProduct from '~/components/izperime/BasketProduct.vue';
export default {
  name: "BasketItems",
  components: {
	  BasketProduct
  },
  props: {
	  deliverySlots: {
		  type: Object,
		  default: () => {
		  	return {
				  collection: {},
				  delivery: {}
			  }
		  },
	  },
  },
	data() {
  	return {
		  // is_new_hover_set: false
	  }
	},
	methods: {
	},
  computed: {
	  ...mapGetters({
		  getCart: 'getCart',
	  }),
  },
};
</script>
<style lang="scss">
</style>
