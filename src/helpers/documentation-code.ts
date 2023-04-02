export const nodejs = `const axios = require("axios");

const options = {
    method: 'POST',
    url: '/api/v1/grammar-checker',
    params: {
      text: 'Text to correct',
      lang: 'en' // Language Abbreviation (See Sapling docs)
    },
    headers: {
      'Authorization': 'YOUR_API_KEY',
    }
  };

axios.request(options).then(function (response) {
    console.log(response.data);
}).catch(function (error) {
    console.error(error);
});`

export const python = `import requests

url = '/api/v1/grammar-checker'
api_key = 'YOUR_API_KEY'
text = 'Text to correct'
lang = 'en'

headers = {
    'Authorization': api_key
}

payload = {
    'text': text,
    'lang': lang,
}

response = requests.post(url, headers=headers, json=payload)

if response.status_code == 200:
    data = response.json()
    print(data)
else:
    print(f'Request failed with status code {response.status_code}')`