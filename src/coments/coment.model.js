import mongoose from "mongoose";

const ComentSchema = mongoose.Schema({

    nameCreator: {

        type: String,
        required: [true, "Es necesario un nombre del usuario"]

    },

    text: {

        type: String,
        required: [true, "Es necesario texto para la publicación"]

    },

    idPublication: {

        type: String,
        required: [true, "Es necesario un id de la publicación"]

    },

    idAuthor: {

        type: String,
        required: [true, "Es necesario un id de la publicación"]

    },

    comentaryState: {

        type: Boolean,
        default: true

    }

});

export default mongoose.model('Coment', ComentSchema);