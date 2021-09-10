import Vue from 'vue'
export const state = () => ({
	user: {},
	user_token: '',
	city: '',
	cart: {},
	timeslots: {
		collection: {
			selectedDate: 0,
			selectedDay: 0,
			selectedTimeslot: {},
		},
		delivery: {
			selectedDate: 0,
			selectedDay: 0,
			selectedTimeslot: {},
		}
	}
})

export const getters = {
	getUser(state) {
		return state.user
	},
	getUserToken(state) {
		return state.user_token
	},
	getCity(state) {
		return state.city
	},
	getTimeSlots(state) {
		return state.timeslots
	},
	getCart(state) {
		console.log('getCart state', state)
		return state.cart
	},
	cartCount(state) {
		let cartCount = 0
		for (let key in state.cart) {
			let item = state.cart[key]
			cartCount += item.quantity
		}
		return cartCount
	},
	cartAmount(state) {
		let cartAmount = 0
		for (let key in state.cart) {
			let item = state.cart[key]
			cartAmount += item.price * item.quantity
		}
		return cartAmount
	}
}
export const mutations = {
	setCity(state, city) {
		Vue.set(state, 'city', city)
	},
	addToCart(state, product) {
		console.log('addToCart state', state)
		console.log('addToCart product', product)
		if (!product._id) throw 'No Product Id Provided'
		if (!state.cart[product._id])
			state.cart[product._id] = product

		if(!state.cart[product._id].quantity) state.cart[product._id].quantity = 0

		state.cart[product._id].quantity++
		Vue.set(state, 'cart', {...state.cart})
	},
	removeToCart(state, product) {
		if (!product._id) throw 'No Product Id Provided'
		if (!state.cart[product._id]) return

		state.cart[product._id].quantity--
		if (!state.cart[product._id].quantity)
			delete state.cart[product._id]

		Vue.set(state, 'cart', {...state.cart})
	},
	setTimeSlots(state, timeslots) {
		Vue.set(state, 'timeslots', timeslots)
	}
}
