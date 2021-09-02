<template>
	<SfModal
		v-e2e="'service-modal'"
		:visible="!!currentServiceModal"
		class=""
		transitionOverlay="sf-fade"
		transitionModal="our-collapse-bottom"
		@close="closeServiceModal"
	>
		<template #modal-bar>
			<SfCircleIcon
				:class="'back-button color-info'"
				:aria-label="$t('Go back')"
				:style="{margin: '.5rem'}"
				@click="closeServiceModal">
				<SfIcon
					icon="arrow_left"
					color="white"
					size="25px"
					:style="{margin: '0 0 0 -2px'}"
				/>
			</SfCircleIcon>
			<div
				v-if="service && service.image && service.image.mobile"
				ref="serviceImage"
				class="service-image"
				:style="style"
				:src="service.image.mobile"
				:alt="service.title"
				:lazy="false"
			/>
		</template>
<!--    <transition name="sf-fade"-->
    <div name="sf-fade" mode="out-in">
      <div class="service-dialog-wrapper" v-if="!!service">
	      <p class="product__description">
		      {{ $t(service.description) }}
	      </p>
	      <div>
		      <h4 class="sub_products_title">
			      {{ $t(service.title) }}
		      </h4>
		      <div v-for="sub_p in service.sub_products" class="row sub_product_row">
			      <hr size="1px" style="width: 100vw;position: absolute; left: 0; color: #4B5563"/>
			      <div class="column" style="flex-grow: 1; margin-top: 6px">
				      <p class="sub_product__title">
					      {{ $t(sub_p.title) }}
				      </p>
				      <p class="sub_product__description" v-if="sub_p.description">
					      {{ $t(sub_p.description) }}
				      </p>
				      <ul class="sub_product__bullets" v-if="sub_p.bullets">
					      <li v-for="bullet of sub_p.bullets">
						      {{ $t(bullet)}}
					      </li>
				      </ul>
			      </div>
			      <div class="column" style="flex-shrink: 1; min-width: 107px; margin-top: 6px">
				      <p class="sub_product_price" style="text-align: end">
					      {{ $t(sub_p.price) }}€
				      </p>
				      <div class="row align-end" style="text-align: end">
					      <SfCircleIcon
						      v-if="sub_p.quantity"
						      class="add_circle_icon"
						      :class="{'add_circle_icon_fill': sub_p.quantity}"
						      :aria-label="$t('Remove')"
						      :style="{margin: '.5rem'}"
						      @click="decrementQuantity(sub_p)">
						      <SfIcon
							      icon="minus"
							      :color="sub_p.quantity ? 'white' : 'hotpink'"
							      size="16px"
						      />
					      </SfCircleIcon>
					      <p class="sub_product__quantity"
					         v-if="sub_p.quantity">
						      {{ $t(sub_p.quantity) }}
					      </p>
					      <SfCircleIcon
						      class="add_circle_icon"
						      :class="{'add_circle_icon_fill': sub_p.quantity}"
						      :aria-label="$t('Add')"
						      :style="{margin: '.5rem'}"
						      @click="incrementQuantity(sub_p)">
						      <SfIcon
							      icon="plus"
							      :color="sub_p.quantity ? 'white' : 'hotpink'"
							      size="16px"
						      />
					      </SfCircleIcon>
				      </div>
			      </div>
		      </div>
	      </div>
	      <div v-if="service.faqs && service.faqs.length">
		      <hr size="1px" style="width: 100vw;position: absolute; left: 0; margin-top: -14px;color: #2b313b"/>
		      <p class="product__faqs">
			      {{ $t('FAQ') }}
		      </p>

		      <collapse class="faq-collapse">
			      <collapse-item v-for="faq of service.faqs"
	                         :key="faq.question">
				      <template #title style="height: 28px">
					      <SfIcon
						      icon="chevron_right"
						      :color="'hotpink'"
						      style="display: inline-block;height: 20px;width: 20px;margin: 4px;vertical-align: top;"
					      />
					      <h4 style="width: calc(100% - 32px);display: inline-block; vertical-align: text-bottom;"
					          class="active-hotpink"
					      >{{ $t(faq.question) }}</h4>
				      </template>
				      <template #default>
					      <p class="faq-answer" style="padding-left: 30px">
					        {{ $t(faq.answer) }}
					      </p>
				      </template>
			      </collapse-item>
		      </collapse>
	      </div>
      </div>
    </div>
	</SfModal>
</template>
<script>
import {
  SfMegaMenu,
	SfImage,
	SfModal,
	SfIcon,
	SfCircleIcon,
} from '@storefront-ui/vue';
import { ref, watch, computed } from '@vue/composition-api';
import { productGetters } from '@vue-storefront/commercetools';
import { useUiState } from '~/composables';
import { Collapse, CollapseItem } from 'element-ui'

export default {
  name: 'ServiceModal',
  components: {
    SfMegaMenu,
    SfImage,
	  SfModal,
	  SfIcon,
	  SfCircleIcon,
	  Collapse, CollapseItem,
  },
  props: {
  },
	data() {
  	return {
		  currentBodyScroll: 0
	  }
	},
  setup(props, { emit }) {
	  const { currentServiceModal, setServiceModal } = useUiState();

    return {
	    setServiceModal,
	    currentServiceModal,
    };
  },
	methods: {
		closeServiceModal() {
			this.setServiceModal(null)
		},
		decrementQuantity(product) {
			product.quantity--
			this.$forceUpdate()
			// let sub_p_index = this.product.sub_products.findIndex(sub_p => sub_p._id === product._id)
			// this.product.sub_products[sub_p_index].quantity--
		},
		incrementQuantity(product) {
			if(!product.quantity) product.quantity = 0
			product.quantity++
			this.$forceUpdate()
			// let sub_p_index = this.product.sub_products.findIndex(sub_p => sub_p._id === product._id)
			// this.product.sub_products[sub_p_index].quantity++
		},
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
		service() {
			return this.currentServiceModal
		},
		style() {
			let styles = {}
			const image = this.service.image;
			const background = this.service.background;
			styles = {
				"background-image": image.mobile
					? `url(${image.mobile})`
					: `url(${image})`,
				"-background-desktop-image":
					image.desktop && `url(${image.desktop})`,
				"-background-color": background,
			};
			return styles
		},
	}
};
</script>
<style lang="scss">
	@import "assets/scss/animations";
</style>
<style lang="scss" scoped>
	.service-modal {
		height: 100vh;
		overflow-y: hidden;
	}
	.back-button {
		position: absolute;
		top: 20px;
		left: 20px;
		/*border-radius: 50%;*/
		/*background-color: cadetblue;*/
		/*height: 25px;*/
		/*width: 25px;*/
	}
.service-image {
	width: 100%;
	height: calc((100vh - 107px)/3.3);
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
}

	.sub_product_row {
		border-top: 1px;
		border-color: #4B5563;

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
	.product__description {
		margin-bottom: 14px;
		color: #1b1b23;
		font-weight: 600;
	}
	.sub_product__title {
		color: #1b1b23;
		font-weight: 600;
		margin-bottom: 0px;
	}
	.sub_products_title {
		color: #828282;
		font-weight: 800;
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
	.align-end {
		align-content: end;
		justify-content: flex-end;
		text-align: end!important;
	}
	p {
		margin-top: 8px;
		margin-bottom: 8px;
	}
	.sub_product__bullets {
		padding-left: 30px!important;
		margin-top: 0;
		margin-bottom: 0;
	}
	.product__faqs {
		margin-top: 28px;
		font-weight: 600;
		color: #7f828b;
	}
	.hotpink {
		color: hotpink;
	}
	.is-active > .active-hotpink {
		color: hotpink;
	}
	::v-deep .el-collapse-item__header {
		cursor: pointer;
	}
	::v-deep .sf-modal__content {
		padding-top: 10px;
	}
	::v-deep .sf-modal__container {
		transition-duration: 400ms
	}
	::v-deep .service-dialog-wrapper {
		transition-duration: 100ms
	}
</style>
