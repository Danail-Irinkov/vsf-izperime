import Vue from 'vue';
import VueCompositionAPI, { reactive, computed } from '@vue/composition-api';
import procc_api from '../helpers/procc_api.js'
// We need to register it again because of Vue instance instantiation issues
Vue.use(VueCompositionAPI);
let apiClient = procc_api()

const state = reactive({
	authUser: {},
	authToken: apiClient.getToken(),
	loading: false,
	userError: '',
	forgotPasswordError: '',
	forgotPasswordLoading: false,
});

const userState = () => {
	const authUser = computed(() => state.authUser);
	const loading = computed(() => state.loading);
	const userError = computed(() => state.userError);
	const forgotPasswordError = computed(() => state.forgotPasswordError);
	const forgotPasswordLoading = computed(() => state.forgotPasswordLoading);
	const register = async (data) => {
		try {
			console.log('register data', data)
			let result = await apiClient.createVSFCustomer(data)
			return result
		} catch (e) {
			return Promise.reject(e)
		}
	};

	const login = (data) => {
		console.log('login data', data)
	};

	const requestNewPass = (data) => {
		console.log('requestNewPass data', data)
	};


  return {
	  authUser,
	  loading,
	  userError,
	  forgotPasswordError,
	  forgotPasswordLoading,
	  register,
	  login,
	  requestNewPass
  };
};

export default userState;
