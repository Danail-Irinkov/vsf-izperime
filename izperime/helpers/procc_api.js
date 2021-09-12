import axios from 'axios'
import jwt from 'jsonwebtoken'
import config from '../config/index.js';
import SBuffer from 'safer-buffer'
const Buffer = SBuffer.Buffer

let current_auth_token = ''
export default (token = '') => {
	if (token) current_auth_token = token
  let baseURL = config.API_URL
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  let api = axios.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache',
      'Content-type': 'application/json'
    },
    // 10 second timeout...
    timeout: 150000
  })
  api.interceptors.request.use(
    (config) => {
      if (current_auth_token) {
        config.headers.Authorization = `Bearer ${current_auth_token}`
      }
      return config
    },
    error => Promise.reject(error)
  )
  // api.interceptors.response.use((response) => {
  //   if (response.data && response.data.token_expired) {
  //   }
  //   return response
  // }, (error) => {
  //   console.log('token Expired error', error)
  //   return Promise.reject(error)
  // })

  // JWT TOKEN MANAGEMENT
  let private_key = ''
  if (process.env.NODE_APP_INSTANCE === 'kube') {
    /* eslint-disable */
    let Buff = new Buffer.from(process.env.JWT_PRIVATE_KEY_1, 'base64')
    private_key = Buff.toString('ascii')
    /* eslint-disable */
  } else { // Adding this case to avoid Breaking the Header Calculation flow, but not used for Browser API Calls
    private_key = '-----BEGIN RSA PRIVATE KEY-----\n' +
	    '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\n' +
	    '-----END RSA PRIVATE KEY-----'
  }
  if (!private_key || (private_key === 'NO TOKEN')) {
    console.error(private_key)
    throw new Error('No JWT API TOKEN SUPPLIED')
  }

  const createToken = (user_id) => jwt.sign({ user_id: user_id },
    private_key, {
      expiresIn: 15000,
      algorithm: 'RS256'
    })

  const getHeader = (user_id = 0) => ({
    headers: {
      'Authorization': `Bearer ${createToken(user_id)}`
    }
  })

  const getToken = () => current_auth_token

  const validateVATNumber = (data, user_id) => api.post('payment/validateVATNumber', data, getHeader(user_id))
  const addNewOrder = (orderData, user_id) => api.post('order/addNewOrder', orderData, getHeader(user_id))
  const saveTransactionInOrder = (orderData, user_id) => api.post('order/saveTransactionInOrder', orderData, getHeader(user_id))
  const VSFOrderPayment = (data, user_id) => api.post('mangopay/VSFOrderPayment', data, getHeader(user_id))
  const updateTransactionStatus = (data, user_id) => api.post('mangopay/updateTransactionStatusVSF', data, getHeader(user_id))

  // Customer
  const createVSFCustomer = (data) => api.post(`customer/createVSFCustomer`, data)
  const VSFCustomerLogin = (data) => api.post(`customer/VSFCustomerLogin`, data)
  const getCustomer = (token) => api.get(`customer/getCustomer`)
  const updateCustomerProfile = (token, data) => api.post(`customer/updateCustomerProfile`, data)
  const changePassword = (token, data) => api.post(`customer/changePassword`, data)
  const updateCustomerAddress = (token, data) => api.post(`address/updateCustomerAddress`, data)
  const verifyCustomerEmail = (data) => api.post(`customer/verifyCustomerEmail`, data)
  const resendVerificationEmail = (data) => api.post(`customer/resendVerificationEmail`, data)
  const forgotPassword = (data) => api.post(`auth/forgotPassword`, data)
  const resetPassword = (data) => api.post(`auth/resetPassword`, data)
  const calculateShipmentCost = ({cartId, user_id}) => api.get(`cart/calculateRapidoShipmentCost?cartId=${cartId}&user_id=${user_id}`)
  const getOrderInvoicePDF = (orderId) => api.get(`invoice/getOrderInvoicePDF/${orderId}`,{responseType: 'arraybuffer'})
  const cancelOrder = (data,user_id,brand_id) => api.post(`order/cancelOrder?user_id=${user_id}&brand_id=${brand_id}`,data)
  const getCountriesList = () => api.get(`country/getCountriesList`)
  const getCitiesList = (country_id, query) => api.get(`address/getCitiesList`, { params: { country_id, query}})
  const getStreetList = (site_id, query) => api.get(`address/getStreetList`, {params:{site_id, query }})
  const saveFeedback = (data) => api.post(`feedback/saveFeedback`,data)

  return {
	  getToken,
    validateVATNumber,
    addNewOrder,
    VSFOrderPayment,
    updateTransactionStatus,
    saveTransactionInOrder,
    createVSFCustomer,
    VSFCustomerLogin,
    getCustomer,
    updateCustomerProfile,
    changePassword,
    updateCustomerAddress,
    verifyCustomerEmail,
    resendVerificationEmail,
    forgotPassword,
    resetPassword,
    calculateShipmentCost,
    getOrderInvoicePDF,
    cancelOrder,
    getCountriesList,
    getCitiesList,
    getStreetList,
    saveFeedback
  }
}
