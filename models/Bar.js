"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const barSchema = new Schema({
  id: Number,
  nombre: String,
  tipo: String,
  descripcion: String,
  ubicacion: String,
  tipoComida: String
});

const Bar = mongoose.model("bar", barSchema, "Bar");

module.exports = Bar;
