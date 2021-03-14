const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

module.exports = {
  // defini pra onde vão os arquivos assim que fizer o upload
  dest: path.resolve(__dirname, "..", "..", "temp", "uploads"),
  storage: multer.diskStorage({
    destination: (request, file, callback) => {
      callback(null, path.resolve(__dirname, "..", "..", "temp", "uploads"));
    },
    filename: (request, file, callback) => {
      // garantir que as imagens tenha o nome unico
      crypto.randomBytes(16, (err, hash) => {
        if (err) callback(err);
        // Montado o nome da imagem com um hash e pegando o hash e convertendo para hexdecimal 
        // e concat com o nome original da imagem
        const fileName = `${hash.toString("hex")}-${file.originalname}`;
        callback(null, fileName);
      });
    },
  }),
  limits: {
    //   definindo o tamanho max do arquivo para 2MB
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (request, file, callback) => {
    //   definindo os tipos de extensões que serão aceitas
    const allowedMimes = [
      "image/jpeg",
      "image/pjpeg",
      "image/png",
      "image/gif",
    ];
    if (allowedMimes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error("Invalid file type."));
    }
  },
};