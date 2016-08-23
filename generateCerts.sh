#!/usr/bin/bash

if [ ! -f bin/cert.pem ]; then
    openssl genrsa -out bin/key.pem
    openssl req -new -key bin/key.pem -out bin/csr.pem
    openssl x509 -req -days 9999 -in bin/csr.pem -signkey bin/key.pem -out bin/cert.pem
    rm bin/csr.pem
fi