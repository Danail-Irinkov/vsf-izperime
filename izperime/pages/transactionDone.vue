<template>
	<div style="padding: 3rem;text-align: center; font-family: Helvetica;font-size: larger;opacity: 0.7;color: rgba(0,0,0,0.68);">
		<p>{{ $t('The transaction is being processed') }}</p>
		<p>{{ $t('Please Wait...') }}</p>
	</div>
</template>
<script>
import cacheControl from './../helpers/cacheControl';
import { SfImage } from '@storefront-ui/vue';
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';
import {mapGetters, mapMutations} from "vuex";
import { userState } from '~/composables';
import { useUiNotification } from '~/composables';
export default {
  name: 'TransactionDone',
  layout: 'app',
  middleware: cacheControl({
    'max-age': 60,
    'stale-when-revalidate': 5
  }),
  components: {
	  SfImage,
	  vSelect
  },
	async created() {
	},
	data() {
    return {
	    payment: this.$store.state.checkout.paymentDetails,
	    mangopay_transaction_id: ''
    }
  },
	async mounted() {
		if (this.$route.query.transactionId) {
			console.log('before window.opener.callPlaceOrder')
			window.opener.callPlaceOrder(this.$route.query.transactionId)

			setTimeout(() => { window.close() }, 3000)
		}
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
