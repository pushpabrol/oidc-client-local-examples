import dotenv from 'dotenv'
dotenv.config()
import  open from "open";
import { Issuer, generators, custom } from 'openid-client';
import * as fs from 'fs';



(async () => {


const cert = fs.readFileSync("./certs-sha256/client_creds_1-crt.pem");
const key = fs.readFileSync("./certs-sha256/client_creds_1-key.pem");
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
  
  var client = new issuer.Client({
    client_id: "client_creds_id",
    token_endpoint_auth_method: 'tls_client_auth',
    response_type: ["token"]
  
  });

  client[custom.http_options] = () => ({ key, cert, passphrase });
  
  const token = await client.grant({
      grant_type: "client_credentials",
      resource: "resource:server-audience-value",
      scope: "openid api:read"
  });

  console.log(token);


})();



