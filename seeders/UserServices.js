var userServices = {
    db: require('../config/db'),
    common: require('../middleware/common'),
    error: require('../middleware/error'),
    response: require("../config/response"),
    crc32: require('crc32'),
    md5: require('md5'),
    
      createUser: async (body) => {
            const conn = await userServices.db.connection.getConnection();
            try {
                var encrypt = userServices.crc32(userServices.md5(body.Password));
                var data = [
                    body.Username,
                    encrypt,
                    body.Email,
                    body.Phone,
                    body.Country,
                    body.City,
                    body.PostCode,
                    body.Name,
                    body.Address
                ];
                console.log(data);
                
                var sql = "Insert INTO `user` ( "+
                            "`Username`, "+
                            "`Password`, "+
                            "`Email`, "+
                            "`Phone`, "+
                            "`Country`, "+
                            "`City`, "+
                            "`PostCode`, "+
                            "`Name`, "+
                            "`Address`) "+
                            "Values (?,?,?,?,?,?,?,?,?)";
            
                await conn.beginTransaction();
                var result = await conn.query(sql, data);
    
                await conn.commit();
                conn.release();
    
                return result;
            } catch (err) {
                throw err;
            }
      },
  
      Login: async(data) => {
          try {
            var encrypt = userServices.crc32(userServices.md5(data.Password));
            console.log(encrypt);
            var sql = "SELECT * "+
                      "FROM user "+
                      "WHERE Username = ? AND Password = ?";
            var data = userServices.db.single(sql, [data.Username, encrypt]);
  
            return data;
          } catch (error) {
              return error;
          }
      },
  
      GetAll: async(data) => {
          try {
            var sql = "SELECT * "+
                      "FROM user ";
            var data = userServices.db.single(sql);
  
            return data;
          } catch (error) {
              return error;
          }
      },
  }
  module.exports = userServices;
  