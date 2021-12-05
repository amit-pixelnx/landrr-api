const crypto = require("crypto");
const jwt = require('jsonwebtoken');

/*
const algorithm = 'aes-256-cbc';
const ENCRYPTION_KEY = 'd6F3Efeq'; // or generate sample key Buffer.from('FoCKvdLslUuB4y3EZlKate7XGottHski1LmyqJHvUhs=', 'base64');
const IV_LENGTH = 16;




function encrypt(password) {
    let iv = crypto.randomBytes(IV_LENGTH);
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(ENCRYPTION_KEY, 'hex'), iv);
    let encrypted = cipher.update(password);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}


function decrypt(password) {
    let textParts = password.split(':');
    let iv = Buffer.from(textParts.shift(), 'hex');
    let encryptedText = Buffer.from(textParts.join(':'), 'hex');
    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(ENCRYPTION_KEY, 'hex'), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}


*/

function encrypt(password) {
    var cipher = crypto.createCipher('aes-256-cbc', 'd6F3Efeq');
    var crypted = cipher.update(password, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}


function decrypt(password) {
    var decipher = crypto.createDecipher('aes-256-cbc', 'd6F3Efeq');
    var dec = decipher.update(password, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
}


async function customValidator(params, req, res, cb) {
    let validateResp = {
        status: true,
        message: '',
        data: {}
    };
    var token = req.headers.authorization || '';

    if (!params.hasOwnProperty('isToken') || (params.hasOwnProperty('isToken') && params.isToken)) {


        if (token == '') {
            validateResp.status = false;
            validateResp.message = 'unauthorized access.';
        } else {

            token = token.split(" ");
            if (token[0] == "Bearer") {
                token = token[1]
            } else {
                token = token[0]
            }

            validateResp.data = await jwt.verify(token, process.env.TOKEN_SECRET);
            if (!validateResp.data.hasOwnProperty('id')) {
                validateResp.status = false;
                validateResp.message = 'unauthorized access.';
            }
        }
    }

    if (validateResp.status) {
        if (params.hasOwnProperty('data') && params.hasOwnProperty('keys')) {
            /*
            {
                data : req.query / req.body, //data of API's
                keys :  { 
                    email : {
                        require : true,
                        validate : 'email/contact',
                        type : ''
                    },
                    password : {
                        require : true,
                    }
                }
            }
            */
            let checkKey = params.keys,
                apiData = params.data;

            var BreakException = {};
            try {
                Object.keys(checkKey).forEach((key) => { // loop of all keys which we need to check or validate
                    let vDetails = checkKey[key]; // all the validation data 


                    if (!vDetails.type && vDetails.require && (!apiData.hasOwnProperty(key) || (apiData.hasOwnProperty(key) && typeof apiData[key] == 'string' && apiData[key].trim() == ''))) { //check the require field
                        validateResp.status = false;
                        validateResp.message = key.capitalize() + ' is require.';

                        throw BreakException;
                    }


                    if (vDetails.hasOwnProperty('validate')) {
                        const regexp = {
                            url: /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/,
                            email: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                            mobile: /((?:\+|00)[17](?: |\-)?|(?:\+|00)[1-9]\d{0,2}(?: |\-)?|(?:\+|00)1\-\d{3}(?: |\-)?)?(0\d|\([0-9]{3}\)|[1-9]{0,3})(?:((?: |\-)[0-9]{2}){4}|((?:[0-9]{2}){4})|((?: |\-)[0-9]{3}(?: |\-)[0-9]{4})|([0-9]{7}))/
                        }

                        if (regexp.hasOwnProperty(vDetails.validate) && !regexp[vDetails.validate].test(apiData[key])) { //check validation with regex
                            validateResp.status = false;
                            validateResp.message = key.capitalize() + ' should be valid.';
                            throw BreakException;
                        }
                    }
                });
            } catch (e) {
                if (e !== BreakException) throw e;
            }

        }
    }

    if (validateResp.status == true) {
        cb(validateResp);
    } else {
        res.status(401).send(validateResp);
    }
}

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}



module.exports = {
    encrypt,
    decrypt,
    customValidator
}