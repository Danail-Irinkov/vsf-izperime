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
      'MIICXAIBAAKBgQDk6soMG1p8EnVHi5Q/AcS1Y/Kxw8cAuWWrnysj61WbZBnaeeoz\n' +
      'pL4yzLFvj4ZNwuuxU89kjmKnnIjxR+ux5M5qzEP5al1cFFt1WXaHnZf1NTfjqVAG\n' +
      'speE898224GVwHy/3gK72Zzthg+ORDqeJJLjdjY01o+ebM5BY/LZJCB+IwIDAQAB\n' +
      'AoGAXgl9Wp/Z+eHzP6K9EWz+i601Q4UzOL7wXyIRrL29+wmR/Ufbx79DSsb/lN6W\n' +
      'w1bxT3UoWxyKtmP9dXCgCAIAMOQWZ1usNt0PkJnXpRKt4ayFBcFo96gaNdkRHa7M\n' +
      'mZoYSmce99cLcbNXYF2Uf60EYXvd69hGgZH3XmEHCKFC2JECQQD7EXHKIumuOR6+\n' +
      'TJTqKwFKmgX0MX6q7GYOo4Pd0DUr4k/YWb1G5y+NN1dUKCqw9RJybjhB8nfbQNtM\n' +
      'IuK+EInvAkEA6Wn0BveTJ5lkwtU27x0cvn0Ou0YxTFMHvQ7npwGvoZzPYitQop2e\n' +
      'y1MSsxerQTfuy2E3dUTe+w4Dez5YfX9TDQJASq8iwTVne+sD6SnQtmO6i52LndtH\n' +
      'ScLujPY5GLeByZ8Vj08KjdfhfklzEdas9FzCcwW0eHGPE8qUMW7DMjSrQwJAD1Uf\n' +
      'a4m9x98iqE27Mw/VgInUeubMfDgEDR46h1TsBZC4arlvrY7vDGojk1IdtMYI0KFN\n' +
      'NE3W2+T6w5C/3VaMzQJBAOqeTfHy5WO8I3VUab64tGxa1ktJLBun1Kr2ujqRqtLl\n' +
      'Q+4Brrutzfz6eHfrK6kMjNDjFCdOYtMrLPWX5E3Ey1g=\n' +
      '-----END RSA PRIVATE KEY-----'
  }
  if (!private_key || (private_key === 'NO TOKEN')) {
    console.error(private_key)
    throw new Error('No JWT API TOKEN SUPPLIED')
  }

  const createToken = (brandId) => jwt.sign({ brand_id: brandId },
    private_key, {
      expiresIn: 15000,
      algorithm: 'RS256'
    })

  const getHeader = (brandId = 0) => ({
    headers: {
      'Authorization': `Bearer ${createToken(brandId)}`
    }
  })

  const getToken = () => current_auth_token

  const validateVATNumber = (data, brandId) => api.post('payment/validateVATNumber', data, getHeader(brandId))
  const addNewOrder = (orderData, brandId) => api.post('order/addNewOrder', orderData, getHeader(brandId))
  const saveTransactionInOrder = (orderData, brandId) => api.post('order/saveTransactionInOrder', orderData, getHeader(brandId))
  const VSFOrderPayment = (data, brandId) => api.post('mangopay/VSFOrderPayment', data, getHeader(brandId))
  const updateTransactionStatus = (data, brandId) => api.post('mangopay/updateTransactionStatusVSF', data, getHeader(brandId))

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
  const calculateShipmentCost = ({cartId, brandId}) => api.get(`cart/calculateRapidoShipmentCost?cartId=${cartId}&brandId=${brandId}`)
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
