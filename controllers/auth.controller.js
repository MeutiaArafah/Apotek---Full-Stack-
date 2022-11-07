/** load model apoteker */
const apotekerModel = require(`../models/apoteker.models`)

/** load crypt */
const crypt = require(`../crypt`)

/** function utk menampilkan halaman login */
exports.showLogin = (request, response) => {
    try {
        return response.render(`../views/pages/login`)

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

/** function utk proses authentication */
exports.authentication = async (request, response) => {
    try {
        /** tampung data username & password */
        let username = request.body.username
        let password = request.body.password

        /** check kecocokan username */
        let result = await apotekerModel.ambilDataDenganParameter({ username: username })

        /** cek keberadaan data apoteker */
        if (result.length > 0) {
            /** kita cek dulu kecocokan password-nya */
            /** 123 === deskripsi(shjkshjksjkf) */
            if (password === crypt.deskripsi(result[0].password)) {
                /** login berhasil */
                /** menyimpan data user ke session */
                /** 'dataUser' = label of session*/
                request.session.dataUser = result[0]

                /** definisi cart di session */
                request.session.cart = []

                return response.redirect(`/obat`)
            } else {
                /** login gagal */
                return response.redirect(`/auth`)
            }
        } else {
            /** data apoteker tidak ada */
            return response.redirect(`/auth`)
        }

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

/** membuat function utk logout */
exports.logout = async (request, response) => {
    try {
        /** menghapus data user dari session */
        request.session.dataUser = undefined

        /** kembali ke halaman login */
        return response.redirect(`/auth`)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}