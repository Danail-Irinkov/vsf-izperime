<template>
  <section class="sf-banner" :style="style" v-on="$listeners">
    <component :is="wrapper" class="sf-banner__wrapper" :link="banner.link">
      <slot name="offer">
        <h2 v-if="banner.offer_text" class="sf-banner__offer">
          {{ banner.offer_text }}
        </h2>
      </slot>
      <slot name="title">
	      <div style="display: block; align-content: space-between">
	        <h1 v-if="banner.title" class="sf-banner__title">
	          {{ banner.title }}
	        </h1>
		      <h2 v-if="banner.price" class="sf-banner__price">
			      {{ $t('from')}} €{{ banner.price }}
		      </h2>
	      </div>
      </slot>
    </component>
  </section>
</template>
<script>
import SfButton from "@storefront-ui/vue/src/components/atoms/SfButton/SfButton.vue";
import SfLink from "@storefront-ui/vue/src/components/atoms/SfLink/SfLink.vue";
import {
  mapMobileObserver,
  unMapMobileObserver,
} from "@storefront-ui/vue/src/utilities/mobile-observer";
export default {
  name: "SfBanner",
  components: {
    SfButton,
    SfLink,
  },
  props: {
    banner: {
      type: Object,
      default: ()=>{},
    }
  },
	data() {
  	return {
		  offer_text: 'Five Shirts',
		  price: 15,
	  }
	},
  computed: {
    ...mapMobileObserver(),
    style() {
    	let styles = {}
      const image = this.banner.image;
      const background = this.banner.background;
	    styles = {
        "--_banner-background-image": image.mobile
          ? `url(${image.mobile})`
          : `url(${image})`,
        "--_banner-background-desktop-image":
          image.desktop && `url(${image.desktop})`,
        "--_banner-background-color": background,
      };
	    return styles
    },
    wrapper() {
      return !this.isMobile ? "div" : this.banner.link ? "SfLink" : "SfButton";
    },
  },
  beforeDestroy() {
    unMapMobileObserver();
  },
};
</script>
<style lang="scss">
@import "~@storefront-ui/shared/styles/components/molecules/SfBanner.scss";
.sf-banner {
	height: calc((100vh - 120px)/3);
	min-height: 175px;
}
.sf-banner__wrapper {
	padding: 0;
	align-self: flex-end;
	position: relative;
	bottom: 0;
	margin-bottom: 1rem;
}
.sf-banner__offer {
	background-color: orangered;
	border-radius: 0 5px 5px 0;
	color: white;
	padding: 3px 10px 3px 10px;
	margin-bottom: 1rem;
	font-style: normal;
	font-weight: 400;
	text-transform: uppercase;
	font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace !important;
	font-size: 16px;
	letter-spacing: 2px;
}
.sf-banner__price {
	display: inline-block;
	background-color: white;
	position: absolute;
	right: 0px;
	border-radius: 5px 0 0 5px;
	color: black;
	padding: 3px 1rem 3px 1rem;
	font-style: normal;
	font-weight: 400;
	font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace !important;
	font-size: 18px;
	letter-spacing: 1px;
}
.sf-banner__title {
	display: inline-block;
	text-transform: none;
	margin: 0 0 4px 1rem;
}
</style>
