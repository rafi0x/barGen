const router = require('express').Router();
const { getIndex, postIndex } = require('../controller');

router.route('/').get(getIndex);
router.route('/').post(postIndex);

module.exports = router;
