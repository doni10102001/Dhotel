var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/hotel', {useNewUrlParser: true, useUnifiedTopology: true});

var Schema = mongoose.Schema;

const User = mongoose.model('users', {
  nama: String,
  email: String,
  password: String
});

// Hotel

var hotelSchema = new Schema({
    nama: String,
    email: String,
    alamat: String,
    tlpon: String,
}, {collection: 'infoHotel'});

var hotelData = mongoose.model('hotelData', hotelSchema);

// End Hotel

// Kamar

var kamarSchema = new Schema({
    nomor: String,
	  lantai: String,
    fasilitas: [String],
    harga_permalam: String,
}, {collection: 'kamar'});

var kamarData = mongoose.model('kamarData', kamarSchema);

// End Kamar

/* GET home page. */

router.get('/', function(req, res, next) {
    
    let data = {
        title: 'Dhotel | Dashboard Admin',
    };
    res.render('admin/index', data);
});


// --------------------

// Informasi Hotel

// AllData

router.get('/infoHotel', (req, res) => {
    hotelData.find((err, docs) => {
        let data = {
            title: 'Dhotel | Man. Informasi Hotel',
            list: docs
        };

        if(!err){
            res.render('admin/info_hotel/index', data);
        }else{
            alert("Error Bos!" + err);
        }

    });
});

// End AllData

//tambah data
router.get('/TambahDataInfoHotel', (req, res) => {
    let data = {
        title: 'Tambah Data Info Hotel'
    };
    res.render('admin/info_hotel/add', data);
});
//end tambah data

// Function Post Data dam Update Data

function insertHotel(req, res){
    var item = {
        nama: req.body.nama,
        email: req.body.email,
        alamat: req.body.alamat,
        tlpon: req.body.kontak
    };

    var data = new hotelData(item);
    data.save();
    res.redirect('/admin/infoHotel');
}

function updateHotel(req, res){
    hotelData.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc) => {
        if(!err){
            res.redirect('/admin/infoHotel');
        }else{
            alert("Error" + err);
        }
    });
}

// End Function

// Post Data dan Update Data

router.post('/insert/hotel', (req, res) => {
    if(req.body._id == ''){
        insertHotel(req, res);
    }else{
        updateHotel(req, res);
    }
});

// End Post Data dan Update Data

// Get Data By ID
router.get('/infoHotel/:id', (req, res) => {
    hotelData.findById(req.params.id, (err, doc) => {
        let data = {
            title: 'Informasi Hotel',
            value: doc
        };
        if(!err){
            res.render('admin/info_hotel/ubah', data);
        }
    });
});
// End Get Data By ID

// Hapus Data
router.get('/delete/hotel/:id', (req, res) => {
    hotelData.findByIdAndRemove(req.params.id, (err, doc) => {
        if(!err){
            res.redirect('/admin/infoHotel');
        }else{
            alert("Error" + err);
        }
    });
});
// End Hapus Data


// End Informasi Hotel

// -------------------------------------------


// Manajemen Kamar Hotel


// All Data

router.get('/ManKamarHotel', (req, res) => {
    
    kamarData.find((err, docs) => {

        hotelData.find((err, doc) => {

        let data = {
            title: 'Dhotel | Manajemen Data Kamar Hotel',
            list: docs,
            item: doc
        };

        if(!err){
            res.render('admin/kamarHotel/index', data);
        }else{
            alert("Error Bos!" + err);
        }
    });

    }); 
});

// End Data All Data

//tambah data
    router.get('/TambahDataKamar', (req, res) => {
        let data = {
            title: 'Tambah Data Kamar Hotel'
        };
        res.render('admin/kamarHotel/add', data);
    });
//end tambah data


// Function Post Data dan Update Data
    function insertKamar(req, res){
        var item = {
            nomor: req.body.nomor,
            lantai: req.body.lantai,
            fasilitas: req.body.fasilitas,
            harga_permalam: req.body.harga_permalam,
        };
    
        var data = new kamarData(item);
        data.save();
        res.redirect('/admin/ManKamarHotel');
    }

    function updateKamar(req,res){
        kamarData.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc) => {
            if(!err){
                res.redirect('/admin/ManKamarHotel');
            }else{
                alert("Error" + err);
            }
        });
    }
// End Function Post Data dan Update Data



// Post Data dan Update Data

router.post('/insert', (req, res) => {
    if(req.body._id == ''){
        insertKamar(req, res);
    }else{
        updateKamar(req, res);
    }
});

// End Post dan Update Data


// Get Data By ID

router.get('/ManKamarHotel/:id', (req, res) => {
    kamarData.findById(req.params.id, (err, doc) => {
        let data = {
            title: 'Dhotel | Manajemen Data Kamar Hotel',
            value: doc
        };
        if(!err){
            res.render('admin/kamarHotel/ubah', data);
        }
    });
});

// End Get Data By ID

// Hapus Data
router.get('/delete/:id', (req, res) => {
    kamarData.findByIdAndRemove(req.params.id, (err, doc) => {
        if(!err){
            res.redirect('/admin/ManKamarHotel');
        }else{
            alert("Error" + err);
        }
    });
});
// End Hapus Data

// End Informasi Kamar Hotel

router.get('/logout', function(req, res, next) {
    res.redirect('/');
});


module.exports = router;