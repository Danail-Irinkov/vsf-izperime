<template>
  <div class="row flex-50">
	  <div class="column w-50">
		  <span>{{ $t('Collection Time') }}</span>
		  <div class="time-slot-box" @click="toggleBasketTimeSlotModal('collection')">
			  <span>{{ getTimeSlots.collection ? $moment(getTimeSlots.collection.selectedDate).format('dddd') : '' | capitalizeFirstLetter}}</span>
			  <span>{{ $moment(getTimeSlots.collection.selectedDate).format('D') }} {{ $moment(getTimeSlots.collection.selectedDate).format('MMM') | capitalizeFirstLetter}}</span>
			  <span>
				  {{getTimeSlots.collection.selectedTimeslot.from}}
				  -
				  {{getTimeSlots.collection.selectedTimeslot.to}}
			  </span>
		  </div>
	  </div>
	  <div class="column w-50">
		  <span>{{ $t('Delivery Time') }}</span>
		  <div class="time-slot-box" @click="toggleBasketTimeSlotModal('delivery')">
			  <span>{{ $moment(getTimeSlots.delivery.selectedDate).format('dddd') | capitalizeFirstLetter}}</span>
			  <span>{{ $moment(getTimeSlots.delivery.selectedDate).format('D') }} {{ $moment(getTimeSlots.delivery.selectedDate).format('MMM') | capitalizeFirstLetter}}</span>
			  <span>
				  {{getTimeSlots.delivery.selectedTimeslot.from}}
				  -
				  {{getTimeSlots.delivery.selectedTimeslot.to}}
			  </span>
		  </div>
	  </div>
  </div>
</template>
<script>
	import {
		SfIcon,
	} from '@storefront-ui/vue';
import { useUiState } from '~/composables';
	import {mapGetters, mapMutations} from "vuex";
	import _cloneDeep from "lodash.clonedeep";
export default {
  name: "BasketDeliverySlots",
  components: {
	  SfIcon
  },
  props: {
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
	mounted() {
  	this.setInitialTimeslotDates()
	},
	methods: {
		...mapMutations({
			setTimeSlots: 'setTimeSlots',
		}),
		setInitialTimeslotDates() {
			let timeslots = _cloneDeep(this.getTimeSlots)
			let i = 1
			if (this.$moment().add(i, 'd').format('d') === '0') i++ //Checking if it is Sunday

			if (timeslots.collection.selectedDate === 0) {
				timeslots.collection.selectedDate = this.$moment().add(i, 'd').format()
				timeslots.collection.selectedDay = this.$moment().add(i, 'd').format('D')
				timeslots.collection.selectedTimeslot = {
					from: '07:00',
					to: '09:00',
					status: 'free',
				}

			}
			if (timeslots.delivery.selectedDate === 0) {
				i = i + 2
				timeslots.delivery.selectedDate = this.$moment().add(i, 'd').format()
				timeslots.delivery.selectedDay = this.$moment().add(i, 'd').format('D')
				timeslots.delivery.selectedTimeslot = {
					from: '07:00',
					to: '09:00',
					status: 'free',
				}

			}
			this.setTimeSlots(_cloneDeep(timeslots))
		}
	},
  computed: {
	  ...mapGetters({
		  getTimeSlots: 'getTimeSlots',
	  }),
  },
	watch: {
		getTimeSlots(){
			this.$forceUpdate()
		}
	},
	filters: {
		capitalizeFirstLetter(string) {
			return string ? string.charAt(0).toUpperCase() + string.slice(1) : ''
		},
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
