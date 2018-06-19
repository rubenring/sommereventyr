export const parseJSON = (res) => {
    return res.json();
}

export const checkstatus = (res) => {
  if(res.status !== 200) throw Error("Feil når data skulle hentes fra server");
  return res
} 
const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*' 
}
export const GET = () => ({
    method: 'GET',
    headers,
  })
  export const post = (json) => ({
    method: 'POST',
    headers,
    body: JSON.stringify(json)
  })
export const apiCallPost = (url, json) => (
  fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*' 
    },
    body: JSON.stringify(json)
  })
  .then(checkstatus)
  .then(parseJSON)
  .then(json => json)
  .catch(err => console.log(err))
);
export const apiCallGet = (url) => (
  fetch(url, GET())
  .then(checkstatus)
  .then(parseJSON)
  .then(json => json)
  .catch(err => console.log(err))
);