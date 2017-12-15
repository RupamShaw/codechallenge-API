var credentials = {
    userName: "rupam",
    password: "Got-Job"
};
var realm = 'Basic Authentication';

function authenticationStatus(resp) {
    resp.writeHead(401, { 'WWW-Authenticate': 'Basic realm="' + realm + '"' });
    resp.end('Authorization is needed');

};

module.exports = function userAuthenthentication(request, response) {
    var authentication, loginInfo;
    if (!request.headers.authorization) {
        authenticationStatus(response);
        return false;
    }
   
    authentication = request.headers.authorization.replace(/^Basic/, '');
    authentication = (new Buffer(authentication, 'base64')).toString('utf8');
    loginInfo = authentication.split(':');
  
    if (loginInfo[0] === credentials.userName && loginInfo[1] === credentials.password) {
         return true;
    }
    return false;
}