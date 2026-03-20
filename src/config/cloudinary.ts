import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import { Request } from 'express';

cloudinary.config({
  cloud_name: process.env['CLOUDINARY_CLOUD_NAME'],
  api_key: process.env['cloudinary_Api_key'],
  api_secret: process.env['cloudinary_Api_secret'],
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'user_avatars',
    format: async (_req: Request, _file: Express.Multer.File) => 'png', // or keep original form
    public_id: (_req: Request, _file: Express.Multer.File) => `avatar-${Date.now()}`,
  } as any,
});

export const upload = multer({ storage: storage });
export default cloudinary;
