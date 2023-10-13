const multer = require('multer');

//* Storage

const storage = multer.diskStorage({
    destination:(req,file,callback) => {
        callback(null,'./uploads')
    },
    filename:(req,file,callback) => {
        callback(null,`image-${Date.now()}-${file.originalname}`)
    }
})

//* Define Upload

const upload = multer({storage})

module.exports = upload