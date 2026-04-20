const http = require('http');
const querystring = require('querystring');

const data = querystring.stringify({
  username: 'admin',
  password: 'password'
});

const options = {
  hostname: 'localhost',
  port: 3002,
  path: '/api/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': data.length
  }
};

const req = http.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  console.log('Headers:', res.headers);
  
  let body = '';
  res.on('data', (chunk) => {
    body += chunk;
  });
  
  res.on('end', () => {
    console.log('Body:', body);
    console.log('Cookies:', res.headers['set-cookie']);
  });
});

req.on('error', (e) => {
  console.error(`Problem with request: ${e.message}`);
});

req.write(data);
req.end();