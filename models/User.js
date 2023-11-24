const mongoose = require("mongoose")
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const userSchema = new Schema({
    nm_usuario: {
        type: String,
        required: true
    },
    login: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    cpf: {
        type: Number,
    },
    email: {
        type: String,
        required: true
    },
    telefone: {
        type: Number,
        required: true
    },
    dt_nasc: {
        type: Date,
    },
    dt_val_licenca: {
        type: Date,
    },
},
    { timestamps: true }
);

userSchema.methods.comparePassword = async function (password) {
    try {
        const isMatch = await bcrypt.compare(password.toString(), this.senha.toString());
        return isMatch;
    } catch (error) {
        throw error;
    }
};

const User = mongoose.model("User", userSchema)

module.exports = {
    User
}