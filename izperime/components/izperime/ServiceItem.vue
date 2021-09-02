<template>
  <component
    :is="componentIs"
    class="service-menu-item"
    :class="{'underline-menu-item': isActive}"
    v-bind="bind"
    :data-testid="label"
    v-on="$listeners"
    @click="setActiveCategory(index)"
    @mouseover.stop="setHoverCategoryAsync(index)"
    @mouseleave.stop="unsetHoverCategoryAsync(index)"
  >
    <!-- @slot for menu item icon-->
    <slot name="icon" />

    <!-- @slot for menu item label-->
    <slot name="label" v-bind="{ label }">
      <span class="sf-menu-item__label">{{ label }}</span>
    </slot>
  </component>
</template>
<script>
import { useUiState } from '~/composables';
import { sleep } from '~/helpers/globalFuncs';
import SfIcon from "@storefront-ui/vue/src/components/atoms/SfIcon/SfIcon.vue";
import SfLink from "@storefront-ui/vue/src/components/atoms/SfLink/SfLink.vue";
import SfButton from "@storefront-ui/vue/src/components/atoms/SfButton/SfButton.vue";
export default {
  name: "SfMenuItem",
  components: {
    SfIcon,
    SfLink,
    SfButton,
  },
  props: {
	  index: {
		  type: Number,
		  default: 0,
	  },
    /**
     * Menu-item active focused
     */
    isActive: {
      type: Boolean,
      default: true,
    },
    /**
     * Menu-item label
     */
    label: {
      type: String,
      default: "",
    },
    /**
     * Menu-item icon (visible on mobile)
     */
    icon: {
      type: [String, Array],
      default: "chevron_right",
    },
    /**
     * Menu-item count of items
     */
    count: {
      type: [String, Number],
      default: "",
    },
    /**
     * Menu-item link (if is empty then SfMenuItem is SfButton)
     */
    link: {
      type: [String, Object],
      default: "",
    },
  },
	setup() {
		const { setActiveCategory, setHoverCategory, unsetHoverCategory, is_new_hover_set, setNewHoverSet } = useUiState();

		return {
			setActiveCategory,
			setHoverCategory,
			unsetHoverCategory,
			is_new_hover_set,
			setNewHoverSet
		};
	},
	data() {
  	return {
		  // is_new_hover_set: false
	  }
	},
	methods: {
		async setHoverCategoryAsync (index) {
			this.setNewHoverSet(true)
			return this.setHoverCategory(index)
		},
		async unsetHoverCategoryAsync (index) {
			this.setNewHoverSet(false)
			await sleep(88)  //delaying animation to wait for user to move
			if (this.is_new_hover_set === false)
				this.unsetHoverCategory(index)
		}
	},
  computed: {
    bind() {
      const bind = {};
      if (this.link) {
        bind.link = this.link;
      } else {
        bind.class = "sf-button--pure";
      }
      return bind;
    },
    componentIs() {
      return this.link ? "SfLink" : "SfButton";
    },
  },
};
</script>
<style lang="scss">
@import "~@storefront-ui/shared/styles/components/molecules/SfMenuItem.scss";
	.sf-menu-item__label {
		display: block;
		width: 100%;
	}
	.service-menu-item {
		background-color: transparent;
		margin: 5px 10px 0px 10px;
		padding: 5px;
		flex-direction: column;
	}
</style>
