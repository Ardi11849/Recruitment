var Common = {
    config: require('./config'),
    crypto: require('crypto'),
    md5: require('md5'),
    reversemd5: require('reverse-md5'),

    isNullorEmpty: function (val) {
        return (val === "" || val === undefined || val === "undefined" || val === " " || val === null || val === "null");
    },

    log: function (str) {
        if (Common.config.debug) console.log(str);
    },

    setUrl: function (url) {
        return Config.subDirectory + url;
    },
    
    jsonToQuery: function (data) {
        var str;
        try
        {
            Common.log(data);
            var jsonData = JSON.parse(data);
            Common.log(jsonData);
            str = [];

            Object.keys(jsonData).forEach(key => {
                str.push(key+"="+jsonData[key]);
            })

            Common.log(str);
            return Common.strJoin("&", str);
        }
        catch (e)
        {
            return data;
        }
    },

    encryptUsername: function (username) {
        try {
            return Common.encryptor(Math.floor(Date.now()/1000) + 
                "||" + 
                username + 
                "||" + 
                Math.floor(Date.now()/1000)
            );
        } catch (err) {
            throw err;
        }
    },

    decryptorUsername: function (usercrypted) {
        try {
            var d = Common.decryptor(usercrypted);
            Common.log ("token : " + d);
            return d.split("||")[1];
        } catch (err) {
            throw err;
        }
    },
    
    strJoin: function (separateStr, arrObject) {
        var str = '';
        if (Array.isArray(arrObject)) {
            for (var i=0; i < arrObject.length; i++) {
                str += arrObject[i];
                if (i < arrObject.length) str+=separateStr;
            }

            return str;
        }

        return str;
    },

    encryptor: function (texted) {
        try {
            // var secretKey = "T2@cking-1984328212*213761";
            // const key = Common.crypto.scryptSync(secretKey, 'salt', 32);
            
            // const iv = Common.crypto.randomBytes(16);
            // const cipher = Common.crypto.createCipheriv('aes-256-gcm', key, iv);
            // var encrypted = cipher.update(texted, 'utf8', 'hex') + cipher.final('hex');
            // return {content: encrypted, tag: cipher.getAuthTag()};
            var secretKey = "T2@cking-1984328212*213761";
            var key = Common.crypto.createCipher('aes-128-ecb', secretKey);
            
            var encrypted_str = key.update(texted, 'utf8', 'base64')
            encrypted_str += key.final('base64');
            
            return encrypted_str.replace(/\//g,'s1L2a3S4h');
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    decryptor: function (crypted) {
        try {
            // var secretKey = "T2@cking-1984328212*213761";
            // const key = Common.crypto.scryptSync(secretKey, 'salt', 32);
            
            // const iv = Common.crypto.randomBytes(16);
            // var decipher = Common.crypto.createDecipheriv('aes-256-gcm', key, iv);
            // var decrypted = decipher.update(crypted, 'utf8', 'hex') + decipher.final('hex');
            // return decrypted;
            var secretKey = "T2@cking-1984328212*213761";

            var key = Common.crypto.createDecipher('aes-128-ecb', secretKey);
            var decrypted_str = key.update(crypted.replace(/s1L2a3S4h/g, '/'), 'base64', 'utf8')
            decrypted_str += key.final('utf8');

            return decrypted_str;
        } catch (err) {
            throw err;
        }
    }
};

module.exports = Common;