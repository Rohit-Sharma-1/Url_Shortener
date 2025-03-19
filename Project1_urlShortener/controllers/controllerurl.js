import {Url} from '../Models/ModelUrl.js';
import shortid from "shortid";

// we have installed shortid package for generating shortcodes (npm i shortid)
export const shortUrl = async (req, res) => {
    const longUrl = req.body.longurl;
    const shortCode = shortid.generate();

    const shortUrl = "http://localhost:3000/" + shortCode;

    // save to database
    const newUrl = new Url({shortCode, longUrl});
    await newUrl.save();

    res.render("index.ejs",{shortUrl});
}

export const redirectUrl = async (req, res) => {
    const shortCode = req.params.shortCode

    // find the shortCode in the database
    const originalUrl = await Url.findOne({shortCode});

    if(originalUrl){
        res.redirect(originalUrl.longUrl);
    }else{
        res.status(404).json("Url not found");
    }
}