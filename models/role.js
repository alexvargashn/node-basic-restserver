const { Schema, model } = require("mongoose");


const RoleSchema = Schema({
    role: {
        type: String,
        required: [true, 'The role is required'],
        unique: true
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