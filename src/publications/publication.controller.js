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

export const publicacionesGet = async (req, res = response) => {
    
    const { limite, desde } = req.query;

    const query = { estadoPublicacion: true };

    const [total, publicaciones] = await Promise.all([

        Publication.countDocuments(query),
        Publication.find(query)
            .skip(Number(desde))
            .limit(Number(limite))

    ]);

    res.status(200).json({
        total,
        publicaciones
    })

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