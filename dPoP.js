import dotenv from 'dotenv'
dotenv.config()
import  open from "open";

//import DPoP, { generateKeyPair } from 'dpop'

import { nanoid, customAlphabet } from 'nanoid';

import pkg from 'node-jose';
const { JWK, JWT } = pkg;

import * as jose from 'jose';

import { Issuer, generators } from 'openid-client';
import readline from "readline";


(async () => {
  
    // JWS Algorithm
    const alg = 'RS256';

    const { publicKey, privateKey } = await jose.generateKeyPair('RS256')
  

    
    const issuer = await Issuer.discover(process.env.ISSUER_URL);

    const client = new issuer.Client({
        client_id: "dpop-client",
        redirect_uris: ["https://jwt.io"],
        response_types: ['code'],
        token_endpoint_auth_method: 'none',
      
      });
      
      const url = await client.authorizationUrl({
          scope: `openid api:write`,
          response_type: "code",
          resource:"resource:server-audience-value",

    
      });
      
      await open(url, {app: ['google chrome']});

      const code = await askQuestion("Please enter the code from the response? ");
      console.log(code);
    
      const params = {"code" : code, "iss" : issuer.issuer};
      console.log(params);

      const tokenSet = await client.callback("https://jwt.io", params,{}, {DPoP: privateKey});

      console.log(tokenSet);

    //   const intro = await client.introspect(tokenSet.access_token,"access_token",{DPoP: privateKey});
    //   console.log(intro)

      //const data = await client.userinfo(tokenSet.access_token,{method: "GET", DPoP:privateKey});
      //console.log(data);

      
      client.requestResource('https://eo4kp6k128ooa1s.m.pipedream.net', tokenSet.access_token, { DPoP: privateKey });


  
    // callback
    // const query = (variable) => {
    //   const query = globalThis.location.search.substring(1);
    //   const vars = query.split('&');
    //   for (var i = 0; i < vars.length; i++) {
    //     const pair = vars[i].split('=');
    //     if (decodeURIComponent(pair[0]) == variable) {
    //       return decodeURIComponent(pair[1]);
    //     }
    //   }
    // }
  
    // if (globalThis.location.pathname === '/cb') {
    //   const code = query('code');
    //   const error = query('error');
  
    //   if (error) {
    //     throw new Error('authorization failed');
    //   } else if (!code) {
    //     throw new Error('expected authorization code');
    //   }
  
    //   const tokenRequestBody = new URLSearchParams();
    //   tokenRequestBody.append('grant_type', 'authorization_code');
    //   tokenRequestBody.append('code', code);
    //   tokenRequestBody.append('client_id', 'dpop-heroku');
    //   tokenRequestBody.append('redirect_uri', 'https://murmuring-journey-60982.herokuapp.com/cb');
  
    //   const tokenResponse = await fetch(token_endpoint, {
    //     method: 'POST',
    //     headers: new Headers({
    //       'content-type': 'application/x-www-form-urlencoded',
    //       'DPoP': await DPoP({ privateKey, publicKey }, alg, token_endpoint, 'POST'),
    //     }),
    //     body: tokenRequestBody.toString(),
    //   });
  
    //   await db.response.put(await tokenResponse.json(), 1);
  
    //   globalThis.location = '/';
    // }
  
    const append = (text) => {
      const [output] = document.getElementsByTagName('output');
      output.innerHTML += `\n${text}`
    }
  
    // const tokens = await db.response.get(1);
  
    // if (!tokens) {
    //   return;
    // }
  
    // append(`stored token response: ${JSON.stringify(tokens, null, 4)}`);
  
    // let introspection;
    // for (const type of ['refresh_token', 'access_token']) {
    //   const introspectionRequestBody = new URLSearchParams();
    //   introspectionRequestBody.append('token', tokens[type]);
    //   introspectionRequestBody.append('client_id', 'dpop-heroku');
    //   introspectionRequestBody.append('token_type_hint', type);
  
    //   const introspectionResponse = await fetch(introspection_endpoint, {
    //     method: 'POST',
    //     headers: new Headers({
    //       'content-type': 'application/x-www-form-urlencoded',
    //     }),
    //     body: introspectionRequestBody.toString(),
    //   });
  
    //   introspection = await introspectionResponse.json();
    //   append(`\n${type} introspection response: ${JSON.stringify(introspection, null, 4)}`);
    // }
  
  
    // if (introspection.active) {
    //   const userinfoResponse = await fetch(userinfo_endpoint, {
    //     method: 'GET',
    //     headers: new Headers({
    //       'DPoP': await DPoP({ privateKey, publicKey }, alg, userinfo_endpoint, 'GET', tokens.access_token),
    //       'Authorization': `DPoP ${tokens.access_token}`
    //     })
    //   });
  
    //   const userinfo = await userinfoResponse.json();
    //   append('\ncan you use the access or refresh tokens? Nope, only those with access to this javascript runtime context can.');
  
    //   append(`\nuserinfo response: ${JSON.stringify(userinfo)}`);
  
    //   append(`\nAnd the best part, i can't even tell you what the private key is.`);
    // }
  
    // globalThis.refresh = async () => {
    //   const refreshRequestBody = new URLSearchParams();
    //   refreshRequestBody.append('grant_type', 'refresh_token');
    //   refreshRequestBody.append('refresh_token', tokens.refresh_token);
    //   refreshRequestBody.append('client_id', 'dpop-heroku');
  
    //   const refreshResponse = await fetch(token_endpoint, {
    //     method: 'POST',
    //     headers: new Headers({
    //       'DPoP': await DPoP({ privateKey, publicKey }, alg, token_endpoint, 'POST'),
    //       'content-type': 'application/x-www-form-urlencoded',
    //     }),
    //     body: refreshRequestBody.toString(),
    //   });
  
    //   await db.response.put(await refreshResponse.json(), 1);
    //   globalThis.location = globalThis.location
    //   return false;
    // }
  
    // append(`\n<a href="#" onclick="refresh(); return false;">refresh tokens</a>`);
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

  const proof = (uri, method, accessToken, jwk) => {
    let accessTokenHash;
    if (accessToken) {
      accessTokenHash = ath(accessToken);
    }
    return JWT.sign(
      {
        htu: uri, htm: method, jti: mynanoid(), ath: accessTokenHash,
      },
      jwk,
      {
        kid: false, header: { typ: 'dpop+jwt', jwk: JWK.asKey(jwk) },
      },
    );
  };


  

  var mynanoid = (length, charset) => {
  if (charset) {
    return customAlphabet(charset, length)();
  }

  return nanoid(length);
};