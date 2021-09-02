import Vue from 'vue'
import { dragscrollNext } from "vue-dragscroll";

Vue.directive('dragscroll', dragscrollNext);
Vue.directive('focus', {
	inserted: (el) => {
		el.focus()
	}
})
Vue.prototype.sleep = async function(ms) {
	return new Promise(resolve => {
		setTimeout(resolve, ms)
	})
}
