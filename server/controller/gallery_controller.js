const Gallery = require('../schema/gallery_schema.js')
const { sort } = require('./utilityMethod.js');
const { recSkipper } = require('./utilityMethod.js');
const multer = require('multer');

const upload = multer({
    storage: multer.memoryStorage(),  // Store the image in memory as a buffer
    limits: {
      fileSize: 8 * 1024 * 1024,  // Limit file size to 8MB (adjust as needed)
    },
  });

const create = async (req, res) => {
    try {
        // Create a new services document based on the request body
        const { name, description} = req.body;

        let image = null;
        // If there's an image in the request, assign it. Otherwise, leave it as null.
        if (req.file) {
            image = req.file.buffer;
        }

        const newGallery = new Gallery({
            name,
            description,
            image
          });
        
        const savedGallery = await newGallery.save();
        // Send the saved Gallerys data as a response
        res.status(201).json(savedGallery); // 201 Created status code
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const getAll = async (req, res) => {
    try {

        sortFilter = sort(req.query.sort)
        recSkipper(req.query.page, req.query.pageSize);
        const gallery = await Gallery.find().skip(skip).limit(Number(req.query.pageSize));

        if (gallery.length < 1) {
            return res.status(404).json({ message: 'gallery not found' });
        }

        // Send the data as a response to the client
        res.status(200).json(gallery);
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getOne = async (req, res) => {
    const id = req.params.id;
    try {
        // Use Mongoose to query the MongoDB database for services data
        const gallery = await Gallery.findOne({_id:id});

        if (!gallery) {
            // If no gallery with the given ID is found, return a 404 response
            return res.status(404).json({ message: 'gallery not found' });
        }

        // Send the data as a response to the client
        res.status(200).json(gallery);
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const update = async (req, res) => {
    const id = req.params.id;
    try {
        // Find the services by ID
        const gallery = await Gallery.findOne({_id:id});

        if (!gallery) {
            return res.status(404).json({ message: 'gallery not found' });
        }
        const { name, description, price, duration } = req.body;

        if (name) gallery.name = name;
        if (description) gallery.description = description;
        if (req.file) {
            gallery.image = req.file.buffer;
        }

        // Save the updated gallery document
        await gallery.save();

        // Send the updated gallery data as a response
        res.status(200).json(gallery);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const remove = async (req, res) => {
    const id = req.params.id;
    try {
        // Use Mongoose to query the MongoDB database for Services data
        const result = await Gallery.deleteOne({_id:id});
        if (result.deletedCount === 0) {
            // If no document was deleted, it means the document with the given ID was not found
            return res.status(404).json({ message: 'services not found' });
        }
        // Send the data as a response to the client
        res.status(200).json({ message: 'services deleted' });
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};



module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    upload
};