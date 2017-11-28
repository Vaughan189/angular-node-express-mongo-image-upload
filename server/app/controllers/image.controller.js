var Image = require('../models/image.model.js');

exports.create = function(req, res) {
    // Create and Save a new image
        console.log(req.body);
        console.log(req.body.image_name);
        console.log(req.body.path);
        var image = new Image({ 
            image_name: req.body.image_name ,
            path: req.body.path 
        });
        image.save(function(err, data) {
            console.log(data);
            if (err) {
                console.log(err);
                // res.status(500).send({ message: "Some error occurred while creating the image." });
            } else {
                // res.send(data);
                res.send({message : "Insert succesfull"});
                console.log("Insert succesfull");
            }
        });
    };

exports.findAll = function(req, res) {
    // Retrieve and return all images from the database.
    Image.find(function(err, data) {
        if (err) {
            res.status(500).send({ message: "Some error occurred while retrieving images." });
        } else {
            res.send(data);
        }
    });
};

exports.findOne = function(req, res) {
    // Find a single image with a imageId
    Image.findById(req.params.imageId, function(err, data) {
        if (err) {
            res.status(500).send({ message: "Could not retrieve image with id " + req.params.imageId });
        } else {
            res.send(data);
        }
    });
};

exports.update = function(req, res) {
    // Update a image identified by the imageId in the request
    Image.findById(req.params.imageId, function(err, data) {
        if (err) {
            res.status(500).send({ message: "Could not find a image with id " + req.params.imageId });
        }

        data.image_name = req.body.image_name;
        data.path = req.body.path;

        image.save(function(err, data) {
            if (err) {
                res.status(500).send({ message: "Could not update image with id " + req.params.imageId });
            } else {
                res.send({message : "Update succesfull"});
                console.log("Update succesfull");
            }
        });
    });
};

exports.delete = function(req, res) {
    // Delete a image with the specified imageId in the request
    Image.remove({ _id: req.params.imageId }, function(err, data) {
        if (err) {
            res.status(500).send({ message: "Could not delete image with id " + req.params.id });
        } else {
            res.send({ message: "image deleted successfully!" })
        }
    });
};