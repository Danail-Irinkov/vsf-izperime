let config

if (process.env.NODE_ENV === 'production') {
	config = {
		API_URL: 'https://work.procc.co/api/'
	}
} else {
	config = {
		API_URL: 'http://localhost:8081/api/'
	}
}

export default config
