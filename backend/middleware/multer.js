const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("Went Inside this\n");
    
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    console.log(file);
    
    const uniqueSuffix = file.originalname;
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
