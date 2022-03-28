const express = require("express");
const app = express();
const personaModel = require("../models/usuario");

app.get("/", async (req, res) => {
  await personaModel.find({blnEstado: true})
    .exec((err, usuarios) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            count: usuarios.length,
            usuarios
        })
    })

});

app.post('/', async (req, res) => {
    try {
        let usuario = new personaModel(req.body);
        let usuarioRegistrado = await usuario.save();

        return res.status(200).json({
            ok: true,
            resp: 200,
            msg: 'Se ha registrado el usuario exitosamente.',
            cont: {
                usuarioRegistrado
            }
        });
    } catch (err) {
        return res.status(500).json({
            ok: false,
            resp: 500,
            msg: 'Error al intentar registrar el usuario.',
            cont: {
                err: Object.keys(err).length === 0 ? err.message : err
            }
        });
    }
});

app.put('/', async (req, res) => {
    try {
        let usuarioBody = new personaModel(req.body);
        let err = usuarioBody.validateSync();
        if (err) {
            return res.status(400).json({
                ok: false,
                resp: 400,
                msg: 'Error de validación.',
                cont: {
                    err: Object.keys(err).length === 0 ? err.message : err
                }
            });
        }
        let { strNombre, strApellidoPaterno, strApellidoMaterno, strCorreo, nmbTelefono, strPuesto } = usuarioBody;
        let usuario = await personaModel.findByIdAndUpdate(usuarioBody._id, { $set: { strNombre, strApellidoPaterno, strApellidoMaterno, strCorreo, nmbTelefono, strPuesto } }, { new: true });

        if (!usuario) {
            return res.status(404).json({
                ok: false,
                resp: 404,
                msg: 'El usuario que deseas modificar no existe.',
                cont: {
                    usuario
                }
            });
        }
        return res.status(200).json({
            ok: true,
            resp: 200,
            msg: 'Se ha actualizado el usuario exitosamente.',
            cont: {
                usuario
            }
        });
    } catch (err) {
        return res.status(500).json({
            ok: false,
            resp: 500,
            msg: 'Error al intentar actualizar el usuario.',
            cont: {
                err: Object.keys(err).length === 0 ? err.message : err
            }
        });
    }
});

app.delete('/', async (req, res) => {
    const idUsuario = req.query.idUsuario;
    const blnActivo = req.query.blnActivo;
    try {
        if (!idUsuario || idUsuario.length < 24) {
            return res.status(400).json({
                ok: false,
                resp: 400,
                msg: 'No se recibió un identificador válido.',
                cont: {
                    idUsuario: idUsuario | null
                }
            });
        }
        if (blnActivo != 'false' && blnActivo != 'true') {
            return res.status(400).json({
                ok: false,
                resp: 400,
                msg: 'No se recibió un valor booleano en el parámetro blnActivo.',
                cont: {
                    blnActivo: blnActivo || null
                }
            });
        }
        const usuario = await personaModel.findByIdAndUpdate(idUsuario, { $set: { blnActivo } }, { new: true });
        if (!usuario) {
            return res.status(404).json({
                ok: false,
                resp: 404,
                msg: `El usuario que deseas ${blnActivo === 'true' ? 'activar' : 'desactivar'} no existe.`,
                cont: {
                    usuario
                }
            });
        }
        return res.status(200).json({
            ok: true,
            resp: 200,
            msg: `Se ha ${blnActivo === 'true' ? 'activado' : 'desactivado'} el usuario exitosamente.`,
            cont: {
                usuario
            }
        });
    } catch (err) {
        return res.status(500).json({
            ok: false,
            resp: 500,
            msg: `Error al intentar ${blnActivo === 'true' ? 'activar' : 'desactivar'} el usuario.`,
            cont: {
                err: Object.keys(err).length === 0 ? err.message : err
            }
        });
    }
});

module.exports = app;


