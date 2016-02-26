var fs      = require('fs');

var models = require('../models/leerkracht');
    module.exports = function(app, passport) {

      //ADD ANTWOORD =======================================================================
      app.post('/addAntwoord', function(req, res, next) {
        console.log('in antwoord');
          if (!req.body.antwoord) {
              return res.json({ error: 'Vul aub antwoord in' });
          }
          models.Leerkracht.findById(req.session.leerkrachtID,function(err,leerkracht)
          {
            if(!leerkracht.lessen.id(req.session.lesID).actief)
            {
              req.session.destroy(function (err) {
                    res.json({ redirect: '/logout' });
                   });
            }
            else{

            var newAntwoord=new models.Antwoord();
            newAntwoord.antwoord=req.body.antwoord;
            newAntwoord.voornaam=req.session.voornaam;
            newAntwoord.achternaam=req.session.achternaam;
            newAntwoord.img = req.session.img;

            newAntwoord.save(function (err){
                if (err) {console.log(err);
                  return res.json({ error: 'error saving new antwoord' });
                     console.log('error saving new antwoord');
                     console.log(err);
                 }
                 else {
                       console.log('new vraag saved successfully');

                       models.Leerkracht.findById(req.session.leerkrachtID, function(err, leerkracht){
                          leerkracht.lessen.id(req.session.lesID).vragen.id(req.body.vraagID).antwoorden.push(newAntwoord);
                           leerkracht.save(function (err){
                               if (err) {
                                 return res.json({ error: 'error adding new answer to list' });
                               console.log('error adding new answer to list');
                               console.log(err);
                               }
                                return res.json({ success: 'antwoord verzonden' });
                           });
                       });
                   };
                });
              }
        });



          });
        
        
        //Add Antwoord
        app.post('/addDrawing', function(req, res, next) {
            console.log('in antwoord add drawing');
           // console.log(req.body.img);
            //console.log(req.body.vraag);
            console.log(req.body.rand);
            
            //random getal om afbeelding in op te slaan..
            var r = req.body.rand;
            //Stuur les door en maak een directory voor de afbeelding
            var dir = './public/pics/'+req.body.les;

                if (!fs.existsSync(dir)){
                    fs.mkdirSync(dir);
                }
            
            var base64Data = req.body.img.replace(/^data:image\/png;base64,/, "");

            fs.writeFile(dir+"/"+r + ".png", base64Data, 'base64', function(err) {
                console.log("in AddDrawing functino");
                console.log(err);
                });

    });
        
        
        
        
    }; //END Export
