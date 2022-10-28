const express = require("express")
const os = require("os")
const multer = require("multer")
const router = express.Router()
const controller = require("../controllers/pages")
const iToken = require("../helpers/iToken")

const upload = multer({ dest: os.tmpdir() });


router.get('/', controller.home)
router.post('/backupcheck/:source', controller.backupCheck)
router.post('/backup/:source', iToken.backups, upload.single('file'), controller.backup)

module.exports = router