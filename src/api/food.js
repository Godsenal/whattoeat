import axios from 'axios';

const url = '/api/food';

export function getFoods(){
  return axios.get(url+'/all')
    .then((res)=>{
      return {res};
    }).catch((err)=>{
      return {err};
    });
}
export function getFoodsByScroll(isInitial, id){
  var scrollUrl = url +'/scroll';
  if(!isInitial){
    scrollUrl += `/${id}`;
  }
  return axios.get(scrollUrl)
    .then((res)=>{
      return {res};
    }).catch((err)=>{
      return {err};
    });
}

export function getFoodByName(name){
  return axios.get(url+`/name/${name}`)
    .then((res)=>{
      return {res};
    }).catch((err)=>{
      return {err};
    });
}

export function getFoodsByTag(tag){
  return axios.get(url+`/tag/${tag}`)
    .then((res)=>{
      return {res};
    }).catch((err)=>{
      return {err};
    });
}

export function getFoodsByTags(tags){
  return axios.post(url+'/tags',{tags})
    .then((res)=>{
      return {res};
    }).catch((err)=>{
      return {err};
    });
}

export function getFoodsBySearch(name){
  return axios.get(url+`/search/${name}`)
    .then((res)=>{
      return {res};
    }).catch((err)=>{
      return {err};
    });
}
export function postFoods(foods){
  return axios.post(url,{foods})
    .then((res)=>{
      return {res};
    }).catch((err)=>{
      return {err};
    });
}

export function updateFood(food){
  return axios.put(url,{food})
    .then((res)=>{
      return {res};
    }).catch((err)=>{
      return {err};
    });
}