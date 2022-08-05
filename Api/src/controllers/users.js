var userSchema = require("../schema/Users");
userSchema = []
module.exports = {

createUsers: function (name, lastName, eMail, password, phone) {
  
    let usersFilters = userSchema.filter((u) => u.name === name) 


    let user = {
        name, 
        lastName, 
        eMail, 
        password, 
        phone
    }
    
    
    if (usersFilters.length === 0) {
        
        userSchema.push(user)
        return userSchema
      }
}





}