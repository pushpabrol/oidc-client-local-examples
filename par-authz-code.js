import dotenv from 'dotenv'
dotenv.config()
import  open from "open";
import { Issuer, generators } from 'openid-client';

import readline from "readline";

const issuer = await Issuer.discover(process.env.ISSUER_URL);
console.log('Discovered issuer %s %O', issuer.issuer, issuer.metadata);

const client = new issuer.Client({
  client_id: "client_id",
  client_secret: "client_secret",
  redirect_uris: ["https://jwt.io"],
  response_types: ['token','id_token','code'],

});


const response = await client.pushedAuthorizationRequest({
    scope: `openid profile`,
    nonce: "132123",
    response_type: "code"

});

console.log(response);

const url = `${issuer.metadata.authorization_endpoint}?client_id=client_id&request_uri=${response.request_uri}`;

(async () => {
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