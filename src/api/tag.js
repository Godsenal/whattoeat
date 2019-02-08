import axios from 'axios';

const instance = axios.create({
  baseURL: '/api/tag',
});

export function getTags() {
  return instance
    .get('/all')
    .then(res => {
      return { res };
    })
    .catch(err => {
      return { err };
    });
}

export function getRandomTags(size) {
  return instance
    .get(`/random/${size}`)
    .then(res => {
      return { res };
    })
    .catch(err => {
      return { err };
    });
}

export function getSuggestTags(word) {
  return instance
    .get(`/search/${word}`)
    .then(res => {
      return { res };
    })
    .catch(err => {
      return { err };
    });
}

export function postTags(tags) {
  return instance
    .post('/', { tags })
    .then(res => {
      return { res };
    })
    .catch(err => {
      return { err };
    });
}
