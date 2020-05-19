import fetch from 'node-fetch'

const request = (url: String, method: String): Promise => {
  const options = {
    method,
    headers: { "content-type": "application/json" }
  }

  return fetch(url, options)
}

export { request }