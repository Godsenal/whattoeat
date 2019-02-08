import axios from 'axios';
import queryString from 'query-string';

const url = '/api/food';

const instance = axios.create({
  baseURL: '/api/food',
});
export function getFoods() {
  return instance
    .get('/all')
    .then(res => {
      return { res };
    })
    .catch(err => {
      return { err };
    });
}
export function getFoodsList({ limit, tags = [], search = '', offsetId = '' }) {
  const payload = {
    limit,
    tags,
    search,
    offsetId,
  };
  const query = queryString.stringify(payload, { arrayFormat: 'bracket' });
  return instance
    .get(`/list?${query}`)
    .then(res => {
      return { res };
    })
    .catch(err => {
      return { err };
    });
}

export function getFoodByName(name) {
  return instance
    .get(`/one?name=${name}`)
    .then(res => {
      return { res };
    })
    .catch(err => {
      return { err };
    });
}
export function postFoods(foods) {
  return axios
    .post(url, { foods })
    .then(res => {
      return { res };
    })
    .catch(err => {
      return { err };
    });
}

export function updateFood(food) {
  return axios
    .put(url, { food })
    .then(res => {
      return { res };
    })
    .catch(err => {
      return { err };
    });
}
