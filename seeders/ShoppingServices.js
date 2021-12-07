var ShoppingServices = {
    db: require('../config/db'),
    common: require('../middleware/common'),
    error: require('../middleware/error'),
    response: require("../config/response"),
    
      post: async (body) => {
          const conn = await ShoppingServices.db.connection.getConnection();
          try {
            var data = [
                body.Name,
                body.CreatedDate
            ];
            console.log(data);
    
            var sql = "Insert INTO `shopping` ( "+
                        "`Name`, "+
                        "`CreatedDate` ) "+
                        "Values (?,?)";
            
            await conn.beginTransaction();
            const result = await conn.query(sql, data);
    
            await conn.commit();
            conn.release();
    
            return result;
          } catch (err) {
            throw err;
          }
      },
    
      put: async (body) => {
          console.log(body);
          const conn = await ShoppingServices.db.connection.getConnection();
          try {
            var data = [
                body.Name,
                body.CreatedDate,
                body.Id
            ];
            console.log(data);
    
            var sql = "UPDATE `shopping` SET Name = ?, "+
                        "`CreatedDate`= ? "+
                        "WHERE Id = ?";
            
            await conn.beginTransaction();
            var result = await conn.query(sql, data);
            console.log(result);
    
            await conn.commit();
            conn.release();
    
            return  result;
          } catch (err) {
            throw err;
          }
      },
  
      getAll: async() => {
          try {
              var sql = "SELECT * FROM shopping";
              var data = ShoppingServices.db.single(sql);
  
              return data;
          } catch (error) {
              return error;
          }
      },
  
      getById: async(query) => {
          try {
              var sql = "SELECT * FROM shopping "+
                        "WHERE Id = ?";
              var data = ShoppingServices.db.single(sql, [query.Id]);
  
              return data;
          } catch (error) {
              return error;
          }
      },
      
      delete: async(query) => {
          try {
              var sql = "DELETE FROM `shopping` WHERE Id = ?";
              var data = ShoppingServices.db.single(sql, [query.Id]);
  
              return data;
          } catch (error) {
              return error;
          }
      },
  }
  module.exports = ShoppingServices;
  