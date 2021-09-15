<template>
	<div class="row sub_product_row">
<!--		<hr size="1px" style="width: 100%;position: absolute; left: 0; color: #4B5563"/>-->
		<div class="column" style="flex-grow: 1; margin-top: 6px">
			<p class="sub_product__title">
				{{ $t(product.title) }}
			</p>
			<p class="sub_product__description" v-if="product.description">
				{{ $t(product.description) }}
			</p>
			<ul class="sub_product__bullets" v-if="product.bullets">
				<li v-for="bullet of product.bullets">
					{{ $t(bullet)}}
				</li>
			</ul>
		</div>
		<div class="column" style="flex-shrink: 1; min-width: 107px; margin-top: 6px">
			<p class="sub_product_price" style="text-align: end">
				{{ $t(product.price) }}€
			</p>
			<div class="row align-end" style="text-align: end">
				<SfCircleIcon
					v-if="!product.quantity && getCart[product._id] && getCart[product._id].quantity"
					class="add_circle_icon"
					:class="{'add_circle_icon_fill': getCart[product._id]}"
					:aria-label="$t('Remove')"
					:style="{margin: '.5rem'}"
					@click="decrementQuantity(product)">
					<SfIcon
						icon="minus"
						:color="getCart[product._id] ? 'white' : 'hotpink'"
						size="16px"
					/>
				</SfCircleIcon>
				<p class="sub_product__quantity"
				   v-if="product && product.quantity">
					{{ product.quantity }}
				</p>
				<p class="sub_product__quantity"
				   v-else-if="getCart[product._id] && getCart[product._id].quantity">
					{{ getCart[product._id].quantity }}
				</p>
				<SfCircleIcon
					class="add_circle_icon"
					:class="{'add_circle_icon_fill': !product.quantity && getCart[product._id]}"
					:aria-label="$t('Add')"
					:style="{margin: '.5rem'}"
					@click="incrementQuantity(product)">
					<SfIcon
						icon="plus"
						:color="!product.quantity && getCart[product._id] ? 'white' : 'hotpink'"
						size="16px"
					/>
				</SfCircleIcon>
			</div>
		</div>
	</div>
</template>
<script>
import { useUiState } from '~/composables';
import {
	SfIcon,
	SfCircleIcon,
} from '@storefront-ui/vue';
import {mapGetters, mapMutations} from "vuex";
export default {
  name: "BasketProduct",
  components: {
	  SfIcon,
	  SfCircleIcon,
  },
  props: {
	  product: {
		  type: Object,
		  default: () => {},
	  },
  },
	data() {
  	return {
		  // is_new_hover_set: false
	  }
	},
	methods: {
		...mapMutations({
			addToCart: 'addToCart',
			removeToCart: 'removeToCart',
		}),
		decrementQuantity(product) {
			this.removeToCart(product)
			this.$forceUpdate()
		},
		incrementQuantity(product) {
			console.log('this.getState', this.getCart)
			console.log('this.product', product)
			this.addToCart(product)
			console.log('this.getCart2', this.getCart[product._id].quantity)
			// let sub_p_index = this.product.products.findIndex(sub_p => sub_p._id === product._id)
			// this.product.products[sub_p_index].quantity++
			this.$forceUpdate()
		},
	},
  computed: {
	  ...mapGetters({
		  getCart: 'getCart',
	  }),
  },
};
</script>
<style lang="scss" scoped>
	.sub_product_row {
		border-top: #4B5563 solid 1px;
		border-color: #4B5563;
	}

	.sub_product__title {
		color: #1b1b23;
		font-weight: 600;
		margin-bottom: 0px;
	}
	.sub_product__description {
		color: #4B5563;
		font-weight: 400;
	}
	.sub_product__quantity {
		justify-content: flex-end;
		margin: auto 1rem auto 1rem;
		text-align: end!important;
		font-weight: 600;
	}

	.sub_product__bullets {
		padding-left: 30px!important;
		margin-top: 0;
		margin-bottom: 0;
	}

	.add_circle_icon {
		height: 33px;
		width: 33px;
		border-width: 1px;
		border-color: hotpink;
		background-color: transparent;
	}
	.add_circle_icon_fill {
		border-color: hotpink;
		background-color: hotpink;
	}
	.sub_product_price {
		align-content: end;
		justify-content: flex-end;
		padding-right: 2px;
		text-align: end!important;
		font-weight: 600;
	}
</style>
