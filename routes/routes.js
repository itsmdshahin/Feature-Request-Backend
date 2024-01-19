const express = require('express');
const { getAllFeature, PostNewFeature } = require('../controllers/featureRequest');

const router = express.Router();

/**
 * @route Get api/feature 
 * @description get all feature
 * @access public
 */
router.get('/', getAllFeature);
/**
 * @router POST api/feature
 * @description add a new feature
 * @access private
 */
router.post('/' , PostNewFeature);

/**
 * @router PUT api/feature/:id
 * @description update feature
 * @access private 
 */
router.put('/:id' , );

/**
 * @router DELETE api/feature/:id
 * @description delete feature
 * @access private
 */
router.delete('/:id' , );

/**
 * @router Vote api/feature/:id
 * @description Vote feature
 * @access private
 */


module.exports = router;