const prayerModel = require('../models/prayerModel')
const {getAllPrayer} = require("../models/prayerModel");

const getPrayers = (req, res) => {

    try{
        const prayers = await prayerModel.getAllPrayers();

        res.json({
        message: "Getting prayers"
    })
    }catch (error){
        res.status(500).json({
            message: "Failed to get prayer"
        })
    }
}

    


const getPrayer = (req,res) => {
    const {id} = req.params;
    
    res.json({
        message: `getting prayer ${id}`
    })

}

const postPrayer = (req, res) => {
    const {content} = req.body;

    res.status(200).json({
            message: `successfully added`
        
        })

}

const patchPrayer = (req, res) =>{
    const {content} = req.body;

    res.status(200).json({
        message: `prayer ${id} updated`,
        content
    })
}

const deletePrayer = (req, res) => {
    const {id} = req.param;

    res.status(200).json({
        message: `prayer ${id} deleted`
    })
}

module.exports = {
    getPrayer,
    getPrayers,
    postPrayer,
    patchPrayer,
    deletePrayer
}
