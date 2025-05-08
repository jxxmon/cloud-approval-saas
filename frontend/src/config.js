const config = {
  development: {
    apiUrl: 'http://localhost:8000/api',
    websocketUrl: 'ws://localhost:8000/ws',
    debugMode: true,
  },
  production: {
    apiUrl: 'http://backend:8000/api',
    websocketUrl: 'ws://backend:8000/ws',
    debugMode: false,
  }
};

const env = process.env.NODE_ENV || 'development';
export default config[env]; 