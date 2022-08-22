import dotenv from 'dotenv'
dotenv.config()

import open from "open";
import { Issuer, generators } from 'openid-client';
import readline from "readline";

import pkg from 'node-jose';
const { JWK } = pkg;


(async () => {
    try {

      
      var privateKey = `-----BEGIN RSA PRIVATE KEY-----
      MIIEogIBAAKCAQEAtXbL0Oku/TTPlLkmi7kLD7X7NJq6xTKXqeuZypB61yahyYuI
      +hdWFEQ8D02qwRS9vlR3fINZ5jXCG/PTk2UfwGJ3UCgXbukDb4LRk+eIvWnHJ5cd
      6JtvEPjLBrsQdJJtGGm/H8FIn8EMqV06SeDf/cN4Ryfs3gXj7HkC/ks3ze8xJhSz
      7ouEfFhkKcU4XJAMi3QLbwIMaITHfpQ7/eWa0yjiKAP7+rvwphKuwsT8GCcYe8Zy
      2v2YMhM+MafeIsjX4e9w2/4uXmhbEH529WS6zStLZ5kBYsN6NG+/VB9NxC//IlhJ
      thIemvQIV08bEqgZfGjmYIU+jOJJYeLPJNHGWQIDAQABAoIBABbQbjSANKOp8ZUp
      qAJ2C8F4aDJHZ8bmIvI+iDHS81a8aSfNLrX+nBhlMcXcxmSLBoX42aLiYrmSNarM
      /2MvGgxWdNiziaqsif2JjW7Sc7sYouzDz4NQk2inVuMsPpfhVuz0Uo6b/tTy8PQU
      IAFsz8x4OFV93AZX6D1xQ2KUM1plCsupwWjxj+HVIWRnlj+OpG4AblWYQlwCUsYU
      cmV8utomGEC8McWe9Kzgt6exmx9cIwRxIPNl5fn+86set++88+2wg1MF70AhLU3P
      HHGAB68Vf3KRCtBBzYLs92BHoQIwCoZDRtEkylYfAusIHS+bkweep1sQXGDQGmzb
      1A8KhRkCgYEAuOJtXmCV81acamm3wMxbO3Bh/Fg17+ik9o4qKZHk/h87Q0SBDjIN
      nAdr/SMLZn9eDhOQT6ZFK/GHUDrnrzN85PB6gKhyrzVp2xF6YFkBl36a+8zaNf8p
      REj8kcpana00gezis65AbQVexbkmmoYgQDyX4TQT3sEAque9SbvSch0CgYEA+0OP
      EP4jRrEZAdu8inb/HO1fAi3BSO/EQ5MG7cbso6KbwTHy632QA0DC63aUkgJiOAPh
      5RytUbzAIyc5IvFxpacL3BEkfd5lzy2XoZU2ANTTj4dXrWm0OSjQRPEPUv6jOoYD
      mpWyPHAt/5VRXiXSOb8GuabOAsCagiCIgyFs8G0CgYAm4f/sZFXE+ock3hz2IERj
      qMwCvS6CySPAcr+tRHCrfTgCeqrFqIMyOGFeuHsSUGEghr7H8YkEp+Q0XF8Terme
      kHDDFCoibRJZL0DUeIOcL9U6dafCyWoNYWg05SDPnni3hnFbJp+IDiQTY1AaGXE4
      8UVj6IbxRxfz2Y72rdihhQKBgHAVtBVdePkI+WHV1uZhrO4HiZFcPdO+eWu3g6jA
      S0G3wQlOsdGRApQg6JLHJAF6JLxeJv/gagSDUaac0aUf1ZWSzfyOfRvVAM+JxBFl
      kWCPkAx/0IHgHHA/H6ERc8ePJdtuet8Tlh3V4P8ZaeG4t23hJCvfGBksOACCaMMu
      Pv2FAoGAO893iOKcodAcmEtO5w1z9WrdJMLH8I7wGhE3dNkQG+lT9UpahIViyZfE
      1F90gcC+U/Aj0Ah+K1hkFgTD+skgMYBBVVs6LXB3kW8rKPJzRHhddCQT2NqrzTr3
      i7FfVhUIcBuvrxbbJItVaY2KbnI2jWnceFA9h8PDGL8HZBuwaRQ=
      -----END RSA PRIVATE KEY-----
      `


        var keystore = JWK.createKeyStore();
        await keystore.add(privateKey, "pem");
        
       const issuer = await Issuer.discover(process.env.ISSUER_URL);


        const client = new issuer.Client({
            client_id: "client_pk_kwt",
            token_endpoint_auth_method: 'private_key_jwt',
            redirect_uris: ["https://jwt.io"]

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

        const responseType = "code";
        const response = await client.pushedAuthorizationRequest({
            scope: `openid profile`,
            nonce: "132123",
            response_type: responseType
        });

        console.log(response);

        const url = `${issuer.metadata.authorization_endpoint}?client_id=client_pk_kwt&request_uri=${response.request_uri}`;

        (async () => {
            // Specify app arguments
            await open(url, { app: ['google chrome'] });
            if(responseType === "code") { 
            const code = await askQuestion("Please enter the code from the response? ");
            console.log(code);
            const params = { "code": code, iss: issuer.issuer };
            console.log(params);

            const tokenSet = await client.callback("https://jwt.io", params, { "nonce": "132123" });

            console.log(tokenSet);
            }


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


    } catch (err) {
        console.error(err);
    }
})();







