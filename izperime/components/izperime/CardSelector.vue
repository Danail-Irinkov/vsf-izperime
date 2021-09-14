<template>
<!--	<div>-->
<!--		<label for="card" class="card-label">-->
<!--			{{ $t('Card') }}-->
<!--		</label>-->
		<v-select
			class="card-selector"
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
<!--	</div>-->
</template>
<script>
import { userState } from '~/composables';
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';
import card_images from '~/helpers/images.js';

export default {
  name: "CardSelector",
  components: {
	  vSelect
  },
	emits: ['update:modelValue'],
  // props: {
	//   modelValue: {
	// 	  type: Object,
	// 	  default: () => {},
	//   },
  // },
	setup(props, { emit }) {
		const { cards, selectedCard, setSelectedCard } = userState();

		return {
			cards, selectedCard, setSelectedCard
		};
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
	.card-label {
		font: var(--sidebar-top, var(--sidebar-top-weight, var(--font-weight--light)) var(--sidebar-top-size, var(--font-size--base))/var(--sidebar-top-line-height, 1.6) var(--sidebar-top-family, var(--font-family--primary)));
	}
	::v-deep .card-icon {
		width: 36px;
		margin-right: 10px;
		margin-top: 2px;
	}
	::v-deep  .card-selector {
		width: 80vw;
		max-width: 320px;
		padding: 0;
		margin: 0;
		background-color: transparent;
		font-size: 2rem;
		line-height: 3rem;
		height: 3.6rem;
		text-align: center;
		color: var(--input-color, var(--c-text));
		& > .vs__dropdown-toggle {
			border-color: rgba(255, 255, 255, 0.5);
			border-top: 0;
			border-left: 0;
			border-right: 0;
			border-radius: 0;
		}
		& > .vs__dropdown-menu {
			background-color: transparent;
			text-align: center;
			color: var(--input-color, var(--c-text));
			& > li {
				text-align: center;
				color: var(--input-color, var(--c-text));
			}
		}
	}
	::v-deep .vs__dropdown-option--highlight {
		color: var(--input-color, var(--c-text));
		line-height: 36px;
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
		/*text-align: center;*/
		color: var(--input-color, var(--c-text));
		display: block;
		width: 100%;
	}
	::v-deep .vs__search {
		color: rgba(255, 255, 255, 0.5);
		display: none;
	}
</style>
