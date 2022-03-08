const userModel = require('../Models/userModel')
const tokenSender = async (user, statusCode, res) => {
    const token = await user.getJWTtoken();
    var details = await userModel.User.findById({ _id: user._id }).select('-password -createdAt -updatedAt -role -__v')
    return res.status(statusCode).send({
        success: true,
        message: 'Login Successfull',
        user: details,
        token: 'Bearer ' + token
    })

}

module.exports = { tokenSender };