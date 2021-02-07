const router = require('express').Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json()) // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true }))

router.get('*', (_, res) => {
    return res.sendStatus(404);
})

module.exports = router;