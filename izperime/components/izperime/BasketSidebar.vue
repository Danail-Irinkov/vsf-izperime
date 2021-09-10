<template>
  <div id="cart">
    <SfSidebar
      v-e2e="'basket-sidebar'"
      :visible="isBasketSidebarOpen"
      :persistent="true"
      title="Basket"
      class="sf-sidebar--right"
      @close="toggleBasketSidebar"
    >
      <template #content-top>
	      <transition name="sf-fade" mode="out-in">
		      <div>
			      <ShippingAddressBasket
				      :address="activeAddress"/>

			      <hr size="1px" style="width: 100vw;position: absolute; left: 0; color: #4B5563"/>

			      <BasketDeliverySlots style="margin: 2rem 0"
				      :deliverySlots="deliverySlots"/>

<!--			      <hr size="1px" style="width: 100vw;position: absolute; left: 0; margin-top: -14px;color: #4B5563"/>-->

			      <BasketItems style="margin: 2rem 0"/>

			      <AddressInput
				      v-model="cleaningInstructions"
				      :valid="!!cleaningInstructions"
				      name="streetName"
				      :label="$t('Cleaning Instructions (optional)')"
			      />
		      </div>
	      </transition>
      </template>
      <template #content-bottom>
        <transition name="sf-fade">
          <div v-if="cartCount">
            <SfProperty
              name="Subtotal price"
              class="sf-property--full-width sf-property--large my-cart__total-price"
            >
              <template #value>
                <SfPrice
                  :regular="$n(parseFloat(cartAmount), 'currency')"
                  :special="(totals.special !== totals.subtotal) ? $n(totals.special, 'currency') : 0"
                />
              </template>
            </SfProperty>
            <SfButton
              v-e2e="'go-to-checkout-btn'"
              class="sf-button--full-width place-order-button color-izperime"
              @click="placeOrder"
            >
              {{ $t('Place Order') }}
            </SfButton>
          </div>
          <div v-else>
            <SfButton
              class="sf-button--full-width place-order-button color-info"
              @click="toggleBasketSidebar"
            >{{ $t('Go back shopping') }}</SfButton
            >
          </div>
        </transition>
      </template>
    </SfSidebar>
  </div>
</template>
<script>
import {
  SfSidebar,
  SfButton,
  SfProperty,
  SfPrice,
} from '@storefront-ui/vue';
import ShippingAddressBasket from '~/components/izperime/ShippingAddressBasket';
import BasketDeliverySlots from '~/components/izperime/BasketDeliverySlots';
import AddressInput from '~/components/izperime/AddressInput.vue';
import BasketItems from '~/components/izperime/BasketItems';
import { computed } from '@vue/composition-api';
import { useCart, useUser, cartGetters } from '@vue-storefront/commercetools';
import { useUiState } from '~/composables';
import {mapGetters} from "vuex";
import { userState } from '~/composables';
import { useUiNotification } from '~/composables';

export default {
  name: 'Basket',
  components: {
	  ShippingAddressBasket,
	  BasketDeliverySlots,
	  BasketItems,
	  AddressInput,
    SfSidebar,
    SfButton,
    SfProperty,
    SfPrice,
  },
  setup() {
    const { isBasketSidebarOpen, toggleBasketSidebar, toggleLoginModal } = useUiState();
    const { cart, removeItem, updateItemQty, load: loadCart, loading } = useCart();
    const { isAuthenticated, addNewOrder } = userState();
    const products = computed(() => cartGetters.getItems(cart.value));
    const totals = computed(() => cartGetters.getTotals(cart.value));
    const totalItems = computed(() => cartGetters.getTotalItems(cart.value));
    loadCart();

    return {
      loading,
      isAuthenticated,
	    addNewOrder,
      products,
      removeItem,
      updateItemQty,
      isBasketSidebarOpen,
	    toggleBasketSidebar,
	    toggleLoginModal,
      totals,
      totalItems,
      cartGetters
    };
  },
	data() {
  	return {
		  activeAddress: {
			  id: '',
			  firstName: '',
			  lastName: '',
			  streetName: '',
			  apartment: '',
			  phone: '',
			  deliveryNotes: '',
		  },
		  deliverySlots: {
			  collection: {},
			  delivery: {}
		  },
		  cleaningInstructions: ''
	  }
	},
	methods: {
		async placeOrder() {
			try {
				console.log('placeOrder Start')
				if(!this.isAuthenticated) {
					this.toggleLoginModal()
					return
				}

				let order_data = await this.prepareProCCOrder()
				console.log('order_data------------ placeProCCOrder', order_data)

				let result = await this.addNewOrder(order_data)

				if (result.data.message_type === 'success') {
					await this.ProCCOrderPayment(result.data.order_ids)
				} else {
					throw new Error(result.data.message)
				}


			} catch (e) {
				console.log('placeOrder Err:', e)
			}
		},
		prepareProCCOrder() {
			let order_data = {
				cart: this.getCart()
			}
			return order_data
		},
		async ProCCOrderPayment (order_ids) {
			// console.log('this.getTotals: ', this.getTotals)
			let amount
			for (let segment of this.getTotals) {
				if (segment.code === 'grand_total') {
					amount = segment.value
				}
			}
			let data = {
				total_amount: amount,
				order_ids,
				BrowserInfo: this.getBrowserInfo()
			}
			this.VSFOrderPayment(data)
				.then(async (response) => {
				if (response.data.payIn_result && response.data.payIn_result.RedirectURL) {
					let newWin = window.open(response.data.payIn_result.RedirectURL, 'popUpWindow', 'height=700,width=800,left=0,top=0,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes')
					if (!newWin || newWin.closed || typeof newWin.closed === 'undefined') {
						useUiNotification().send({ type: 'warning', message: this.$t('Please allow the popup window') });

					} else {
						console.log('newWin.onClose Set for payment popUp')
						let eventBusEmit = (event) => this.Vue.$emit(event)
						let timer = setInterval(() => {
							if (newWin.closed) {
								clearInterval(timer)
								eventBusEmit('notification-progress-stop')
							}
						}, 500)
					}
				} else {
					useUiNotification().send({ type: 'warning', message: this.$t('Something went Wrong :(') });
				}
			}).catch(err => {
				console.error(err, 'Transaction failed')
				useUiNotification().send({ type: 'warning', message: this.$t('Something went Wrong :(') });
			})
		},
		getBrowserInfo () {
			return {
				JavaEnabled: navigator.javaEnabled(),
				Language: navigator.language || navigator.userLanguage,
				ColorDepth: screen.colorDepth,
				ScreenHeight: screen.height,
				ScreenWidth: screen.width,
				TimeZoneOffset: new Date().getTimezoneOffset().toString(),
				UserAgent: navigator.userAgent,
				JavascriptEnabled: true
			}
		},
	},
	computed: {
		...mapGetters({
			getCart: 'getCart',
			cartCount: 'cartCount',
			cartAmount: 'cartAmount',
		}),
	},
};
</script>

<style lang="scss" scoped>
::v-deep .sf-sidebar--right > .sf-sidebar__aside {
	overflow-y: auto;
	overflow-x: hidden;
}
#cart {
  --sidebar-z-index: 3;
  --overlay-z-index: 3;
  @include for-desktop {
    & > * {
      --sidebar-bottom-padding: var(--spacer-base);
      --sidebar-content-padding: var(--spacer-base);
    }
  }
}
.cart-summary {
  margin-top: var(--spacer-xl);
}
.my-cart {
  flex: 1;
  display: flex;
  flex-direction: column;
  &__total-items {
    margin: 0;
  }
  &__total-price {
    --price-font-size: var(--font-size--xl);
    --price-font-weight: var(--font-weight--medium);
    margin: 0 0 var(--spacer-base) 0;
  }
}
.empty-cart {
  --heading-description-margin: 0 0 var(--spacer-xl) 0;
  --heading-title-margin: 0 0 var(--spacer-xl) 0;
  --heading-title-color: var(--c-primary);
  --heading-title-font-weight: var(--font-weight--semibold);
  display: flex;
  flex: 1;
  align-items: center;
  flex-direction: column;
  &__banner {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    flex: 1;
  }
  &__heading {
    padding: 0 var(--spacer-base);
  }
  &__image {
    --image-width: 16rem;
    margin: 0 0 var(--spacer-2xl) 7.5rem;
  }
  @include for-desktop {
    --heading-title-font-size: var(--font-size--xl);
    --heading-title-margin: 0 0 var(--spacer-sm) 0;
  }
}
.collected-product-list {
  flex: 1;
}
.collected-product {
  margin: 0 0 var(--spacer-sm) 0;
  &__properties {
    margin: var(--spacer-xs) 0 0 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    flex: 2;
    &:first-child {
      margin-bottom: 8px;
    }
  }
  &__actions {
    transition: opacity 150ms ease-in-out;
  }
  &__save,
  &__compare {
    --button-padding: 0;
    &:focus {
      --cp-save-opacity: 1;
      --cp-compare-opacity: 1;
    }
  }
  &__save {
    opacity: var(--cp-save-opacity, 0);
  }
  &__compare {
    opacity: var(--cp-compare-opacity, 0);
  }
  &:hover {
    --cp-save-opacity: 1;
    --cp-compare-opacity: 1;
    @include for-desktop {
      .collected-product__properties {
        display: none;
      }
    }
  }
}
	.place-order-button {
		position: fixed;
		bottom: 8px;
		width: 90vw;
		border-radius: 5px;
		padding-top: 5px;
		padding-bottom: 5px;
	}
</style>
