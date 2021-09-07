<template>
	<SfModal
		v-e2e="'basket-time-slot-modal'"
		:visible="!!isBasketTimeSlotModalOpen"
		class=""
		transitionOverlay="sf-fade"
		transitionModal="our-collapse-bottom"
		@close="toggleBasketTimeSlotModal"
	>
		<template #modal-bar>
				<SfBar
					:title="capFirst(currentTimeSlot)"
					class=""
					:back="true"
					@click:back="toggleBasketTimeSlotModal"
				/>
		</template>
<!--    <transition name="sf-fade"-->
    <div name="sf-fade" mode="out-in">
      <div class="service-dialog-wrapper">
	      <div class="day-selector">
		      <div class="day-item"
		           v-for="day in availableDays"
		           :class="{'day-selected': selectedDay === day.date}"
		           @click="selectDay(day)"
		      >
			      <span>{{ day.letter }}</span>
			      <span>{{ day.date }}</span>
		      </div>
	      </div>

	      <hr size="1px" style="width: 100vw;position: absolute; left: 0; color: #4B5563"/>

	      <div class="timeslot-selector" style="margin-top: 2rem">
		      <div class="w-100 available-timeslots" v-for="timeslot in availableTimeSlots">
			      <span style="margin-right: 1rem">{{ timeslot.from }}</span>

			      <SfIcon style="display: inline-block"
				      icon="arrow_right"
				      color="inherit"
				      size="22px"
			      />

			      <span style="margin-left: 1rem">{{ timeslot.to }}</span>
			      <span style="display: flex; flex-grow: 1"></span>
			      <span class="timeslot-status">{{ timeslot.status | capitalizeFirstLetter}}</span>
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
import BasketProduct  from '~/components/izperime/BasketProduct';
import { Collapse, CollapseItem } from 'element-ui'
import { capitalizeFirstLetter } from '~/helpers/globalFuncs';

export default {
  name: 'BasketTimeSlotModal',
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
		  selectedDay: 0,
		  currentBodyScroll: 0,
		  availableTimeSlots: [
			  {
			  	from: '07:00',
			  	to: '09:00',
			  	status: 'free',
			  },
			  {
			  	from: '08:00',
			  	to: '10:00',
			  	status: 'free',
			  },
			  {
			  	from: '09:00',
			  	to: '11:00',
			  	status: 'free',
			  },
			  {
			  	from: '10:00',
			  	to: '12:00',
			  	status: 'free',
			  },
			  {
			  	from: '11:00',
			  	to: '13:00',
			  	status: 'free',
			  },
			  {
			  	from: '12:00',
			  	to: '14:00',
			  	status: 'free',
			  },
			  {
			  	from: '13:00',
			  	to: '15:00',
			  	status: 'free',
			  },
			  {
			  	from: '14:00',
			  	to: '16:00',
			  	status: 'free',
			  },
		  ]
	  }
	},
  setup(props, { emit }) {
	  const { toggleBasketTimeSlotModal, isBasketTimeSlotModalOpen, currentTimeSlot } = useUiState();
	  let capFirst = capitalizeFirstLetter

    return {
	    toggleBasketTimeSlotModal,
	    isBasketTimeSlotModalOpen,
	    currentTimeSlot,
	    capFirst,
    };
  },
	methods: {
		selectDay(day) {
			this.selectedDay = day.date
		}
	},
	watch: {
  	currentServiceModal(service){
  		if (service) {
  			this.currentBodyScroll = window.scrollY
			  document.body.style.position = 'fixed';
			  document.body.style.top = `-${window.scrollY}px`;
		  } else {
			  const scrollY = this.currentBodyScroll;
			  document.body.style.position = '';
			  document.body.style.top = '';
			  window.scrollTo(0, parseInt(scrollY || '0'))
		  }
	  }
	},
	computed: {
  	availableDays() {
  		let days = []

		  for (let i = 0; i < 7; i++) {
		  	let date = this.$moment().add(i, 'd').format('D')
		  	let letter = this.capFirst(this.$moment().add(i, 'd').format('ddd'))
			  days.push({
				  letter, date
			  })
		  }

		  return days
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
	@import "assets/scss/animations";
</style>
<style lang="scss" scoped>
	::v-deep .sf-modal__container {
		z-index: 999;
	}
	.day-selector {
		width: 100%;
		display: flex;
	}
	.day-item {
		display: flex;
		flex-direction: column;
		flex-basis: 14%;
		margin: 0 5px;
		& > span {
			padding: 2px;
			text-align: center;
			width: 100%;
			display: block;
			border-radius: 0 0 50% 50%;
		}
		& > span:first-child {
			border-radius: 50% 50% 0 0;
		}
	}
	.day-selected > span {
		color: white;
		background-color: hotpink;
	}
	.available-timeslots {
		display: flex;
		flex-direction: row;
		height: 40px;
		vertical-align: center;
		& > span {
			display: inline-block;
			width: auto;
		}
	}
	.timeslot-status {
		height: fit-content;
		background-color: hotpink;
		color: white;
		padding: 0px 8px;
		border-radius: 5px;
		font-size: 16px;
		line-height: 26px;
	}
</style>
