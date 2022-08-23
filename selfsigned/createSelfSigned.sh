openssl req -newkey rsa:2048 -nodes -keyout $1key.pem -x509 -days 365 -out $1cert.pem -subj "/C=US/ST=FL/L=Lithia/O=Okta/CN=$11"
openssl pkcs12 -inkey $1key.pem -in $1cert.pem -export -out $1cert.pfx -password pass:Auth0Dem0

