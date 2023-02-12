export const BASE_URL = 'http://apialeksanvp.nomoredomains.work';

function checkResponse(res) {
  if (res.ok) {
    return res.json()
  } else {
    return Promise.reject(res.status)
  }
} 

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: 
        JSON.stringify({password, email})
 })
  .then(checkResponse)
  .then((res) => {
    return res;
  })
  .catch((err) => {return Promise.reject(err)}); 
};

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    })
    .then(checkResponse)
    .then((data) => { 
      if (data.token){
        localStorage.setItem('jwt', data.token);
      } 
      return data;
    })
    .catch((err) => {return Promise.reject(err)}); 
  };
  
  export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(res => res.json())
    .then(data => data)
  }


