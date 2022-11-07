    /** memanggil model obat */
    const obatModel = require(`../models/obat.model`)

    /** memanggil model customer */
    const customerModel = require(`../models/customer.model`)

    /** function utk menampilkan form transaksi */
    exports.showFormTransaksi = async (request, response) => {
        try {
            /** ambil data obat */
            let obat = await obatModel.findAll()
            /** ambil data customer */
            let customer = await customerModel.ambilDataCustomer()

            /** prepare data yg akan dipassing ke view */
            let sendData = {
                dataObat: obat, // array object
                dataCustomer: customer, 
                page: `form-transaksi`, 
                no_faktur: ``,
                tgl_transaksi: ``,
                dataObatString: JSON.stringify(obat), // string
                // JavaScriptObjectNotation = JSON 
                dataUser: request.session.dataUser,
                cart: request.session.cart
            }
            return response.render(`../views/index`, sendData)
        } catch (error) {
            /** handling error */
            let sendData = {
                message: error
            }
            return response.render(`../views/error-page`, sendData)
        }
    }

/** membuat fungsi utk menambahkan obat ke keranjang */
exports.addToCart = async(request, response) => {
    try {
        /** dapetin data obat berdasarkan id_obat 
         * yg dikirimkan
         */
        let selectedObat = await obatModel.findByCriteria({
            id: request.body.id_obat
        })
        /** tampung / receive data yg dikirimkan  */
        let storeData = {
            id_obat: request.body.id_obat,
            nama_obat: selectedObat[0].nama_obat,
            jumlah_beli: request.body.jumlah_beli,
            harga_beli: request.body.harga_beli
        }

        /** masukkan data ke keranjang menggunakan session */
        request.session.cart.push(storeData)
        /** push() -> menambah data ke dalam array */

        /** direct ke halaman form-transaksi */
        return response.redirect(`/transaksi/add`)

    } catch (error) {
        /** handling error */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}