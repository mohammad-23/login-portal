var {User} = require('./../models/User');


const checkUserName = (userName) => {
        return User.findOne({username: userName}).then((user) => {
            if(user){
                console.log(user);
                return true;
            }else{
                return false;
            }           
        });
   

};

const checkEmail = (Email) => {
        return User.findOne({email: Email}).then((user) => {
              if(user){
                console.log(user);
                return true;
            }else{
                return false;

            }  
        });
    } 


module.exports = {
    checkUserName,
    checkEmail
}
