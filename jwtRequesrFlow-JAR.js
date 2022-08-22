
import dotenv from 'dotenv'
dotenv.config()
import  open from "open";
import { Issuer, generators } from 'openid-client';

import readline from "readline";
import * as jose from 'jose'


const issuer = await Issuer.discover(process.env.ISSUER_URL);
//console.log('Discovered issuer %s %O', issuer.issuer, issuer.metadata);

const nonce = generators.nonce();

const client = new issuer.Client({
  client_id: "client-with-RS-sig",
  redirect_uris: ["https://jwt.io"],
  token_endpoint_auth_method: 'private_key_jwt',
  response_types: ['code']
}, { keys : [{
  kty: 'RSA',
  n: 'tXbL0Oku_TTPlLkmi7kLD7X7NJq6xTKXqeuZypB61yahyYuI-hdWFEQ8D02qwRS9vlR3fINZ5jXCG_PTk2UfwGJ3UCgXbukDb4LRk-eIvWnHJ5cd6JtvEPjLBrsQdJJtGGm_H8FIn8EMqV06SeDf_cN4Ryfs3gXj7HkC_ks3ze8xJhSz7ouEfFhkKcU4XJAMi3QLbwIMaITHfpQ7_eWa0yjiKAP7-rvwphKuwsT8GCcYe8Zy2v2YMhM-MafeIsjX4e9w2_4uXmhbEH529WS6zStLZ5kBYsN6NG-_VB9NxC__IlhJthIemvQIV08bEqgZfGjmYIU-jOJJYeLPJNHGWQ',
  e: 'AQAB',
  d: 'FtBuNIA0o6nxlSmoAnYLwXhoMkdnxuYi8j6IMdLzVrxpJ80utf6cGGUxxdzGZIsGhfjZouJiuZI1qsz_Yy8aDFZ02LOJqqyJ_YmNbtJzuxii7MPPg1CTaKdW4yw-l-FW7PRSjpv-1PLw9BQgAWzPzHg4VX3cBlfoPXFDYpQzWmUKy6nBaPGP4dUhZGeWP46kbgBuVZhCXAJSxhRyZXy62iYYQLwxxZ70rOC3p7GbH1wjBHEg82Xl-f7zqx6377zz7bCDUwXvQCEtTc8ccYAHrxV_cpEK0EHNguz3YEehAjAKhkNG0STKVh8C6wgdL5uTB56nWxBcYNAabNvUDwqFGQ',
  p: 'uOJtXmCV81acamm3wMxbO3Bh_Fg17-ik9o4qKZHk_h87Q0SBDjINnAdr_SMLZn9eDhOQT6ZFK_GHUDrnrzN85PB6gKhyrzVp2xF6YFkBl36a-8zaNf8pREj8kcpana00gezis65AbQVexbkmmoYgQDyX4TQT3sEAque9SbvSch0',
  q: '-0OPEP4jRrEZAdu8inb_HO1fAi3BSO_EQ5MG7cbso6KbwTHy632QA0DC63aUkgJiOAPh5RytUbzAIyc5IvFxpacL3BEkfd5lzy2XoZU2ANTTj4dXrWm0OSjQRPEPUv6jOoYDmpWyPHAt_5VRXiXSOb8GuabOAsCagiCIgyFs8G0',
  dp: 'JuH_7GRVxPqHJN4c9iBEY6jMAr0ugskjwHK_rURwq304AnqqxaiDMjhhXrh7ElBhIIa-x_GJBKfkNFxfE3q5npBwwxQqIm0SWS9A1HiDnC_VOnWnwslqDWFoNOUgz554t4ZxWyafiA4kE2NQGhlxOPFFY-iG8UcX89mO9q3YoYU',
  dq: 'cBW0FV14-Qj5YdXW5mGs7geJkVw90755a7eDqMBLQbfBCU6x0ZEClCDoksckAXokvF4m_-BqBINRppzRpR_VlZLN_I59G9UAz4nEEWWRYI-QDH_QgeAccD8foRFzx48l22563xOWHdXg_xlp4bi3beEkK98YGSw4AIJowy4-_YU',
  qi: 'O893iOKcodAcmEtO5w1z9WrdJMLH8I7wGhE3dNkQG-lT9UpahIViyZfE1F90gcC-U_Aj0Ah-K1hkFgTD-skgMYBBVVs6LXB3kW8rKPJzRHhddCQT2NqrzTr3i7FfVhUIcBuvrxbbJItVaY2KbnI2jWnceFA9h8PDGL8HZBuwaRQ'
}]});

var reqpayload = {
    client_id: 'client-with-RS-sig',
    response_type: 'code',
    redirect_uri: 'https://jwt.io',
  }

  var privateKey = `-----BEGIN PRIVATE KEY-----
  MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC1dsvQ6S79NM+U
  uSaLuQsPtfs0mrrFMpep65nKkHrXJqHJi4j6F1YURDwPTarBFL2+VHd8g1nmNcIb
  89OTZR/AYndQKBdu6QNvgtGT54i9accnlx3om28Q+MsGuxB0km0Yab8fwUifwQyp
  XTpJ4N/9w3hHJ+zeBePseQL+SzfN7zEmFLPui4R8WGQpxThckAyLdAtvAgxohMd+
  lDv95ZrTKOIoA/v6u/CmEq7CxPwYJxh7xnLa/ZgyEz4xp94iyNfh73Db/i5eaFsQ
  fnb1ZLrNK0tnmQFiw3o0b79UH03EL/8iWEm2Eh6a9AhXTxsSqBl8aOZghT6M4klh
  4s8k0cZZAgMBAAECggEAFtBuNIA0o6nxlSmoAnYLwXhoMkdnxuYi8j6IMdLzVrxp
  J80utf6cGGUxxdzGZIsGhfjZouJiuZI1qsz/Yy8aDFZ02LOJqqyJ/YmNbtJzuxii
  7MPPg1CTaKdW4yw+l+FW7PRSjpv+1PLw9BQgAWzPzHg4VX3cBlfoPXFDYpQzWmUK
  y6nBaPGP4dUhZGeWP46kbgBuVZhCXAJSxhRyZXy62iYYQLwxxZ70rOC3p7GbH1wj
  BHEg82Xl+f7zqx6377zz7bCDUwXvQCEtTc8ccYAHrxV/cpEK0EHNguz3YEehAjAK
  hkNG0STKVh8C6wgdL5uTB56nWxBcYNAabNvUDwqFGQKBgQC44m1eYJXzVpxqabfA
  zFs7cGH8WDXv6KT2jiopkeT+HztDRIEOMg2cB2v9Iwtmf14OE5BPpkUr8YdQOuev
  M3zk8HqAqHKvNWnbEXpgWQGXfpr7zNo1/ylESPyRylqdrTSB7OKzrkBtBV7FuSaa
  hiBAPJfhNBPewQCq571Ju9JyHQKBgQD7Q48Q/iNGsRkB27yKdv8c7V8CLcFI78RD
  kwbtxuyjopvBMfLrfZADQMLrdpSSAmI4A+HlHK1RvMAjJzki8XGlpwvcESR93mXP
  LZehlTYA1NOPh1etabQ5KNBE8Q9S/qM6hgOalbI8cC3/lVFeJdI5vwa5ps4CwJqC
  IIiDIWzwbQKBgCbh/+xkVcT6hyTeHPYgRGOozAK9LoLJI8Byv61EcKt9OAJ6qsWo
  gzI4YV64exJQYSCGvsfxiQSn5DRcXxN6uZ6QcMMUKiJtElkvQNR4g5wv1Tp1p8LJ
  ag1haDTlIM+eeLeGcVsmn4gOJBNjUBoZcTjxRWPohvFHF/PZjvat2KGFAoGAcBW0
  FV14+Qj5YdXW5mGs7geJkVw90755a7eDqMBLQbfBCU6x0ZEClCDoksckAXokvF4m
  /+BqBINRppzRpR/VlZLN/I59G9UAz4nEEWWRYI+QDH/QgeAccD8foRFzx48l2256
  3xOWHdXg/xlp4bi3beEkK98YGSw4AIJowy4+/YUCgYA7z3eI4pyh0ByYS07nDXP1
  at0kwsfwjvAaETd02RAb6VP1SlqEhWLJl8TUX3SBwL5T8CPQCH4rWGQWBMP6ySAx
  gEFVWzotcHeRbyso8nNEeF10JBPY2qvNOveLsV9WFQhwG6+vFtski1VpjYpucjaN
  adx4UD2Hw8MYvwdkG7BpFA==
  -----END PRIVATE KEY-----
      `
      const rsPrivateKey = await jose.importPKCS8(privateKey, "RS256");

const jwt = await new jose.SignJWT(reqpayload)
  .setProtectedHeader({ alg: 'RS256'})
  .setIssuedAt(Math.ceil(Date.now() / 1000) + 5)
  .setIssuer('client-with-RS-sig')
  .setAudience(issuer.issuer)
  .setExpirationTime('2h')
  .sign(rsPrivateKey);

  console.log(jwt);


const url = await client.authorizationUrl({
    request: jwt,
    scope: `openid`,
    client_id: 'client-with-RS-sig',

});

console.log(url);

(async () => {
  // Specify app arguments
  await open(url, {app: ['google chrome']});

  const code = await askQuestion("Please enter the code from the response? ");
  console.log(code);

  const params = {"code" : code, "iss" : issuer.issuer};
  console.log(params);

  const tokenSet = await client.callback("https://jwt.io", params,{});

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