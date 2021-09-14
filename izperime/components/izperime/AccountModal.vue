<template>
	<SfModal
		v-e2e="'account-modal'"
		:visible="isAccountModalOpen"
		class="modal"
		transitionOverlay="sf-fade"
		transitionModal="our-collapse-bottom"
		@close="closeServiceModal"
	>
		<template #modal-bar>
			<SfBar
				class="sf-modal__bar"
				:close="true"
				:title="$t('Account')"
				@click:close="closeServiceModal"
			/>
		</template>
<!--    <transition name="sf-fade"-->
    <div name="sf-fade" mode="out-in">
      <p class="section-title">{{ $t('Your details')}}</p>
	    <div v-if="!user._id">
		    <div @click="openLoginModal('register')">
			    <SfIcon
				    icon="account"
				    :color="'hotpink'"
				    class="menu-icon"
			    />
			    <h4 class="active-hotpink menu-text"
			    >{{ $t('Create a new account') }}</h4>
		    </div>
		    <div @click="openLoginModal('login')">
			    <SfIcon
				    icon="login"
				    :color="'hotpink'"
				    class="menu-icon"
			    />
			    <h4 class="active-hotpink menu-text"
			    >{{ $t('Login') }}</h4>
		    </div>
	    </div>
	    <div v-else>
		    <div @click="toggleOrdersModal()">
			    <SfIcon
				    icon="login"
				    :color="'hotpink'"
				    class="menu-icon"
			    />
			    <h4 class="active-hotpink menu-text"
			    >{{ $t('Orders') }}</h4>
		    </div>
		    <div @click="toggleAddCardModal()">
			    <SfIcon
				    icon="login"
				    :color="'hotpink'"
				    class="menu-icon"
			    />
			    <h4 class="active-hotpink menu-text"
			    >{{ $t('Add a Card') }}</h4>
		    </div>
	    </div>
	    </div>
	    <hr size="1px" style="width: 100vw;position: absolute; left: 0;color: #2b313b"/>

	    <p class="section-title" style="margin-top: 25px">{{ $t('Our details')}}</p>

	    <div>
		    <SfIcon
			    icon="question_mark"
			    :color="'hotpink'"
			    class="menu-icon"
		    />
		    <h4 class="active-hotpink menu-text"
		    >{{ $t('Help') }}</h4>
	    </div>
	    <div>
		    <SfIcon
			    icon="info"
			    :color="'hotpink'"
			    class="menu-icon"
		    />
		    <h4 class="active-hotpink menu-text"
		    >{{ $t('Terms of service') }}</h4>
	    </div>
	    <div>
		    <SfIcon
			    icon="info_shield"
			    :color="'hotpink'"
			    class="menu-icon"
		    />
		    <h4 class="active-hotpink menu-text"
		    >{{ $t('Privacy Policy') }}</h4>
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
	SfBar,
} from '@storefront-ui/vue';
import { ref, watch, computed } from '@vue/composition-api';
import { productGetters } from '@vue-storefront/commercetools';
import { useUiState } from '~/composables';
import { userState } from '~/composables';
import { Collapse, CollapseItem } from 'element-ui'

export default {
  name: 'ServiceModal',
  components: {
    SfMegaMenu,
    SfImage,
	  SfModal,
	  SfIcon,
	  SfCircleIcon,
	  SfBar,
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
	  const { isAccountModalOpen, toggleAccountModal, toggleLoginModal, toggleAddCardModal } = useUiState();
	  const { user } = userState();

    return {
	    toggleAccountModal,
	    isAccountModalOpen,
	    toggleLoginModal,
	    toggleAddCardModal,
	    user,
    };
  },
	methods: {
		closeServiceModal() {
			this.toggleAccountModal()
		},
		openLoginModal(action) {
			this.toggleLoginModal(action)
		},
		toggleOrdersModal() {
			this.toggleLoginModal()
		},
	},
	watch: {
		isAccountModalOpen(service){
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
<!--<style lang="scss">-->
<!--	@import "assets/scss/animations";-->
<!--</style>-->
<style lang="scss" scoped>
	.menu-icon {
		display: inline-block;
		font-weight: 600;
		height: 25px;
		width: 25px;
		margin: 4px;
		vertical-align: top;
	}
	.menu-text {
		margin-left: 15px;
		width: calc(100% - 57px);
		line-height: 33px;
		display: inline-block;
		vertical-align: text-bottom;
		color: #7f828b;
	}
	.section-title {
		font-weight: 600;
		color: #4B5563;
	}
</style>
