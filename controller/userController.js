// Import Package ...
const { User } = require('../Models/userModel');
const { compare } = require('bcryptjs')
const { tokenSender } = require('../utils/jwttoken');
const catchAsyncerr = require('../middleware/catchAsyncerr');

// Registration Controller ...
exports.registrationControll = catchAsyncerr(async (req, res, next) => {
    const { username, number, budget } = req.body;
    if (!username) {
        return res.status(400).send({
            status: false,
            message: 'Please enter name'
        })
    }
    if (!number) {
        return res.status(400).send({
            status: false,
            message: 'Please enter number'
        })
    }
    if (!budget) {
        return res.status(400).send({
            status: false,
            message: 'Please enter budget'
        })
    }
    User.findOne({ number: number }).then(numberSave => {
        if (numberSave) {
            res.status(400).send({
                status: true,
                message: "Number already exists"
            })
        } else {
            User.create({
                username,
                number,
                budget
            }).then(save => {
                if (save) {
                    res.status(201).send({
                        status: true,
                        message: "User created"
                    })
                } else {
                    res.status(400).send({
                        status: true,
                        message: "Can not create user"
                    })
                }
            }).catch(err => {
                console.log(err);
                res.status(400).send({
                    status: false,
                    message: 'Failed',
                    err: err
                })

            })
        }
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