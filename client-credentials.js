import dotenv from 'dotenv'
dotenv.config()
import  open from "open";
import { Issuer, generators } from 'openid-client';


(async () => {
  // Specify app arguments
  const issuer = await Issuer.discover(process.env.ISSUER_URL);
  //console.log('Discovered issuer %s %O', issuer.issuer, issuer.metadata);
  
  const client = new issuer.Client({
    client_id: "client_creds_id",
    client_secret: "client_creds_secret",
    response_types: ["token"]
  
  });
  
  const token = await client.grant({
      grant_type: "client_credentials",
      scope: "read:data"
  });

  console.log(token);


})();



