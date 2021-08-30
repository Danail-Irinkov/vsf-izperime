<template>
  <section class="sf-banner" :style="style" v-on="isMobile ? $listeners : {}">
    <component :is="wrapper" class="sf-banner__wrapper" :link="link">
<!--      <slot name="subtitle" v-bind="{ subtitle }">-->
<!--        <h2 v-if="subtitle" class="sf-banner__subtitle">-->
<!--          {{ subtitle }}-->
<!--        </h2>-->
<!--      </slot>-->
      <slot name="offer" v-bind="{ offer_text }">
        <h2 v-if="offer_text" class="sf-banner__offer">
          {{ offer_text }}
        </h2>
      </slot>
	    <slot name="price" v-bind="{ price }">
		    <h2 v-if="price" class="sf-banner__price">
			    {{ $t('from')}} €{{ price }}
		    </h2>
	    </slot>
      <slot name="title" v-bind="{ title }">
        <h1 v-if="title" class="sf-banner__title">
          {{ title }}
        </h1>
      </slot>
<!--      <slot name="description" v-bind="{ description }">-->
<!--        <p v-if="description" class="sf-banner__description">-->
<!--          {{ description }}-->
<!--        </p>-->
<!--      </slot>-->
<!--      <slot name="call-to-action" v-bind="{ buttonText }">-->
<!--        <SfButton-->
<!--          v-if="buttonText && !isMobile"-->
<!--          :link="link"-->
<!--          class="sf-banner__call-to-action color-secondary"-->
<!--          v-on="!isMobile ? $listeners : {}"-->
<!--        >-->
<!--          {{ buttonText }}-->
<!--        </SfButton>-->
<!--      </slot>-->
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
    /**
     * Banner title
     */
    title: {
      type: String,
      default: "",
    },
    /**
     * Banner subtitle (at the top)
     */
    subtitle: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    /** text that will be displayed inside the button. You can replace the button  with "call-to-action" slot */
    buttonText: {
      type: String,
      default: "",
    },
    /** link to be used in call to action button if necessary */
    link: {
      type: String,
      default: "",
    },
    /** Background color in HEX (eg #FFFFFF) */
    background: {
      type: String,
      default: "",
    },
    /** Background image. Influenced by $banner-background-size, $banner-background-position CSS props. */
    image: {
      type: [String, Object],
      default: "",
    },
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
      const image = this.image;
      const background = this.background;
      return {
        "--_banner-background-image": image.mobile
          ? `url(${image.mobile})`
          : `url(${image})`,
        "--_banner-background-desktop-image":
          image.desktop && `url(${image.desktop})`,
        "--_banner-background-color": background,
      };
    },
    wrapper() {
      return !this.isMobile ? "div" : this.link ? "SfLink" : "SfButton";
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
	font-style: normal;
	font-weight: 400;
	text-transform: uppercase;
	font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace !important;
	font-size: 16px;
	letter-spacing: 2px;
}
.sf-banner__price {
	background-color: white;
	margin-left: auto;
	border-radius: 5px 0 0 5px;
	color: black;
	padding: 3px 1rem 3px 1rem;
	font-style: normal;
	font-weight: 400;
	font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace !important;
	font-size: 16px;
	letter-spacing: 1px;
}
.sf-banner__title {
	text-transform: none;
	margin-left: 1rem;
}
</style>
