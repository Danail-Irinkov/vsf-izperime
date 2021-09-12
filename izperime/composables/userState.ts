import Vue from 'vue';
import VueCompositionAPI, { reactive, computed } from '@vue/composition-api';
import procc_api from '../helpers/procc_api.js'
// We need to register it again because of Vue instance instantiation issues
Vue.use(VueCompositionAPI);
let apiClient = procc_api()

const state = reactive({
	user: {_id: ''},
	authToken: '',
	loading: false,
	userError: {login: '', register: ''},
	forgotPasswordError: {request: ''},
	forgotPasswordLoading: false,
});

const userState = () => {
	const setAuthToken = (token) => {
		// console.log('setAuthToken data', token)
		state.authToken = token
		apiClient = procc_api(token)
	};
	const user = computed(() => state.user);
	const isAuthenticated = computed(() => !!state.authToken);
	const loading = computed(() => state.loading);
	const userError = computed(() => state.userError);
	const forgotPasswordError = computed(() => state.forgotPasswordError);
	const forgotPasswordLoading = computed(() => state.forgotPasswordLoading);
	const register = async (data) => {
		try {
			state.loading = true
			console.log('register data', data)
			let result = await apiClient.createVSFCustomer(data)
			console.log('register data', result.data)

			if (result.data && result.data.token)
				setAuthToken(result.data.token)

			if (result.data && result.data.user)
				state.user = {...result.data.user}

			state.loading = false
			return result
		} catch (e) {
			console.log('register err', e)
			state.userError.register = e.data.message
			state.loading = false
			// return Promise.reject(e)
		}
	};

	const login = async (data) => {
		try {
			state.loading = true
			console.log('login data', data)

			let result = await apiClient.VSFCustomerLogin(data)
			console.log('login data2', result.data)

			if (result.data && result.data.message_type && result.data.message_type !== 'success') {
				state.userError.login = result.data.message
			}

			if (result.data && result.data.token)
				setAuthToken(result.data.token)

			if (result.data && result.data.user)
				state.user = {...result.data.user}


			state.loading = false
			return result
		} catch (e) {
			state.loading = false
			console.log('login err1', e)
			state.userError.login = e.data.message
			console.log('login err2', state.userError)
			return e
			// return Promise.resolve(e)
		}
	};

	const resendVerificationEmail = async (data) => {
		try {
			state.loading = true
			console.log('resendVerificationEmail data', data)

			let result = await apiClient.resendVerificationEmail(data)

			state.loading = false
			return result
		} catch (e) {
			state.loading = false
			console.log('resendVerificationEmail err', e)
			state.userError.login = e.data.message
			// return Promise.reject(e)
		}
	};
	const verifyCustomerEmail = async (data) => {
		try {
			state.loading = true
			console.log('verifyCustomerEmail data', data)

			let result = await apiClient.verifyCustomerEmail(data)

			if (result.data && result.data.token)
				setAuthToken(result.data.token)

			if (result.data && result.data.user)
				state.user = {...result.data.user}

			state.loading = false
			return result
		} catch (e) {
			state.loading = false
			console.log('verifyCustomerEmail err', e)
			state.userError.login = e.data.message
			// return Promise.reject(e)
		}
	};
	const updateTransactionStatus = async (data) => {
		try {
			state.loading = true
			console.log('updateTransactionStatus data', data)

			let result = await apiClient.updateTransactionStatus(data, state.user._id)

			if (result.data && result.data.token)
				setAuthToken(result.data.token)

			if (result.data && result.data.user)
				state.user = {...result.data.user}

			state.loading = false
			return result
		} catch (e) {
			state.loading = false
			console.log('updateTransactionStatus err', e)
			state.userError.login = e.data.message
			// return Promise.reject(e)
		}
	};
	const updateUser = async (data) => {
		try {
			state.loading = true
			console.log('updateUser data', data)

			let result = await apiClient.updateCustomerProfile(data)

			if (result.data && result.data.token)
				setAuthToken(result.data.token)

			if (result.data && result.data.user)
				state.user = {...result.data.user}

			state.loading = false
			return result
		} catch (e) {
			state.loading = false
			console.log('register err', e)
			state.userError.login = e.data.message
			// return Promise.reject(e)
		}
	};
	const changePassword = async (data) => {
		try {
			state.loading = true
			console.log('changePassword data', data)

			let result = await apiClient.changePassword(data)

			if (result.data && result.data.token)
				setAuthToken(result.data.token)

			if (result.data && result.data.user)
				state.user = {...result.data.user}

			state.loading = false
			return result
		} catch (e) {
			state.loading = false
			console.log('register err', e)
			state.userError.login = e.data.message
			// return Promise.reject(e)
		}
	};

	const logout = async (data) => {
		try {
			state.loading = true
			console.log('login data', data)

			state.user = {}
			state.authToken = ''

			state.loading = false
			return
		} catch (e) {
			state.loading = false
			console.log('register err', e)
			state.userError.login = e.data.message
			// return Promise.reject(e)
		}
	};

	const requestNewPass = async (data) => {
		try {
			state.forgotPasswordLoading = true
			console.log('requestNewPass data', data)

			let result = await apiClient.forgotPassword(data)

			if (result.data && result.data.token)
				setAuthToken(result.data.token)

			if (result.data && result.data.user)
				state.user = {...result.data.user}

			state.forgotPasswordLoading = false
			return result
		} catch (e) {
			console.log('register err', e)
			state.forgotPasswordError.request = e.data.message
			state.forgotPasswordLoading = false
			// return Promise.reject(e)
		}
	};
	const addNewOrder = async (data) => {
		try {
			state.forgotPasswordLoading = true
			console.log('addNewOrder data', data)

			let result = await apiClient.addNewOrder(data)

			state.forgotPasswordLoading = false
			return result
		} catch (e) {
			console.log('register err', e)
			state.userError = e.data.message
			state.loading = false
			// return Promise.reject(e)
		}
	};
	const VSFOrderPayment = async (data) => {
		try {
			state.forgotPasswordLoading = true
			console.log('VSFOrderPayment data', data)

			let result = await apiClient.VSFOrderPayment(data, state.user._id)

			state.forgotPasswordLoading = false
			return result
		} catch (e) {
			console.log('VSFOrderPayment err', e)
			state.userError = e.data.message
			state.loading = false
			// return Promise.reject(e)
		}
	};


  return {
	  user,
	  isAuthenticated,
	  loading,
	  userError,
	  forgotPasswordError,
	  forgotPasswordLoading,
	  updateUser,
	  changePassword,
	  resendVerificationEmail,
	  verifyCustomerEmail,
	  register,
	  login,
	  logout,
	  addNewOrder,
	  VSFOrderPayment,
	  requestNewPass
  };
};

export default userState;
