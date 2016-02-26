var models = require('../models/leerkracht');
    module.exports = function(app, passport) {



    //START PRESENTATION ACTIEF=TRUE ==========================================================================
    app.post('/StartLeerkrachtPresentatie/:les_id', function(req, res,next) {

      models.Leerkracht.findById(req.user._id, function(err, leerkracht){
          console.log("in leerkracht "+leerkracht._id);
          leerkracht.lessen.id(req.params.les_id).actief=true;

          leerkracht.save(function (err){
              if (err) {
              console.log('error deleting les from list');
              console.log(err);
              }
              console.log("saved leerkracht ");
              return   res.json({ redirect: '/LeerkrachtPresentatie/'+req.params.les_id });
          });
      });
    });

    //STOP PRESENTATION ACTIEF=FALSE ==========================================================================
    app.post('/StopLeerkrachtPresentatie/:les_id', function(req, res,next) {

      models.Leerkracht.findById(req.user._id, function(err, leerkracht){
          console.log("in leerkracht "+leerkracht._id);
          leerkracht.lessen.id(req.params.les_id).actief=false;
            leerkracht.lessen.id(req.params.les_id).vragen.id(req.body.currentVraag_id).actief=false;

          leerkracht.save(function (err){
              if (err) {
              console.log('error deactivating les');
              console.log(err);
              }
              console.log("saved leerkracht ");
            return     res.json({ redirect: '/BeheerLessen'});
          });
      });
    });

    //PRESENTATION FIRST VRAAG ACTIEF=TRUE ==========================================================================
    app.post('/activateVraag', function(req, res,next) {

      models.Leerkracht.findById(req.user._id, function(err, leerkracht){
          console.log("in leerkracht "+leerkracht._id);
          leerkracht.lessen.id(req.body.les_id).vragen.id(req.body.currentVraag_id).actief=true;

          leerkracht.save(function (err){
              if (err) {
              console.log('error deleting les from list');
              console.log(err);
              }
              console.log("saved leerkracht ");
          });
      });
    });
        
    
        app.post('/ActiveerVraag',function(req,res){
            
            console.log("activeerVraag");
            console.log(req.body);
            console.log(req.body.currentVraag._id)
            
            
        });


    //PRESENTATION CHANGE VRAAG ACTIEF=FALSE/TRUE ==========================================================================
    app.post('/changeActiefVraag', function(req, res,next) {
      console.log("changing "+req.body.currentVraag_id+" to true");

      models.Leerkracht.findById(req.user._id, function(err, leerkracht){
          console.log("in leerkracht "+leerkracht._id);
          leerkracht.lessen.id(req.body.les_id).vragen.id(req.body.currentVraag_id).actief=true;
            leerkracht.lessen.id(req.body.les_id).vragen.id(req.body.previousVraag_id).actief=false;

          leerkracht.save(function (err){
              if (err) {
              console.log('error activating/deactivating les from list');
              console.log(err);
              }
              console.log("saved leerkracht ");
                console.log("changing "+req.body.currentVraag_id+" to true is completed");
          });
      });
    });


};
