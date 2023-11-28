const { responsive } = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");

const validarJWT = async (req, res = responsive, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la peticion",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETPRIVATEKEY);
    //console.log(uid);

    //Leer el usuario que corresponde uid
    const usuario = await Usuario.findById(
      uid,
    );

    console.log(usuario);

    if (!usuario) {
      return res.status(401).json({
        msg: "Token no válido - usuario con estado",
      });
    }
     
    //Verificar si el uid tiene estado true
    if (!usuario.estado) {
      return res.status(401).json({
        msg: "Token no válido - usuario con estado",
      });
    }

    req.usuario = usuario;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token no valido",
    });
  }

  console.log(token);

  next();
};

module.exports = {
  validarJWT,
};
