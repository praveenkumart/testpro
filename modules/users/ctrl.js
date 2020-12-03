
var models = require('../../models')
var create = function (req, res) {
    var validationFields = {
        firstname: true,
        lastname: true,
        email: true,
        age: true,
    }
    for(var key in validationFields){
        if(!req.body[key]){
            return res.status(400).json({'message':'Field missing'})
        }
    }
    models.users.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        age: req.body.age,
        is_active: 1,
    }).then(function(result){
        res.json({"message":"success"})
    })
    .catch(function(err){
        res.json({"message":"failes"})
    })
}

module.exports = {
    create:create
};
