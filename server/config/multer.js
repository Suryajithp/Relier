const multer = require('multer')

const flileStorageEngine = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'../client/public/images')
    },
    filename: (req,file,cb)=>{
        cb(null,Date.now()+'--'+file.originalname)
    }
})

module.exports= multer({storage:flileStorageEngine})