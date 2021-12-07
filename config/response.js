exports.ok = function(values, res) {
    var common = require('../middleware/common');
    for (var i = 0; i < values.length; i++) {
        if (values[i]['Foto'] == '' || values[i]['Foto'] == null || values[i]['Foto'] == undefined || values[i]['Foto'] == "null" || values[i]['Foto'] == "undefined") {
            values[i]['Foto'] = values[i]['Foto']
        }else{
            values[i]['Foto'] = common.decryptor(values[i]['Foto'])
        }
        if (values[i]['Username'] == '' || values[i]['Username'] == null || values[i]['Username'] == undefined || values[i]['Username'] == "null" || values[i]['Username'] == "undefined") {
            values[i]['Username'] = values[i]['Username']
        }else{
            values[i]['Token'] = common.encryptor('TokenKey')
        }
        
    }
    var data = {
        data: values,
        lastRequested: Math.floor(Date.now()/1000)
    };

    res.json(data);
    res.end();
};

exports.pagination = function(values, totalPages, res) {
    var data = {
        data: values,
        totalPages: totalPages,
        lastRequested: Math.floor(Date.now()/1000)
    };

    res.json(data);
    res.end();
};

exports.message = function(msg, res) {
    res.json({message: msg});
    res.end();
};

exports.error = function (error, res) {
    console.log(JSON.stringify(error));
    res.status(500).send({"message": "'"+error+"'"});
};