const { responsive } = require("express");

const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");

const userGet = async (req, res = responsive) => {
  const { limite = 5, desde = 0 } = req.query;

  const query = { estado: true };

  // const usuarios = await Usuario.find(query)
  // .skip(Number(desde))
  // .limit(Number(limite));

  //Retorna el total de registros
  // const total=await Usuario.countDocuments(query)

  //Forma mas rapida para ejecutar promoseas simultaneas
  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);

  res.json({
    total,
    usuarios,
  });
};

const userPost = async (req, res = responsive) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({
    nombre,
    correo,
    password,
    rol,
  });

  //Encriptar la contraseña
  const salt = bcryptjs.genSaltSync(10);
  usuario.password = bcryptjs.hashSync(password, salt);
  //Guardar en BD
  await usuario.save();

  res.json({
    msg: "get API - Controller",
    usuario,
  });
};

const userDelete = async(req, res = responsive) => {

 const {id}=req.params
 
 //Fisicamente lo borramos
  //const usuario=await Usuario.findByIdAndDelete(id)

  const usuario=await Usuario.findByIdAndUpdate(id,{estado:false})

  res.json({
   usuario
  });
};

const userPut = async (req, res = responsive) => {
  const { id } = req.params;
  const { password, google, ...resto } = req.body;
  //TODO validar contra base de datos
  if (password) {
    const salt = bcryptjs.genSaltSync(10);
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.json({
    msg: "get API - Controller",
    usuario,
  });
};

const userPatch = (req, res = responsive) => {
  res.json({
    msg: "get API - Controller",
  });
};

module.exports = {
  userGet,
  userPost,
  userDelete,
  userPatch,
  userPut,
};
