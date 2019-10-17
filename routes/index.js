var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/hotel', {
	useNewUrlParser: true, 
	useUnifiedTopology: true
});

var Schema = mongoose.Schema;

// User

var userSchema = new Schema({
    nama: String,
    email: String,
    password: String,
}, {collection: 'user'});

var userData = mongoose.model('userData', userSchema);

// End User


// Hotel

var hotelS = new Schema({
	nama: String,
	email: String,
    alamat: String,
    tlpon: String,
}, {collection: 'infoHotel'});

var hotelD = mongoose.model('hotelD', hotelS);

// End Hotel

// Kamar

var kamarS = new Schema({
    nomor: String,
	lantai: String,
    fasilitas: [String],
    harga_permalam: String,
}, {collection: 'kamar'});


var kamarD = mongoose.model('kamarD', kamarS);

// End Kamar

// Login

router.get('/login', function(req, res, next){
    let data = {
        layout: 'login',
        title: 'Sign In',
    };
    res.render('login', data);
});

router.post('/login', function(req, res, next) {
  let data = req.body;
  
  userData.find({
    email: data.email
  }, function (err, docs) {
    if (docs[0].password === data.pass) {
      res.redirect('/admin');
    } else {
      res.redirect('/login');
    }
  });
});

// End Login

/* GET home page. */
router.get('/', function(req, res, next) {
 
 hotelD.find((err, docs) => {
 	
 	kamarD.find((err, doc) => {
 		if(!err){
 		res.render('index', {
 			list: docs,
 			item: doc
 		});
	 	}else{
	 		alert("Error!" + err);
	 	}
 	});
 	
 });

});


router.get('/kamars/:id', function(req, res, next){
	kamarD.findById(req.params.id, (err, resKamar) => {
		 	let data = {
            title: 'Informasi Kamar',
            item: resKamar
        };

        if(!err){
            res.render('infoKamar', data);
        }
	});
});

module.exports = router;