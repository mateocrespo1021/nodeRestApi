const Role = require("../models/role");
const Usuario = require("../models/usuario");

const esRolValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol  ${rol} no esta registrado en la BD`);
  }
};

const existeEmail = async (correo='') => {
  //Verifiar si el correo existe
  const existe = await Usuario.findOne({ correo });

  if (existe) {
    throw new Error(`El correo  ${correo} ya existe`);
  }
};

const existeUsuarioPorId = async (id) => {
  //Verifiar si el usuario existe
  const existeUsuario = await Usuario.findById(id).exec();

  if (!existeUsuario) {
    throw new Error(`El id del usuario ${id} no existe`);
  }
};


module.exports = {
  esRolValido,
  existeEmail,
  existeUsuarioPorId
};
