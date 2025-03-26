const config = {
  development: {
    apiUrl: 'http://localhost:5000'
  },
  production: {
    apiUrl: process.env.VITE_API_URL || 'https://your-backend-url.vercel.app'
  }
};

export const getConfig = () => {
  const env = import.meta.env.MODE;
  return config[env];
}; 