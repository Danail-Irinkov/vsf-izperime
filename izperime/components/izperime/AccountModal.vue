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
		    <div class="pointer" @click="openLoginModal('register')">
			    <SfIcon
				    icon="account"
				    :color="'hotpink'"
				    class="menu-icon"
			    />
			    <h4 class="active-hotpink menu-text"
			    >{{ $t('Create a new account') }}</h4>
		    </div>
		    <div class="pointer" @click="openLoginModal('login')">
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
		    <div class="pointer" @click="openOrdersModal">
			    <SfIcon
				    icon="list"
				    :color="'hotpink'"
				    class="menu-icon"
			    />
			    <h4 class="active-hotpink menu-text"
			    >{{ $t('Orders') }}</h4>
		    </div>
		    <div class="pointer" @click="toggleAddCardModal">
			    <SfIcon
				    icon="credits"
				    :color="'hotpink'"
				    class="menu-icon"
			    />
			    <h4 class="active-hotpink menu-text"
			    >{{ $t('Add a Card') }}</h4>
		    </div>
		    <div class="pointer" @click="logout">
			    <SfIcon
				    icon="logout"
				    :color="'hotpink'"
				    class="menu-icon"
			    />
			    <h4 class="active-hotpink menu-text"
			    >{{ $t('Logout') }}</h4>
		    </div>
	    </div>
	    <hr size="1px" style="width: 100%;position: absolute; left: 0;color: #2b313b"/>

	    <p class="section-title" style="margin-top: 25px">{{ $t('Our details')}}</p>

	    <div class="pointer">
		    <SfIcon
			    icon="question_mark"
			    :color="'hotpink'"
			    class="menu-icon"
		    />
		    <h4 class="active-hotpink menu-text"
		    >{{ $t('Help') }}</h4>
	    </div>
	    <div class="pointer">
		    <SfIcon
			    icon="info"
			    :color="'hotpink'"
			    class="menu-icon"
		    />
		    <h4 class="active-hotpink menu-text"
		    >{{ $t('Terms of service') }}</h4>
	    </div>
	    <div class="pointer">
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
	  const { isAccountModalOpen, toggleAccountModal, toggleLoginModal, toggleAddCardModal , toggleOrdersModal } = useUiState();
	  const { user, logout } = userState();

    return {
	    toggleAccountModal,
	    isAccountModalOpen,
	    toggleLoginModal,
	    toggleAddCardModal,
	    toggleOrdersModal,
	    user,
	    logout,
    };
  },
	methods: {
		closeServiceModal() {
			this.toggleAccountModal()
		},
		openLoginModal(action) {
			this.toggleLoginModal(action)
		},
		openOrdersModal() {
			this.toggleAccountModal()
			this.toggleOrdersModal()
		},
	},
	watch: {
		isAccountModalOpen(service){
  		if (service) {
  			this.currentBodyScroll = window.scrollY
			  // document.body.style.position = 'fixed';
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
