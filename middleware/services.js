var Service = {
    request: require('request-promise'),
    common: require('./common'),
    errorMsg: '',

    get: async function (options) {
        var result = await Service.request.get(options)
        .then(Service.then)
        .catch(Service.error)

        return result;
    },

    post: async function (options) {
        var result = await Service.request.post(options)
        .then(Service.then)
        .catch(Service.error)
    
        return result;
    },

    callback: function (error, response, body) {
        Service.result = response.body;
        Service.common.log ("Response Body: " + response.body);
        Service.common.log ("Error: " + error);
        Service.common.log ("Response Code:" + response.code);
        Service.common.log ("Body: " + body);
    },

    then: function (response) {
        Service.common.log("href: " + response.request.uri.href);
        Service.common.log("response: " + response.body);
        Service.common.log("Status Code: " + response.statusCode);
        
        return response.body;
    },

    error: function (err) {
        Service.errorMsg = err;
        Service.common.log(err.statusCode);
        throw err;
    }
};

module.exports = Service;