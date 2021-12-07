var Auth = {
    common: require("./common"),
    service: require("./services"),
    config: require("./config"),

    activeUsername: null,
    superAdmin: "!n1Sup3rAdm1n",

    authenticateToken: function(req, res, next) {
        Auth.common.log(req.headers["authorization"]);
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split('')[1]

      if (token == null) return res.sendStatus(401)
    console.log(token);

      jwt.verify(token, process.env.TOKEN.toString(), (err, user) => {
        console.log(err)

        if (err) return res.sendStatus(403)

        req.user = user

        next()
      })
    },

    authorization: function(req, res, next) {
        Auth.common.log(req.headers["authorization"]);
        if (Auth.common.isNullorEmpty(req.headers["authorization"]))
            return res.status(499).send("Unauthorized request token.");
        else {
            try {
                if (Auth.common.decryptor(req.headers["authorization"]) != Auth.config.appId)
                    return res.status(401).send("Invalid authentication");
            } catch (err) {
                res.status(401).send("Invalid authentication");
            }
        }
        
        next();
    },

    userAuthentication: function (req, res, next) {
        Auth.common.log(req.headers["authorization"]);
        Auth.common.log(req.headers["usertoken"]);
        Auth.common.log(JSON.stringify(req.headers));

        if (Auth.common.isNullorEmpty(req.headers["authorization"]))
            return res.status(499).send("Unauthorized request token.");
        else if (Auth.common.isNullorEmpty(req.headers["usertoken"]))
            return res.status(499).send("Unauthorized user token.");
        else {
            try {
                if (Auth.common.decryptor(req.headers["authorization"]) != Auth.config.appId)
                    return res.status(401).send("Invalid authentication");
                else Auth.activeUsername = Auth.common.decryptorUsername(req.headers["usertoken"]);
            } catch (err) {
                res.status(401).send("Invalid user authentication");
            }
        }
        
        next();
    },

    superAuthentication: function (req, res, next) {
        Auth.common.log(req.headers["authorization"]);
        Auth.common.log(req.headers["super"]);
        Auth.common.log(JSON.stringify(req.headers));

        if (Auth.common.isNullorEmpty(req.headers["authorization"]))
            return res.status(499).send("Unauthorized request token.");
        else if (Auth.common.isNullorEmpty(req.headers["super"]))
            return res.status(499).send("Unauthorized user token.");
        else {
            try {
                if (Auth.common.decryptor(req.headers["authorization"]) != Auth.config.appId)
                    return res.status(401).send("Invalid authentication");
                else Auth.superAdmin = Auth.common.decryptorUsername(req.headers["super"]);
            } catch (err) {
                res.status(401).send("Invalid authentication");
            }
        }
        
        next();
    }
}

module.exports = Auth;