const { Router } = require("express");
const {
  userGet,
  userPut,
  userPost,
  userDelete,
  userPatch,
} = require("../controllers/user");
const { check } = require("express-validator");
const {
  esRolValido,
  existeEmail,
  existeUsuarioPorId,
} = require("../helpers/db-validators");
const {
  validarJWT,
  validarCampos,
  esAdminRole,
  tieneRole,
} = require("../middlewares");

const router = Router();

router.get("/", userGet);

router.put(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom((id) => existeUsuarioPorId(id)),
    check("rol").custom((rol) => esRolValido(rol)),
    validarCampos,
  ],
  userPut
);

router.post(
  "/",
  [
    check("correo", "El correo no es valido").isEmail(),
    check("password", "El password debe de ser mas de 6 letras").isLength({
      min: 6,
    }),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    //check("rol", "No es un rol valido").isIn(['ADMIN_ROLE','USER_ROLE']),
    check("rol").custom((rol) => esRolValido(rol)),
    check("correo").custom((correo) => existeEmail(correo)),
    validarCampos,
  ],
  userPost
);

router.delete(
  "/:id",
  [
    validarJWT,
    //esAdminRole,
    tieneRole("ADMIN_ROLE", "VENTAS_ROLE"),
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validarCampos,
  ],
  userDelete
);

router.patch("/", userPatch);

module.exports = router;
