const express = require('express');
const router = express.Router();
const Advertisements = require('../../models/Advertisements');

//GET /api/advertisements
//devuelve lista de anuncios
router.get('/', async (req, res, next) => {
    try {
        const advertisements = await Advertisements.find();
        res.json({results: advertisements})
    } catch (err) {
        next(err);
    }
});

//GET /api/advertisements/(_id)
router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;

        const advertisements = await Advertisements.findById(id);
        res.json({result: advertisements});
    } catch (error) {
      next(err);  
    }
})

module.exports = router;
