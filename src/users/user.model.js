import mongoose from "mongoose";

const UserSchema = mongoose.Schema({

    userName: {
        type: String,
        required: [true, "Es necesario un usuario"]
    },

    email: {

        type: String,
        required: [true, "Es necesario un correo"]

    },

    password: {

        type: String,
        required: [true, "Es necesario una contraseña"]

    },

    img: {
        type: String
    },

    state: {
        type: Boolean,
        default: false
    }

});

UserSchema.methods.toJSON = function () {
    
    const { _v, password, _id, ...usuario } = this.toObject();

    usuario.uid = _id;

    return usuario;

}

export default mongoose.model('User', UserSchema);