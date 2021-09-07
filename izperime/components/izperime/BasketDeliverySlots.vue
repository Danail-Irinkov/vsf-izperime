<template>
  <div class="row flex-50">
	  <div class="column w-50">
		  <span>{{ $t('Collection Time') }}</span>
		  <div class="time-slot-box" @click="toggleBasketTimeSlotModal('collection')">
			  <span>Tomorrow</span>
			  <span>8 Sep</span>
			  <span>11:00-13:00</span>
		  </div>
	  </div>
	  <div class="column w-50">
		  <span>{{ $t('Delivery Time') }}</span>
		  <div class="time-slot-box" @click="toggleBasketTimeSlotModal('delivery')">
			  <span>Friday</span>
			  <span>10 Sep</span>
			  <span>13:00-15:00</span>
		  </div>
	  </div>
  </div>
</template>
<script>
import { useUiState } from '~/composables';
export default {
  name: "BasketDeliverySlots",
  components: {
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
	setup(props, { emit }) {
		const { toggleBasketTimeSlotModal, isBasketTimeSlotModalOpen } = useUiState();

		return {
			toggleBasketTimeSlotModal,
			isBasketTimeSlotModalOpen,
		};
	},
	data() {
  	return {
		  // is_new_hover_set: false
	  }
	},
	methods: {
	},
  computed: {
  },
};
</script>
<style lang="scss">
	span {
		width: 100%;
		display: block;
		font-weight: 600;
	}
	.time-slot-box {
		max-width: 220px;
		border: 2px solid hotpink;
		border-radius: 10px;
		padding: 1rem;
		margin: 10px 2rem 0 0;
		& > span {
			color: hotpink;
		}
	}
</style>
