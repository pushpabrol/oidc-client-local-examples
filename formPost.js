import dotenv from 'dotenv'
dotenv.config()
import  open from "open";
import { Issuer, generators } from 'openid-client';

import readline from "readline";

const issuer = await Issuer.discover(process.env.ISSUER_URL);
//console.log('Discovered issuer %s %O', issuer.issuer, issuer.metadata);

const client = new issuer.Client({
  client_id: "client_id_1",
  client_secret: "client_secret_1",
  redirect_uris: ["https://jwt.io"],
  response_types: ['code id_token token'],
});


const url = await client.authorizationUrl({
    scope: `openid profile`,
    nonce: "132123",
    response_type: "code id_token token",
    response_mode: "form_post"
});


(async () => {
  // Specify app arguments
  await open(url, {app: ['google chrome']});

  const code = await askQuestion("Please enter the code from the response? ");
  console.log(code);

  const params = {"code" : code, "iss" : issuer.issuer};
  console.log(params);

  const tokenSet = await client.callback("https://jwt.io", params,{"nonce" : "132123", "iss" :issuer.issuer});

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

