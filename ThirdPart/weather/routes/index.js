var express = require('express');
var router = express.Router();

module.exports = function(app) {
    /* GET home page. */
    app.get('/latest_data/:id', function(req, res, next) {
        const db = app.get('db');
        // Get the data from DB
        db.yuri27.weather.findOne(Number(req.params.id))
            .then(function(result) {
                if(result){
                    res.render('index', {
                        title: 'Weather',
                        subtitle: 'Here you can see the weather for the selected city',
                        entry: result
                    })
                }
                else{
                    res.render('error', {
                        title: 'ERROR',
                        subtitle: 'Here you will see detailed information about the error',
                        message: 'ERROR request, Please try again!',
                        status: '',
                        stack: 'ERROR request'
                    })
                }
            })
            .catch(
                function (err) {
                    res.render('error', {
                        title: 'ERROR',
                        subtitle: 'Here you will see detailed information about the error',
                        message: 'dssssssss',
                        status: '',
                        stack: ''
                    })
                });
    });
    return router;
};
