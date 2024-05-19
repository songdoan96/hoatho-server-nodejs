export const BACKEND_API =
  process.env.NODE_ENV === 'development'
    ? 'http://192.168.1.10:3000/'
    : 'https://hoatho.onrender.com/';
