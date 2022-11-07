/** panggil model customer */
const {request, response}  = require("express")
const apotekerModel = require(`../models/apoteker.models`)

/** memanggil file crypt.js */
const crypt = require(`../crypt`)

exports.showDataApoteker = async (request, response) => {
    try {
        /** ambil data apoteker menggunakan model */
        let dataApoteker = await apotekerModel.ambilDataApoteker()

        /** passing ke view */
        let sendData = {
            page: `apoteker`,
            data: dataApoteker,
            dataUser: request.session.dataUser
        }
        return response.render(`../views/index`, sendData)

    } catch (error) {
        let senddata = {
            message: error
        }
        return response.render(`../views/error-page`, senddata)
    }
}

/** fungsi utk menampilkan form-apoteker utk tambah data */
exports.showTambahApoteker = async (request, response) => {
    try {
        /** prepare data yg akan dipassing
         * ke view
         */
        let sendData = {
            nama_apoteker: ``,
            username: ``,
            password: ``,
            page: `form-apoteker`,
            targetRoute: `/petugas/add`,
            deskripsi: crypt.deskripsi, // kuning = function
            dataUser: request.session.dataUser
        }
        return response.render(`../views/index`, sendData)

    } catch (error) {
        let senddata = {
            message: error
        }
        return response.render(`../views/error-page`, senddata)
    }
}

/** fungsi utk memproses data apoteker baru */
exports.prosesTambahData = async (request, response) => {
    try {
        /** membaca data dari yg diisikan user */
        let newData = {
            nama_apoteker: request.body.nama_apoteker,
            username: request.body.username,
            password: crypt.enkripsi(request.body.password)
        }
        /** eksekusi tambah data */
        await apotekerModel.tambahApoteker(newData)

        /** redirect(dialihkan) ke tampilan data petugas */
        return response.redirect(`/petugas`)

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

/** fungsi utk menampilkan data apoteker yang akan diubah */
exports.showEditApoteker = async (request, response) => {
    try {
        /** mendapatkan id dari customer yg akan diubah */
        let id = request.params.id

        /** menampung id ke dalam object */
        let parameter = {
            id: id
        }

        /** ambil data sesuai parameter */
        let apoteker = await apotekerModel.ambilDataDenganParameter(parameter)

        /** prepare data yg akan ditampilkan pada view */
        let sendData = {
            nama_apoteker: apoteker[0].nama_apoteker,
            username: apoteker[0].username,
            password: apoteker[0].password,
            page: `form-apoteker`,
            targetRoute: `/petugas/edit/${id}`, 
            deskripsi: crypt.deskripsi, // kuning = function
            dataUser: request.session.dataUser
        }

        return response.render(`../views/index`, sendData)

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

/** fungsi utk memproses data yg diedit */
exports.prosesUbahData = async (request, response) => {
    try {
        /** mendapatkan id yg diubah */
        let id = request.params.id

        /** membungkus id ke bentuk objek */
        let parameter = {
            id: id
        }

        /** menampung perubahan data ke dlm object */
        let perubahan = {
            nama_apoteker: request.body.nama_apoteker,
            username: request.body.username,
            password: crypt.enkripsi(request.body.password)
        }

        /** eksekusi perubahan data */
        await apotekerModel.ubahApoteker(perubahan, parameter)

        /** direct ke tampilan data apoteker */
        return response.redirect(`/petugas`)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

/** fungsi utk tombol hapus  */
exports.processDelete = async (request, response) => {
    try {
        /** read selected ID from URL parameter */
        let id = request.params.id
 
        /** store selected ID to object "parameter" */
        let parameter = {
            id: id // 'id' is similar as column's name of table
        }
 
        /** call function for delete data table of obat */
        await apotekerModel.delete(parameter)
 
        /** redirect to obat's page */
        return response.redirect(`/petugas`)
 
    } catch (error) {
        /** handling error */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
 }
 
 