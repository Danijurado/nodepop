const express = require('express');
const router = express.Router();
const Advertisements = require('../../models/Advertisements');

const rangePrice = function(range) {
    if (!range.includes('-')) {return range}
    const [gte, lte] = range.split('-');

    const filter = {};
    if (lte) {
        filter.$lte = lte;
    }
    if (gte) {
        filter.$gte = gte;
    }
    return filter
}

const tagFilter = function (tags) {
    const tagArr = tags.split(',');
    return {$in: tagArr}
}
//GET /api/advertisements
//devuelve lista de anuncios
/**
 * @openapi
 * /api/advertisements:
 *  get:
 *   description: Devuelve una lista de anuncios
 *   responses:
 *    200:
 *     description: Devuelve JSON
 */
router.get('/', async (req, res, next) => {
    try {
        const filterByName = req.query.name;
        const filterByType = req.query.type;
        const price = req.query.price;
        const tags = req.query.tags
        //paginacion
        const skip = req.query.skip;
        const limit = req.query.limit;

        //ordenacion
        const sort = req.query.sort;

        //field seleccion
        const fields = req.query.fields;
        
        const filtro = {};
        if (filterByName) {
            filtro.name = new RegExp('^' + filterByName, "i"); 
        }

        if (filterByType === 'false') {
            filtro.type = 'sell';
        } else if (filterByType == 'true') {
            filtro.type = 'buy';
        }

        //filtrar precio por rango
        if (price) {
            filtro.price = rangePrice(price);
        }

        if (tags) {
            filtro.tags = tagFilter(tags);
        }

    
        const advertisements = await Advertisements.lista(filtro, skip, limit, sort, fields);

        res.json({results: advertisements})

    } catch (err) {
        next(err);
    }
});

//GET /api/advertisements/(_id)
//devuelve un anuncio
/**
 * @openapi
 * /api/advertisements/(_id):
 *  get:
 *   description: Devuelve un anuncio
 *   responses:
 *    200:
 *     description: Devuelve JSON
 */
router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;

        const advertisements = await Advertisements.findById(id);
        res.json({result: advertisements});
    } catch (err) {
      next(err);  
    }
});

//PUT /api/advertisements/(_id)
//actualiza un anuncio
/**
 * @openapi
 * /api/advertisements/(_id):
 *  put:
 *   description: Actualiza un anuncio
 *   responses:
 *    200:
 *     description: Devuelve JSON
 */
router.put('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = req.body; 

      const updateAdvertisements = await Advertisements.findByIdAndUpdate(id, data, {new: true});
      res.json({updateAdvertisements});

    } catch (err) {
      next(err);  
    }
});

//POST /api/advertisements
//crear un anuncio
/**
 * @openapi
 * /api/advertisements/:
 *  post:
 *   description: Crea un anuncio
 *   responses:
 *    200:
 *     description: Devuelve JSON
 */
router.post('/', async (req, res, next) => {
    try {
      const advertisementsData = req.body;

      //crear anuncio nuevo
      const advertisements = new Advertisements(advertisementsData);

      //guardar en BD
      const advertisementsSave = await advertisements.save();

      res.json({result: advertisementsSave});
    } catch (err) {
      next(err);  
    }
});

//DELETE /api/advertisements/(_id)
//elimina un anuncio
/**
 * @openapi
 * /api/advertisements/(_id):
 *  delete:
 *   description: actualiza un anuncio
 *   responses:
 *    200:
 *     description: Devuelve JSON
 */
router.delete('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      
      await Advertisements.deleteOne({_id: id});

      res.json();
    } catch (err) {
      next(err)  
    }
})

module.exports = router;
