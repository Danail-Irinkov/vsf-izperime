<template>
	<div class="services-top-nav smartphone-only">
		<div class="sf-top-bar__container" ref="top_menu_container">
			<div class="sf-top-bar__left" v-dragscroll>
				<div class="row" ref="menu_row" style="padding-right: 1rem;" :style="`width: ${getServiceNavWidth}px`">
			  <serviceItem label="tops" :index="0" ref="service0" class="color-light">
				  <template #icon>
					  ❤️
				  </template>
			  </serviceItem>
			  <serviceItem label="laundry" :index="1" ref="service1" class="color-light">
				  <template #icon>
					  ❤️2
				  </template>
			  </serviceItem>
			  <serviceItem label="bedding" :index="2" ref="service2" class="color-light">
				  <template #icon>
					  ❤️3
				  </template>
			  </serviceItem>
			  <serviceItem label="suits" :index="3" ref="service3" class="color-light">
				  <template #icon>
					  ❤️4
				  </template>
			  </serviceItem>
			  <serviceItem label="trousers" :index="4" ref="service4" class="color-light">
				  <template #icon>
					  ❤️5
				  </template>
			  </serviceItem>
				</div>
				<div class="row" :style="getHrWrapperStyles">
					<hr :style="getHrStyles">
				</div>
			</div>
		</div>
  </div>
</template>

<script>
import { useUiState } from '~/composables';
import ServiceItem from '~/components/izperime/ServiceItem';

import { userState } from '~/composables';

export default {
	name: 'ServiceNavigation',
  components: {
	  ServiceItem,
  },
  setup(props, { root }) {
    const { activeServiceCategory, hoverServiceCategory, toggleBasketSidebar, toggleWishlistSidebar, toggleLoginModal, toggleMobileMenu, isMobileMenuOpen } = useUiState();
    const { isAuthenticated } = userState();

    const handleAccountClick = async () => {
      if (isAuthenticated.value) {
        return root.$router.push('/my-account');
      }
      toggleLoginModal();
    };

    return {
	    activeServiceCategory,
	    hoverServiceCategory,
      isMobileMenuOpen,
      toggleWishlistSidebar,
	    toggleBasketSidebar,
      toggleMobileMenu,
      handleAccountClick
    };
  },
	data () {
		return {
			marginLeft: 0,
			sliceSize: 0,
			activeItemIndex: 0,
			is_mounted: false,
		}
	},
	async mounted () {
		this.init()
		this.sleep(100)
		this.$nextTick(()=>{
			this.is_mounted = true
			this.$forceUpdate()
		})
	},
	watch: {
		activeServiceCategory(index) {
			this.setUnderlinePosition(index)
		},
		hoverServiceCategory(index) {
			this.setUnderlinePosition(index)
		},
	},
	methods: {
		init () {
			this.sliceSize = this.getServiceButtonWidth(0)
			this.setUnderlinePosition (0)
		},
		setUnderlinePosition (index) {
			this.sliceSize = this.getServiceButtonWidth(index)
			let buttonWidthsBefore = this.getServiceButtonWidths.slice(0, index)
			// let buttonWidthsBefore = this.getServiceButtonWidths.length < index ? this.getServiceButtonWidths.slice(0, index) : this.getServiceButtonWidths
			let summedWidths = buttonWidthsBefore.reduce((a, b) => a + b, 0)
			this.marginLeft = summedWidths
		},
		getServiceButtonWidth (index) {
			let width = 0
			if (this.$refs['service'+index]) {
				let el = this.$refs['service'+index].$el
				let style = el.currentStyle || window.getComputedStyle(el);
				width = el.scrollWidth
				width += parseInt(style.marginLeft.replace('px', ''))
				width += parseInt(style.marginRight.replace('px', ''))
			}
			return width;
		},
	},
	computed: {
  	getServiceButtonWidths() {
  		let widths = []
  		let indexes = [0, 1, 2, 3, 4]
		  for (let i of indexes) {
			  widths.push(this.getServiceButtonWidth(i))
		  }
		  return widths
	  },
  	getServiceNavWidth() {
		  if (this.is_mounted)
			  return this.getServiceButtonWidths.reduce((a, b) => a + b, 0)
		  else
		  	return '632'
	  },
		getHrWrapperStyles () {
			let menuWidth = this.getServiceNavWidth

			return [
				{'height': `.25rem`},
				{'width': `${menuWidth}px`},
			]
		},
		getHrStyles () {
			return [
				{'height': `.25rem`},
				{'width': `${this.sliceSize}px`},
				{'margin-left': `${this.marginLeft}px`}
			]
		}
	}
};
</script>
<style lang="scss" scoped>
.navigation-bottom {
  --bottom-navigation-z-index: 3;
}
.services-top-nav {
	background-color: var(--c-light) !important;
	height: 60px;
	& > .sf-top-bar__container {
		height: 100% !important;
		flex-direction: column;
		align-items: start;
		padding-left: 5px;
	}
}

hr {
	/*padding-left: 1rem;*/
	/*padding-right: 1rem;*/
	display: block;
	align-self: flex-end;

	height: .25rem;
	margin: -2px 0 5px 0;
	background: #8e44ad;
	border-radius: 2px;
	border: none;
	transition: margin .3s cubic-bezier(0.250, 0.460, 0.450, 0.940);
}

.sf-top-bar__left {
	flex-direction: column;
	max-width: 100vw;
	overflow-y: hidden;
	overflow-x: auto;
	overflow-scrolling: touch;
	scrollbar-width: thin;
	align-items: self-start;
	/*overscroll-behavior-x: contain;*/
}
.sf-button {
	border-color: var(--c-light);
}
.sf-button.color-light {
	color: var(--c-light);
	&:hover {
		--button-background: var(--c-light) radial-gradient(circle, transparent 100%, var(--c-text-disabled) 1%) center/15000%;
	}
	&:active {
		--button-background: var(--c-light) radial-gradient(circle, transparent 100%, var(--c-text-disabled) 1%) center/15000%;
	}
	--button-box-shadow: none;
	--button-background: var(--c-light) radial-gradient(circle, transparent 100%, var(--c-light) 1%) center/15000%;
	--button-transition: background 0s;
	--button-text-decoration: none;
	background-size: 100%;
}
</style>

<style lang="scss">
	@import "~@storefront-ui/shared/styles/components/organisms/SfTopBar.scss";
</style>
