const { responsive } = require("express");

const userGet = (req, res = responsive) => {
  const query = req.query;

  res.json({
    msg: "get API - Controller",
    query,
  });
};

const userPost = (req, res = responsive) => {
  const body = req.body;

  res.json({
    msg: "get API - Controller",
    body,
  });
};

const userDelete = (req, res = responsive) => {
  res.json({
    msg: "get API - Controller",
  });
};

const userPut = (req, res = responsive) => {
  const { id } = req.params;
  res.json({
    msg: "get API - Controller",
    id,
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
