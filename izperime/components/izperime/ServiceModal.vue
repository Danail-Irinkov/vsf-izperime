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
		      <h4 class="products_title">
			      {{ $t(service.title) }}
		      </h4>
		      <div v-for="product in service.products">
			      <BasketProduct :product="product"></BasketProduct>
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
import BasketProduct  from '~/components/izperime/BasketProduct';
import { Collapse, CollapseItem } from 'element-ui'
import { mapMutations, mapGetters } from 'vuex'

export default {
  name: 'ServiceModal',
  components: {
    SfMegaMenu,
    SfImage,
	  SfModal,
	  SfIcon,
	  SfCircleIcon,
	  BasketProduct,
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
	::v-deep .sf-modal__container {
	}
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

	.product__description {
		margin-bottom: 14px;
		color: #1b1b23;
		font-weight: 600;
	}
	.products_title {
		color: #828282;
		font-weight: 800;
	}
	p {
		margin-top: 8px;
		margin-bottom: 8px;
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
