const mongoose = require("mongoose");

const ChartDataSchema = new mongoose.Schema(
  {
    codigo_de_negociacao: {
      type: String,
    },
    date: {
      type: String,
    },
    open: {
      type: Number,
    },
    high: {
      type: number,
    },
    low: {
      type: Number,
    },
    close: {
      type: Number,
    },
    volume: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ChartData", ChartDataSchema);
