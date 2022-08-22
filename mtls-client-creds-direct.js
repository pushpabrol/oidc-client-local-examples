

import * as fs from 'fs';
import * as https from 'https';
import * as querystring from 'querystring';




const req = https.request(
  {
    hostname: 'mtls.desmaximus.com',
    port: 443,
    path: '/token',
    method: 'POST',
    cert: fs.readFileSync('./certs-sha256/client1-crt.pem'),
    key: fs.readFileSync('./certs-sha256/client1-key.pem'),
    passphrase: "Auth0Dem0",
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
  },
  res => {
    res.on('data', function(data) {
      console.log(data.toString('utf8'));
    });
    
  }
);

req.on('error', (e) => {
    console.error("Error:");
    console.error(e);
  });
  

console.log(req.clientCertEngine)
req.write(querystring.stringify({ client_id: 'client-pki-mtls', grant_type: 'client_credentials' }));
req.end();