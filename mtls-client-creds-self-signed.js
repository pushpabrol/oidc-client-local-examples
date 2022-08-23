import dotenv from 'dotenv'
dotenv.config()
import  open from "open";
import { Issuer, generators, custom } from 'openid-client';
import * as fs from 'fs';



(async () => {


const cert = fs.readFileSync("./selfsigned/selfsignedcert.pem");
const key = fs.readFileSync("./selfsigned/selfsignedkey.pem");



await custom.setHttpOptionsDefaults({
    cert : cert,
    key:key
  });

  // Specify app arguments
  Issuer[custom.http_options] = () => ({ key, cert });

  const issuer = await Issuer.discover(`${process.env.MTLS_ISSUER_URL}`);
  //console.log('Discovered issuer %s %O', issuer.issuer, issuer.metadata);
  
  var client = new issuer.Client({
    client_id: "client-self-signed-mtls",
    token_endpoint_auth_method: 'self_signed_tls_client_auth',
    response_type: ["token"]
  
  });

  
  const token = await client.grant({
      grant_type: "client_credentials",
      resource: "resource:server-audience-value",
      scope: "openid api:read"
  });

  console.log(token);


})();



