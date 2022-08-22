import dotenv from 'dotenv'
dotenv.config()
import  open from "open";
import { Issuer, generators, custom } from 'openid-client';
import * as fs from 'fs';


import readline from "readline";



(async () => {

    
    const cert = fs.readFileSync("./certs-sha256/client1-crt.pem");
    const key = fs.readFileSync("./certs-sha256/client1-key.pem");
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
    client_id: "client-pki-mtls",
    token_endpoint_auth_method: 'tls_client_auth',
    redirect_uris: ["https://jwt.io"],
    response_types: ['code']
    });



const response = await client.pushedAuthorizationRequest({
    scope: `openid profile`,
    nonce: "132123",
    response_type: "code"

});

console.log(response);

const url = `${issuer.metadata.authorization_endpoint}?client_id=client-pki-mtls&request_uri=${response.request_uri}`;

  // Specify app arguments
  await open(url, {app: ['google chrome']});

  const code = await askQuestion("Please enter the code from the response? ");
  console.log(code);

  const params = {"code" : code, "iss" : issuer.issuer};
  console.log(params);

  const tokenSet = await client.callback("https://jwt.io", params,{"nonce" : "132123" });

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