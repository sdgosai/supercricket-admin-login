// Import Package ...
const { User } = require('../Models/userModel');
const { compare } = require('bcryptjs')
const { tokenSender } = require('../utils/jwttoken');
const catchAsyncerr = require('../middleware/catchAsyncerr');

// Registration Controller ...
exports.registrationControll = catchAsyncerr(async (req, res, next) => {
    const { username, number, budget, password, confirmPassword } = req.body;
    if (!username) {
        return res.status(400).send({
            success: false,
            message: 'Please enter name'
        })
    }
    if (!number) {
        return res.status(400).send({
            success: false,
            message: 'Please enter number'
        })
    }
    if (!budget) {
        return res.status(400).send({
            success: false,
            message: 'Please enter budget'
        })
    }
    if (!password) {
        return res.status(400).send({
            success: false,
            message: 'Please enter password'
        })
    }
    if (!confirmPassword) {
        return res.status(400).send({
            success: false,
            message: 'Please confirm password'
        })
    }
    User.findOne({ number: number }).select('+password').then(user => {
        if (user) {
            if (password === confirmPassword) {
                compare(password, user.password)
                    .then(match => {
                        if (match) {
                            tokenSender(user, 200, res)
                        } else {
                            res.status(400).send({
                                success: false, message: 'Number or password is incorrect'
                            })
                        }
                    }).catch(err => {
                        console.log(err);
                        res.status(400).send({
                            success: false,
                            message: 'Failed',
                            err: err
                        })
                    })
            } else {
                return res.status(400).json({
                    success: false,
                    message: 'Confirm password must be same as password'
                })
            }
        } else {
            if (password === confirmPassword) {
                User.create({
                    username, number, password, budget
                }).then(save => {
                    if (save) {
                        if (save) {
                            tokenSender(save, 200, res)
                        } else {
                            res.status(400).send({
                                success: false,
                                message: 'Unable to login'
                            })
                        }
                    } else {
                        res.status(400).send({
                            success: false,
                            message: 'Unable to register'
                        })
                    }
                })
            } else {
                return res.status(400).json({
                    success: false,
                    message: 'Confirm password must be same as password'
                })
            }
        }
    }).catch(e => {
        res.status(400).send({
            success: false,
            message: 'Failed',
            error: e
        })
    }).catch(e => {
        res.status(400).send({
            success: false,
            message: 'Failed',
            error: e
        })
    })
});

// login Controller ...
// exports.LoginControll = catchAsyncerr(async (req, res, next) => {
//     const { number, password } = req.body;
//     if (!number && !password) {
//         res.send({
//             success: false,
//             message: 'Please provide valid details'
//         })
//     }
//     User.findOne({ number: number }).select('+password +role -createdAt -updatedAt +is_deleted')
//         .then(user => {
//             if (user) {
//                 compare(password, user.password).then(match => {
//                     if (match) {
//                         tokenSender(user, 200, res)
//                     } else {
//                         res.send({
//                             success: false,
//                             message: 'Invalid login details',
//                         })
//                     }
//                 }).catch(e => {
//                     res.send({
//                         success: false,
//                         message: 'Failed',
//                         error: e
//                     })
//                 })
//             } else {
//                 res.send({
//                     success: false,
//                     message: 'User is not registered',
//                 })
//             }
//         })
//         .catch(e => {
//             res.send({
//                 success: false,
//                 message: 'Failed',
//                 error: e
//             })
//         })
// });