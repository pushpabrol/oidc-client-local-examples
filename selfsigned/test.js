import pkg from 'node-jose';
const { JWK, JWT } = pkg;
import { readFileSync} from 'fs';
var normalize = (cert) => cert.toString().replace(/(?:-----(?:BEGIN|END) CERTIFICATE-----|\s)/g, '');
console.log({ x5c: [normalize(readFileSync('./selfsignedcert.pem'))]})
JWK.asKey(readFileSync("./selfsignedcert.pem"), "pem", { x5c: [normalize(readFileSync("./selfsignedcert.pem"))], alg: 'RS256', use: 'sig' }).
        then(function(result) {
          console.log(result.toJSON())
        });

