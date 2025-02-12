import multer from "multer";
import path from "path";
import fs from "fs";

const createMulterInstance = (destinationPath: string) => {
  if (!fs.existsSync(destinationPath)) {
    fs.mkdirSync(destinationPath, { recursive: true });
  }

  // Configure storage
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, destinationPath); 
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, `${Date.now()}-${file.fieldname}${ext}`);
    },
  });

  const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"));
    }
  };

  return multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
  });
};

export default createMulterInstance;
