import Coment from './coment.model.js';

import Publication from '../publications/publication.model.js';

export const comentPost = async (req, res) => {

    const {id} = req.params;

    const nameCreator = req.usuario.userName;

    const idAuthor = req.usuario._id;

    const {text} = req.body;

    const coment = new Coment({
        nameCreator, text, idPublication: id, idAuthor
    })

    const publication = await Publication.findOneAndUpdate(
        { _id: id, idComentario: { $ne: coment._id } },
        { $addToSet: { idComentario: coment._id } },
        { new: true }
    )

    await coment.save();
    await publication.save();


    res.status(200).json({
        msg: `${req.usuario.userName} haz comentando existosamente`
    })

}

export const comentGet = async (req, res = response) => {
    
    const { limite, desde } = req.query;

    const query = { comentaryState: true };

    const [total, comentarios] = await Promise.all([

        Coment.countDocuments(query),
        Coment.find(query)
            .skip(Number(desde))
            .limit(Number(limite))

    ]);

    res.status(200).json({
        total,
        comentarios
    })

}

export const comentPut = async (req, res) => {

    const { id } = req.params;

    const { idPublication, idAuthor, comentaryState, ...resto } = req.body;
    
    await Coment.findByIdAndUpdate(id, resto);

    const coment = await Coment.findOne({ _id: id });

    await coment.save();

    res.status(200).json({

        msg: `${req.usuario.userName} tu comentario a sido actualizados`

    });

}

export const comentDelete = async (req, res) => {

    const {id} = req.params;

    await Coment.findByIdAndUpdate(id,{comentaryState: false})

    const coment = await Coment.findOne({_id:id});

    res.status(200).json({

        msg: `${req.usuario.userName} haz eliminado correctamente el comentario ${coment.tittle}`
    });

}