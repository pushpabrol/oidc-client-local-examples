# use below as a sample to create client certs
openssl req -new -newkey rsa:4096 -days 365 -nodes -subj "/C=US/ST=FL/L=Lithia/O=Okta/CN=$1" -keyout $1.key -out $1.csr -passin pass:Auth0Dem0
openssl x509 -req -in $1.csr -days 1000 -CA rootCA.crt -CAkey rootCA.key -out $1.crt -passin pass:Auth0Dem0
openssl pkcs12 -export -out $1.pfx -inkey $1.key -in $1.crt -certfile rootCA.crt -password pass:Auth0Dem0
