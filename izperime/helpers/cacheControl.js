const cacheControl = (values) => ({ res }) => {
	if (!res) return
  if (!process.server) return;

  const cacheControlValue = Object.entries(values)
    .map(([key, value]) => `${key}=${value}`)
    .join(',');

  res.setHeader('Cache-Control', cacheControlValue);
};

export default cacheControl;
