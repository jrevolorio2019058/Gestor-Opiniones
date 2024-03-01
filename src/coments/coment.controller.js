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