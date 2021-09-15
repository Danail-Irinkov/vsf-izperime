<template>
	<div class="add-card-wrapper">
		<label for="card" class="card-label">
			{{ $t('Card') }}
		</label>
		<v-select
			class="card-selector"
			:class="{ 'card-select-green-border': !!value }"
			v-model="value"
			id="card"
			name="card"
			:placeholder="$t('Select a Card')"
			:label="$t('Card')"
			:options="cards2"
			:searchable="false"
			:filterable="false"
			:clearable="false"
			@input="cardSelected"
		>
			<template v-slot:selected-option="option">
				<img class="card-icon" :src="getCardImg(option)"/>
				{{ option.payment_method_name }}
			</template>
			<template v-slot:option="option">
				<img class="card-icon" :src="getCardImg(option)"/>
				{{ option.payment_method_name }}
			</template>
		</v-select>

		<SfButton
			class="sf-button--pure add-card-button"
			@click="toggleAddCardModal">
        <span class="sf-search-bar__icon">
          <SfIcon color="hotpink" size="20px" icon="plus" />
        </span>
		</SfButton>
	</div>
</template>
<script>
import { SfIcon, SfButton } from '@storefront-ui/vue';
import { userState, useUiState } from '~/composables';
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';
import card_images from '~/helpers/images.js';

export default {
  name: "CardSelector",
  components: {
	  vSelect,
	  SfIcon, SfButton
  },
	emits: ['update:modelValue'],
  // props: {
	//   modelValue: {
	// 	  type: Object,
	// 	  default: () => {},
	//   },
  // },
	setup(props, { emit }) {
		const { toggleAddCardModal } = useUiState();
		const { cards, selectedCard, setSelectedCard, previousOrder } = userState();

		return {
			cards, selectedCard, setSelectedCard, toggleAddCardModal, previousOrder
		};
	},
	mounted() {
  	if(this.previousOrder && this.previousOrder.payment_method && this.previousOrder.payment_method._id) {
  		// Setting the last used Card
		  this.modelValue = {...this.previousOrder.payment_method}
	  } else if(this.cards2 && this.cards2[0]) {
		  this.modelValue = {...this.cards2[0]}
	  }
	},
	data() {
  	return {
		  // is_new_hover_set: false
		  modelValue: null
	  }
	},
	methods: {
		cardSelected() {
			console.log('cardSelected res', this.value)
		},
		getCardImg(option) {
			if (card_images[option.card_type]) {
				return card_images[option.card_type]
			} else {
				return card_images['placeholder']
			}
		}
	},
	computed: {
		cards2(){
			let cards2 = []
			for (let card of this.cards){
				let card2 = {
					...card,
					value: card._id,
					label: card.payment_method_name
				}
				cards2.push(card2)
			}
			return cards2
		},
		value: {
			get() {
				return this.modelValue || this.selectedCard
			},
			set(value) {
				this.modelValue = value
				this.setSelectedCard(value)
				this.$emit('update:modelValue', value)
			}
		}
	}
};
</script>
<style lang="scss" scoped>
	.add-card-wrapper {
		display: block;
		padding-top: 2rem;
		padding-bottom: 0;
	}
	.card-label {
		display: block;
		width: 100%;
		margin-bottom: 5px;
		font: var(--sidebar-top, var(--sidebar-top-weight, var(--font-weight--light)) var(--sidebar-top-size, var(--font-size--base))/var(--sidebar-top-line-height, 1.6) var(--sidebar-top-family, var(--font-family--primary)));
		color: var(--c-text);
		font-weight: 600;
	}
	.add-card-button {
		display: inline-block;
		/*margin: 0 0 0 auto;*/
		/*margin-left: 4%!important;*/
		float: right;
		width: 35px;
		max-width: 35px;
		max-height: 35px;
		height: 35px;
		line-height: 30px;
		text-align: center;
		border-radius: 5px;
		border: hotpink solid 2px;
		& ::v-deep .sf-icon {
			margin: 0 auto;
			color: hotpink;
		}
	}
	::v-deep .card-icon {
		width: 36px;
		margin-right: 10px;
		margin-top: 2px;
	}
	::v-deep .card-select-green-border > .vs__dropdown-toggle {
		border-color: var(--c-primary) !important;
	}
	::v-deep .card-selector {
		display: inline-block;
		width: 87%;
		/*max-width: 320px;*/
		padding: 0;
		margin: 0;
		background-color: transparent;
		font-size: 2rem;
		line-height: 36px;
		min-height: 35px;
		text-align: center;
		color: var(--input-color, var(--c-text));
		& > .vs__dropdown-toggle {
			height: 42px;
			border-color: rgba(255, 255, 255, 0.5);
			border-top: 0;
			border-left: 0;
			border-right: 0;
			border-radius: 0;
			border-bottom: var(--c-light) solid 1px;

			& > .vs__actions {
				display: none;
			}
		}
		& > .vs__dropdown-menu {
			background-color: transparent;
			text-align: center;
			color: var(--input-color, var(--c-text));
			/*& > li {*/
			/*	text-align: center;*/
			/*	color: var(--input-color, var(--c-text));*/
			/*}*/
		}
	}
	::v-deep .vs__dropdown-option {
		line-height: 22px;
		font-size: 22px;
		text-align: left;
		color: var(--input-color, var(--c-text));
	}
	::v-deep .vs__dropdown-option--highlight {
		color: var(--input-color, var(--c-text));
		line-height: 22px;
		font-size: 22px;
		background: rgba(146, 234, 251, 0);
	}
	::v-deep .vs__open-indicator {
		fill: rgba(255, 255, 255, 0.5);
	}
	::v-deep .vs__selected-options {
		max-height: 46px;
	}
	::v-deep .vs__selected {
		line-height: 22px;
		font-size: 22px;
		text-align: left;
		color: var(--input-color, var(--c-text));
		display: block;
		width: 100%;
	}
	::v-deep .vs__search {
		color: rgba(255, 255, 255, 0.5);
		display: none;
	}
</style>
