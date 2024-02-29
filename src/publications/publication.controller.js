import Publication from './publication.model.js';

export const publicacionPost = async (req, res) => {

    const nombreUsuario = req.usuario.userName;

    const idUsuario = req.usuario._id;

    const { tittle, category, mainText } = req.body;

    const publicacion = new Publication({
        tittle, category, mainText, idCreador: idUsuario
    });

    await publicacion.save();

    res.status(200).json({

        msg: `${nombreUsuario} haz creado la publicación ${tittle} exitosamente`

    });

}

export const publicacionPut = async(req, res) => {

    const { id } = req.params;

    const usuarioAutenticado = req.usuario;

    const usuarioId = req.usuario._id;

    const {_id, idCreador, idComentario, ...resto} = req.body;

    await Publication.findByIdAndUpdate(id, resto);

    const publicacion = await Publication.findOne({_id: id});

    if(publicacion.idCreador != usuarioId){

        return res.status(422).json({
            msg: `${usuarioAutenticado.userName} no puedes actualizar las publicaciones de otros.`
        });

    }else{

        await publicacion.save();

    }

    res.status(200).json({
        msg: `${usuarioAutenticado.userName} los datos de ${publicacion.tittle} fueron actualizados`
    })

}