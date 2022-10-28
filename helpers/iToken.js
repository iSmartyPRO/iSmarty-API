const {tokens} = require("../config")

module.exports.backups = (req, res, next ) => {
    const result = {
        status: false
    }
    const isTokenExist = tokens.find( item => item.token === req.headers.itoken)
    if(isTokenExist){
        const isAllowedBackup = isTokenExist.resources.includes('backups')
        if(isAllowedBackup) {
            const isSourceOk = isTokenExist.sources.includes(req.params.source)
            if(isSourceOk) {
                result.status = true
                next()
            } else {
                result.message = "You are not allow for this source"
            }
        } else {
            result.message = "You are not allowed for backup"
        }
    } else {
        result.message = "Token problem"
    }


    if(!result.status) {
        res.status(401).json(result)
    }
}