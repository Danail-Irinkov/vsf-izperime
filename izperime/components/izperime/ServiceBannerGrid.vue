<template>
  <div class="sf-banner-grid">
    <template v-if="bannerGrid === 1">
      <div class="sf-banner-grid__row">
        <div class="sf-banner-grid__col">
          <slot/>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  name: "SfBannerGrid",
  props: {
    bannerGrid: {
      type: Number,
      default: 1,
    },
  },
};
</script>
<style lang="scss">
@import "~@storefront-ui/shared/styles/components/organisms/SfBannerGrid.scss";
</style>
