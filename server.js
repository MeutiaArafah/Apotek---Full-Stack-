/** load library express */
const express = require(`express`)

/** load library express-session */
const session = require(`express-session`)

/** instance "app" object */
const app = express()

/** define port for the server */
const PORT = `8000`

/** set view engine to ejs */
app.set(`view engine`, `ejs`)

/** session configuration */
app.use(session({
    secret: `i love javascript`,
    resave: false,
    saveUninitialized: false
}))

/** load routes */
const obat = require(`./routes/obat.route`)
const customer = require(`./routes/customer.route`)
const apoteker = require(`./routes/apoteker.route`)
const auth = require(`./routes/auth.route`)
const transaksi = require(`./routes/transaksi.route`)
const cart = require(`./routes/cart.route`)

/** define prefix for route obat */
app.use(`/obat`, obat)

/** define prefix utk customer */
app.use(`/pelanggan`, customer)

/** define prefix utk apoteker */
app.use(`/petugas`, apoteker)

/** define prefix for route auth */
app.use(`/auth`, auth)

/** define prefix for transaksi */
app.use(`/transaksi`, transaksi)

/** define prefix for route cart */
app.use(`/cart`, cart)

/** running web server based on defined PORT */
app.listen(PORT, () => {
    console.log(`Server Apotek is running on port ${PORT}`);
})
