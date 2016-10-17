var fs = require('fs');
var privateKey  = fs.readFileSync('key.pem');
var certificate = fs.readFileSync('cert.pem');
var credentials = {key: privateKey, cert: certificate};/**
 * Created by dvann on 8/24/2016.
 */

exports.credentials = credentials;
