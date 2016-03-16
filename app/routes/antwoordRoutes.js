var fs      = require('fs');

var models = require('../models/leerkracht');
    module.exports = function(app, passport) {

      //ADD ANTWOORD =======================================================================
      app.post('/addAntwoord', function(req, res, next) {
        console.log('in antwoord');
          
          if (!req.body.antwoord) {
              return res.json({ error: 'Vul aub antwoord in' });
          }
          
          console.log(req.session.leerkrachtID);
          models.Leerkracht.findById(req.session.leerkrachtID,function(err,leerkracht)
          {
              
            if(leerkracht.lessen !=null){
            
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
                if (err) {
                     console.log('error saving new antwoord');
                     console.log(err);
                     console.log(err);
                     return res.json({ error: 'error saving new antwoord' });                    
                 }
                
                 else {
                       console.log('new vraag saved successfully');

                        //We saven de antwoorden bij de leerkracht
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
            }
        });



          });
        
        
         //REMOVE ANTWOORD =======================================================================
      app.post('/removeAntwoord', function(req, res, next) {
       
          console.log('in REMOVE antwoord');
          console.log(req.body.lesID);
          
          var les_id = req.body.lesID;
          
          models.Les.find({_id:req.body.lesID},function(err,les){
             // console.log(les);
              var leerkracht_id = les[0].leerkrachtID;
              
              
              models.Leerkracht.findById(leerkracht_id,function(err,docent){                 
              
                                    if (err) {
                                        console.log(err);
                                    }
                  //console.log(docent);
                  for(var i=0; i<docent.lessen.length;i++){
                      
                      if(docent.lessen[i]._id == les_id){
                          //Loop over antwo
                         // console.log(docent.lessen[i]);
                          for(var j=0;j<docent.lessen[i].vragen.length;j++)
                              {
                                  //console.log("de vraag:");
                                  //console.log(docent.lessen[i].vragen[j]);
                                 // console.log("tom "+ req.body.vraagID);
                                  if(docent.lessen[i].vragen[j]._id == req.body.vraagID)
                                   {
                                      
                                       console.log("aantal "+docent.lessen[i].vragen[j].antwoorden.length);
                                       
                                       docent.lessen[i].vragen[j].antwoorden = [];
                                      
                                       //Now Save this empty array:
                                       
                                       
                                       console.log(docent.lessen[i].vragen[j]);
                                       // save the user
                                        
                                       docent.save(function(err) {
                                            if (err) throw err;

                                            console.log('docent successfully updated!');
                                        });
                                       
                                   }
                              }
                              
                      }
                  }
                  
                  
              });
              
          });
          //GET THE RIGHT TEACHER
          /*models.Les.findbyId(req.body.lesID,function(err,les){
            console.log("in les")
              console.log(les);
          });*/
         //console.log(models.Les);
          //console.log(docentID);
         
          //Find teacher
         // models.Leerkracht.findById(docentID, function(err, leerkracht){
                            
           //   console.log(leerkracht);
            /* for(var i=0;i<leerkracht.lessen.id(req.session.lesID).vragen.id(req.body.vraagID).antwoorden.length;i++)
              {
                  console.log(leerkracht.lessen.id(req.session.lesID).vragen.id(req.body.vraagID).antwoorden[i]);
              }*/
              /*
                leerkracht.save(function (err){
                                
                                    if (err) {
                                        return res.json({ error: 'error adding new answer to list' });
                                        console.log('error adding new answer to list');
                                        console.log(err);
                                    }
                                return res.json({ success: 'antwoord verzonden' });
                });
                */
         // });


          });
        
        
        //Add Tekening Antwoord
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
