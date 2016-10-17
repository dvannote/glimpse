#!/bin/bash

[ -f bin/cert.pem ] && [ -f bin/key.pem ] || \
openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout bin/key.pem -out bin/cert.pem << STDIN
US
Illinois
Lebanon
PGRobot
Glimpse
.
dvannote@outlook.com
STDIN

