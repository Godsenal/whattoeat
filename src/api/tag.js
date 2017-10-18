import axios from 'axios';

const url = '/api/tag';

export function getTags(){
  return axios.get(url+'/all')
    .then((res)=>{
      return {res};
    }).catch((err)=>{
      return {err};
    });
}

export function getRandomTags(size){
  return axios.get(url+`/random/${size}`)
    .then((res)=>{
      return {res};
    }).catch((err)=>{
      return {err};
    });
}

export function getSuggestTags(word){
  return axios.get(url+`/search/${word}`)
    .then((res)=>{
      return {res};
    }).catch((err)=>{
      return {err};
    });
}

export function postTags(tags){
  return axios.post(url,{tags})
    .then((res)=>{
      return {res};
    }).catch((err)=>{
      return {err};
    });
}