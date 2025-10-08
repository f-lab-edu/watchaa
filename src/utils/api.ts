import axios, { AxiosError } from 'axios';

export const api = axios.create({
  baseURL: 'https://api.themoviedb.org',
  headers: {
    Authorization: `Bearer ${process.env.TMDB_API_ACCESS_TOKEN}`,
  },
  timeout: 20000,
});

// TODO. Add Error Dialog or Toast Message
const showMessage = async (error: Error) => {
  if (!(error instanceof AxiosError)) {
    console.warn('[Axios] unknown error', error);
    return;
  }

  if (error.response) {
    console.warn(`[Axios] error with status ${error.response.status}`, error.response);
  }
};

api.interceptors.request.use(
  (req) => req,
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (res) => res,
  (error) => {
    showMessage(error);
    return Promise.reject(error);
  },
);
