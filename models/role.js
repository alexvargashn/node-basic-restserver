const { Schema, model } = require("mongoose");


const RoleSchema = Schema({
    role: {
        type: String,
        min: 3,
        max: 20,
        required: [true, 'The role is required'],
        unique: true
    },
    description: {
        type: String,
        max: 300,
        require: [true, 'Please, set a brief description about this role']
    },
    state: {
        type: Boolean,
        default: true
    }
});

RoleSchema.methods.toJSON = function() {
    const {__v, ...data } = this.toObject();
    return data;
}

module.exports = model('Role', RoleSchema); 