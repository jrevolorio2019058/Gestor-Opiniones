import mongoose from "mongoose";

const PublicationSchema = mongoose.Schema({

    tittle: {

        type: String,
        required: [true, "Es necesario un titulo"]

    },

    category: {

        type: String,
        required: [true, "Es necesario una categoria"]

    },

    mainText: {

        type: String,
        required: [true, "Es necesario un cuerpo de la publicación"]

    },

    idCreador: {

        type: String,
        required: [true, "Es necesario un idDelCreador"]

    },

    idComentario: {
        
        type: [String],
        default: []

    },

    estadoPublicacion: {

        type: Boolean,
        default: true

    }

});

export default mongoose.model('Publication', PublicationSchema);