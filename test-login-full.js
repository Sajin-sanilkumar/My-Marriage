const http = require('http');
const querystring = require('querystring');

const data = querystring.stringify({
  username: 'admin',
  password: 'password'
});

const options = {
  hostname: 'localhost',
  port: 3003,
  path: '/api/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': data.length
  },
  redirect: 'manual'
};

const req = http.request(options, (res) => {
  console.log('=== LOGIN RESPONSE ===');
  console.log(`Status: ${res.statusCode}`);
  console.log('Redirect location:', res.headers.location);
  const authCookie = res.headers['set-cookie']?.[0];
  console.log('Auth cookie set:', !!authCookie);
  if (authCookie) {
    const cookieToken = authCookie.split(';')[0];
    console.log('Cookie token:', cookieToken.substring(0, 50) + '...');
  }
  
  // Now test accessing /admin with the cookie
  if (authCookie) {
    const cookieValue = authCookie.split(';')[0];
    const adminOptions = {
      hostname: 'localhost',
      port: 3003,
      path: '/admin',
      method: 'GET',
      headers: {
        'Cookie': cookieValue
      },
      redirect: 'manual'
    };
    
    console.log('\n=== TESTING /ADMIN ACCESS ===');
    const adminReq = http.request(adminOptions, (adminRes) => {
      console.log(`Admin page status: ${adminRes.statusCode}`);
      console.log('Admin page headers:', Object.keys(adminRes.headers).join(', '));
    });
    
    adminReq.on('error', (e) => console.error('Admin request error:', e.message));
    adminReq.end();
  }
});

req.on('error', (e) => {
  console.error(`Login request error: ${e.message}`);
});

req.write(data);
req.end();