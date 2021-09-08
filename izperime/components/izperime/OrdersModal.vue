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
	      ORDERS LIST
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
import BasketProduct  from '~/components/izperime/BasketProduct';
import { Collapse, CollapseItem } from 'element-ui'
import { capitalizeFirstLetter } from '~/helpers/globalFuncs';
import {mapGetters, mapMutations} from "vuex";
import _cloneDeep from "lodash.clonedeep";

export default {
  name: 'OrdersModal',
  components: {
	  SfBar,
	  SfModal,
	  SfIcon,
	  BasketProduct,
	  Collapse, CollapseItem,
  },
  props: {
  },
	data() {
  	return {
	  }
	},
  setup(props, { emit }) {
	  const { toggleOrdersModal, isOrdersModalOpen } = useUiState();
	  let capFirst = capitalizeFirstLetter

    return {
	    toggleOrdersModal,
	    isOrdersModalOpen,
	    capFirst,
    };
  },
	mounted () {
  	this.timeslots = _cloneDeep(this.getTimeSlots)
	},
	methods: {
		...mapMutations({
			setTimeSlots: 'setTimeSlots',
		}),
	},
	watch: {
	},
	computed: {
		...mapGetters({
			getTimeSlots: 'getTimeSlots',
		}),
	},
	filters: {
		capitalizeFirstLetter(string) {
			return string ? string.charAt(0).toUpperCase() + string.slice(1) : ''
		},
	},
};
</script>
<style lang="scss" scoped>

</style>
