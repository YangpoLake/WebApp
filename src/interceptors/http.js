import axios from 'axios'

axios.interceptors.request.use(config => {
  console.log(config.url);
})