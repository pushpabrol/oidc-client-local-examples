import dotenv from 'dotenv'
dotenv.config()
import  open from "open";
import { Issuer, generators, custom } from 'openid-client';
import * as fs from 'fs';


import readline from "readline";



const CLIENT_ID = "client-pki-mtls";
const certFileName = "client1-crt.pem";
const keyFileName = "client1-key.pem";

(async () => {

    
    const cert = fs.readFileSync(`./certs-sha256/${certFileName}`);
    const key = fs.readFileSync(`./certs-sha256/${keyFileName}`);
    const passphrase = "Auth0Dem0";


    await custom.setHttpOptionsDefaults({
        cert : cert,
        key:key,
        passphrase: passphrase
      });

    
      // Specify app arguments
      Issuer[custom.http_options] = () => ({ key, cert, passphrase });
    
      const issuer = await Issuer.discover(`${process.env.MTLS_ISSUER_URL}`);

    //console.log('Discovered issuer %s %O', issuer.issuer, issuer.metadata);
    
    //Issuer.Client[custom.http_options] = () => ({ key : key, cert: cert, passphrase: passphrase });
    
    const client = new issuer.Client({
    client_id: `${CLIENT_ID}`,
    token_endpoint_auth_method: 'tls_client_auth',
    redirect_uris: ["https://jwt.io"],
    response_types: ['code']
    });
    
    const url = await client.authorizationUrl({
        scope: `openid profile api:write`,
        response_type: "code",
        resource: "resource:server-audience-value"
    });
    

  // Specify app arguments
  await open(url, {app: ['google chrome']});

  const code = await askQuestion("Please enter the code from the response? ");
  console.log(code);

  const params = {"code" : code, "iss" : issuer.issuer};
  console.log(params);
  
  //client[custom.http_options] = () => ({ key, cert });    
    
  const tokenSet = await client.callback("https://jwt.io", params,{ "iss" :issuer.issuer, custom : { "http_options": { key, cert }}});

  console.log(tokenSet);


})();


function askQuestion(query) {
  const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
  });

  return new Promise(resolve => rl.question(query, ans => {
      rl.close();
      resolve(ans);
  }))
}

