<template>
  <div id="home" class="home-screen">
	  <div class="w-100 h-100 vertical-align-container" v-if="!appReady">
		  <transition name="sf-fade" mode="out-in">
			  <img src="/icons/logolaundr.png"
			       v-if="showLogo"
			           alt="Logo"
			           class="logo"/>
		  </transition>
	  </div>
	  <div class="w-100 h-100 vertical-align-container" v-else>
		  <transition name="sf-fade" mode="out-in">
			  <div class="vertical-align-child" v-if="appReady"
			       style="transition-duration: 300ms">
				  <v-select
					  class="initial-city-select"
					  v-model="city"
					  id="city"
					  name="city"
					  :placeholder="$t('City')"
					  :options="cities"
					  :searchable="false"
					  :clearable="false"
					  @input="citySelected"
				  >
				  </v-select>
			  </div>
		  </transition>
	  </div>
  </div>
</template>
<script>
import cacheControl from './../helpers/cacheControl';
import { SfImage } from '@storefront-ui/vue';
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';
import {mapGetters, mapMutations} from "vuex";
export default {
  name: 'Home',
  layout: 'blank',
  middleware: cacheControl({
    'max-age': 60,
    'stale-when-revalidate': 5
  }),
  components: {
	  SfImage,
	  vSelect
  },
  data() {
    return {
	    appReady: false,
	    showLogo: false,
	    country: 'Bulgaria',
	    city: '',
	    cities: ['Sofia', 'Varna']
    }
  },
	async mounted() {
		this.city = String(this.getCity)
  	await this.sleep(500)
		this.showLogo = true
  	await this.sleep(2000)
		this.appReady = true
	},
	methods: {
		...mapMutations({
			setCity: 'setCity',
		}),
		citySelected() {
			console.log('citySelected Started')
			this.setCity(String(this.city))
			this.$router.push({path: 'servicelist'});
		}
  },
	computed: {
		...mapGetters({
			getCity: 'getCity',
		}),
	}
};
</script>

<style lang="scss" scoped>
#home {
  box-sizing: border-box;
  padding: 0 var(--spacer-sm);
  @include for-desktop {
    max-width: 1240px;
    padding: 0;
    margin: 0 auto;
  }
}
.home-screen {
	background-color: teal;
	height: 100vh;
	width: 100vw;
	display: flex;
	justify-content: center;
	vertical-align: center;

}
.vertical-align-container {
	display: flex;
	justify-content: center;
	position: relative;
	height: 100%;
	background-color: transparent;
	& > img.logo {
		height: auto;
		width: 60vw;
		max-width: 220px;
		transition-duration: 600ms;
		background-color: transparent;
		margin: 0;
		position: absolute;
		top: 50%;
		-ms-transform: translateY(-100%);
		transform: translateY(-100%);
	}
}
.fade-enter-active, .fade-leave-active {
	transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
	opacity: 0
}
::v-deep  .initial-city-select {
	width: 80vw;
	max-width: 320px;
	padding: 0;
	margin: 0;
	background-color: transparent;
	font-size: 2rem;
	line-height: 3rem;
	height: 3.6rem;
	text-align: center;
	color: white;
	& > .vs__dropdown-toggle {
		border-color: rgba(255, 255, 255, 0.5);
		border-top: 0;
		border-left: 0;
		border-right: 0;
		border-radius: 0;
	}
	& > .vs__dropdown-menu {
		background-color: transparent;
		text-align: center;
		color: white;
		& > li {
			text-align: center;
			color: white;
		}
	}
}
::v-deep .vs__dropdown-option--highlight {
	background: rgba(146, 234, 251, 0.58);
}
::v-deep .vs__open-indicator {
	fill: rgba(255, 255, 255, 0.5);
}
::v-deep .vs__selected-options {
	max-height: 46px;
}
::v-deep .vs__selected {
	text-align: center;
	color: white;
	display: block;
	width: 100%;
}
::v-deep .vs__search {
	color: rgba(255, 255, 255, 0.5);
}
</style>
