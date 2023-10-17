const About = require('../schema/about_schema.js')

const update = async (req, res) => {
    const id = req.params.id;
    try {
        const about = await About.findOne({_id:id});
        if (!about) {
            return res.status(404).json({ message: 'about not found' });
        }
        const { text } = req.body;
        if (text) about.text = text
        await about.save();
        res.status(200).json(about);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const get = async (req, res) => {
    const id = req.params.id;
    try {
        const about = await About.findOne({_id:id});
        if (!about) {
            return res.status(404).json({ message: 'about not found' });
        }
        
        res.status(200).json(about);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};



module.exports = {
    update,
    get
};

//Module for Admin-related actions and routes.
//This module provides functions for creating, retrieving, updating, and deleting admin profiles.
