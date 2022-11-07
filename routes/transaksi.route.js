/** panggil si express */
const express = require(`express`)

/** buat object dari express */
const app = express()

/** ijin membaca data dari request body */
app.use(express.urlencoded({extended: true}))

/** panggil controllernya transaksi */
const transaksiController = require(`../controllers/transaksi.controller`)

/** panggil middleware utk auhorization */
const authorization = require(`../middleware/authorization`)

/** route utk menampilkan form transaksi */
app.get(`/add`, authorization.cekUser, transaksiController.showFormTransaksi)

/** export object app */
module.exports = app

