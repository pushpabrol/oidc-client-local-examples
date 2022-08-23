

import * as fs from 'fs';
import * as https from 'https';
import * as querystring from 'querystring';




const cert = fs.readFileSync("./selfsigned/selfsignedcert.pem");
const key = fs.readFileSync("./selfsigned/selfsignedkey.pem");

const req = https.request(
  {
    hostname: 'mtls.desmaximus.com',
    port: 443,
    path: '/token',
    method: 'POST',
    cert: cert,
    key: key,
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
req.write(querystring.stringify({ client_id: 'client-self-signed-mtls', grant_type: 'client_credentials' }));
req.end();