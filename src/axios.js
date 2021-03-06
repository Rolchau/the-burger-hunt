import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:4000'
});

const endpoints = {
  users: '/users/',
  pictures: '/pictures/',
  shoplist: '/shoplist/',
  shopdetail: '/shopdetails/',
  reviews: '/reviews/',
  signup: '/signup/',
}
export { instance, endpoints };
