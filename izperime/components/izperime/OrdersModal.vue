<template>
	<SfModal
		v-e2e="'orders-modal'"
		:visible="!!isOrdersModalOpen"
		class=""
		transitionOverlay="sf-fade"
		transitionModal="our-collapse-bottom"
		@close="toggleOrdersModal"
	>
		<template #modal-bar>
				<SfBar
					:title="$t('Orders')"
					class=""
					:back="true"
					@click:back="toggleOrdersModal"
				/>
		</template>
<!--    <transition name="sf-fade"-->
    <div name="sf-fade" mode="out-in">
      <div class="service-dialog-wrapper">
	      <div v-for="order in orders" :key="order._id"
	            class="order-item">
		      <span>{{ order.createdAt | dateFormatShort}}</span>
		      <span style="float: right">{{ order.status }}</span>
		      <div v-for="product in order.cart">
			      <BasketProduct :product="product"></BasketProduct>
		      </div>
	      </div>
      </div>
    </div>
	</SfModal>
</template>
<script>
import {
	SfBar,
	SfModal,
	SfIcon,
} from '@storefront-ui/vue';
import { useUiState } from '~/composables';
import { userState } from '~/composables';
import BasketProduct  from '~/components/izperime/BasketProduct';

export default {
  name: 'OrdersModal',
  components: {
	  SfBar,
	  SfModal,
	  SfIcon,
	  BasketProduct,
  },
  props: {
  },
	data() {
  	return {
	  }
	},
  setup(props, { emit }) {
	  const { toggleOrdersModal, isOrdersModalOpen } = useUiState();
	  const { orders } = userState();

    return {
	    toggleOrdersModal,
	    isOrdersModalOpen,
	    orders
    };
  },
	mounted () {
	},
	methods: {
	},
	watch: {
	},
	computed: {
	},
	filters: {
  	dateFormatShort(value) {
			if (!value)
				return ''
			else {
				const date = new Date(value)
				const monthNames = [
					'Jan', 'Feb', 'Mar',
					'Apr', 'May', 'Jun', 'Jul',
					'Aug', 'Sep', 'Oct',
					'Nov', 'Dec'
				]

				const day = date.getDate()
				const monthIndex = date.getMonth()
				const year = date.getFullYear()

				return `${day}. ${monthNames[monthIndex]}` + ' ' + year
			}
		}
	}
};
</script>
<style lang="scss" scoped>
.order-item {
	border: #7F828B solid 1px;
	border-radius: 15px;
	padding: 1rem;
	margin-bottom: 1rem;
}
</style>
