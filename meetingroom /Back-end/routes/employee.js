const express = require("express");
const Employee = require("../models/employee");
const router = express.Router();

module.exports = function(passport){

// router.use(passport.authenticate("auth", {session : false}), ( req, res, next) =>{
//     next();
// })
router.get("/detail/:id", (req, res) => {
    Employee.findById(req.params.id, (error, result) => {
        if(error){
            res.status(500).json(error);
        }else{
            res.json(result);
        }
    });
});

router.get("/updatephoto/:id", (req, res) => {
    Employee.findById(req.params.id, (error, result) => {
        if(error){
            res.status(500).json(error);
        }else{
            res.json(result);
        }
    });
});


router.get("/update/:id", (req, res) => {
    Employee.findById(req.params.id, (error, result) => {
        if(error){
            res.status(500).json(error);
        }else{
            res.json(result);
        }
    });
});

    router.get("/:id", passport.authenticate("auth", {session : false}) , (req, res) => {
    
        Employee.findById(req.params.id, (error, result) => {
            if(error){
                res.status(500).json(error);
            }
            else{
                res.json(result)
            }
        });
    
    });
    
    router.get("/", passport.authenticate("auth", {session : false}) , (req, res) => {
    
        Employee.find({}, (error, result) => {
            if(error){
                res.status(500).json(error);
            }
            else{
                res.json(result)
            }
        });
    });
   
    
    router.delete("/:id", (req, res) => {
    
        Employee.findByIdAndRemove(req.params.id, (error, result) => {
            if(error){
                res.status(500).json(error);
            }
            else{
                res.json({ message : "Data deleted" })
            }
        });
        
    });

    router.put("/book/:id", (req, res) => {
        // if (!req.files.picture) {
        //     return res.status(400).send("No files were uploaded");
        // }

        // let image = req.files.picture;
        // //extLast mengambil extension dari file
        // let ext = image.name.split(".");
        // let extLast = ext[ext.length - 1].toLowerCase();

       
                let newObj = {
                    status: req.body.status
                };

        Employee.findByIdAndUpdate(req.params.id, newObj,  (error, result) => {
            if(error){
                res.status(500).json(error);
            }
            else {
                res.status(500).json({ message : "Data updated" })
            }
        });

            });  

            router.put("/updatephoto/:id", (req, res) => {
                if (!req.files.picture) {
                    return res.status(400).send("No files were uploaded");
                }
        
                let image = req.files.picture;
                //extLast mengambil extension dari file
                let ext = image.name.split(".");
                let extLast = ext[ext.length - 1].toLowerCase();
        
               
                if (extLast == "png" || extLast == "jpg" || extLast == "jpeg" || extLast == "bmp" || extLast == "gif") {
                    let imageName = Date.now() + "." + extLast;
                    image.mv("./public/room/" + imageName, (error) => {
                        let newObj = {
                            picture: "http://localhost:3000/room/" + imageName,
                        };
        
                Employee.findByIdAndUpdate(req.params.id, newObj,  (error, result) => {
                    if(error){
                        res.status(500).json(error);
                    }
                    else {
                        res.status(500).json({ message : "Data updated" })
                    }
                });
        
                    });
        
                }
                else {
                    return res.status(400).send("Error")
                };
        
            
            
            });
        
    
    
    router.put("/:id", (req, res) => {
      

                    let newObj = {
                    name: req.body.name,
                    location : req.body.location,
                    price: req.body.price,
                    description: req.body.description,
                    status: req.body.status,
                    telephone : req.body.telephone,
                    email : req.body.email
                    // picture: "http://localhost:3000/room/" + imageName,
                };

        Employee.findByIdAndUpdate(req.params.id, newObj,  (error, result) => {
            if(error){
                res.status(500).json(error);
            }
            else {
                res.status(500).json({ message : "Data updated" })
            }
        });

            });

        
     
    
    

    router.post("/new", passport.authenticate("auth", {session : false}) , (req, res) => {
        if (!req.files.picture) {
            return res.status(400).send("No files were uploaded");
        }

        let image = req.files.picture;
        //extLast mengambil extension dari file
        let ext = image.name.split(".");
        let extLast = ext[ext.length - 1].toLowerCase();


        if (extLast == "png" || extLast == "jpg" || extLast == "jpeg" || extLast == "bmp" || extLast == "gif") {
            let imageName = Date.now() + "." + extLast;

            image.mv("./public/room/" + imageName, (error) => {

                let newObj = new Employee({
                    name: req.body.name,
                    location : req.body.location,
                    price: req.body.price,
                    description: req.body.description,
                    status: req.body.status,
                    telephone : req.body.telephone,
                    email : req.body.email,
                    picture: "http://localhost:3000/room/" + imageName,
                });

                newObj.save((error) => {
                    if (error) {
                        res.status(500).send(error);
                    } else {
                        res.json(newObj);
                    }
                });
            });

        } else {
            return res.status(400).send("Error")
        };
    });

    return router;
};