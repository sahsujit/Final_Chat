import multer from 'multer';

const upload = multer({
  limits: {
    fileSize: 1024 * 1024 * 5 // 5 MB
  }
});

// Export a specific middleware (e.g., single file upload with field name "avatar")
export const multerUpload = upload.single('avatar'); // change 'avatar' to match your frontend form field
