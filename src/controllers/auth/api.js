const response = require('../base/response');
const {User} = require('../user/models/user');
// register
async function register(req, res){
    try{
        const {fullName, email, password, address, phoneNumber, gender} = req.body;

        let checkEmail = await User.findOne({email: req.body.email});
        if(checkEmail) return response.badRequest(res, "Email is already in use.", "AUTH1001");

        let user = await User.create({
            fullName: req.body.fullName,
            email: req.body.email,
            password: req.body.password,
            address: req.body.address,
            phoneNumber: req.body.phoneNumber,
            gender: req.body.gender
        });
        return response.created(res, {_created_message: `Your account has been successfully created!`}, "AUTH1002");
    }catch (error){
        log.error(error);
        return response.internal(res, error, "AUTH1010");
    }
}

async function login(req, res){
    try{

    }catch (err){

    }
}

module.exports = {
    register,
    login
}