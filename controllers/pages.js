const fs = require("fs");
const SambaClient = require('samba-client');

const config = require("../config")




module.exports.home = (req, res) => {
    res.json({status: true})
}

module.exports.backupCheck = async (req, res) => {
  const result = {
    status: false
  }
  try {
    let client = new SambaClient(config.shares.backups);
    await client.dir(`backups\\${req.params.source}\\${req.body.file}`);
    result.status = true
  } catch (err) {
    console.log(err)
    result.message = err.shortMessage
  }
  res.status(result.status == true ? 200 : 500).json(result)
}

module.exports.backup = async (req, res) => {
    // Значение результата, по умолчанию
    const result = {
      status: false
    }
    const { file } = req
    let client = new SambaClient(config.shares.backups)
    
    // Проверка существоваия Source
    const backupFolder = await client.list(`backups`)
    const isSourceExist = backupFolder.find(item => item.name === req.params.source )

    // Если не существует то создать папку Source
    if(!isSourceExist){
      await client.mkdir(`/backups/${req.params.source}`)
    }

    // Копирование файла на storage
    try {
      await client.sendFile(file.path, `/backups/${req.params.source}/${file.originalname}`);
      // удалить после копирования
      await fs.promises.unlink(file.path)
      result.status = true
    } catch (err) {
      result.message = "More details aout error on server console"
      console.log(err)
    }
    res.status(result.status == true ? 201 : 500).json(result)
}