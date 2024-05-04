import { PrismaClient } from '@prisma/client';
import multer from 'multer';

const prisma = new PrismaClient();
const upload = multer({ storage: multer.memoryStorage() });

export const post = upload.single('image', async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    try {
        const imageUrl = await uploadImageToStorage(req.file);
        const uploadRecord = await prisma.upload.create({
            data: {
                title: req.file.originalname,
                content: imageUrl,
                description: req.body.description,
                authorId: req.body.userId
            }
        });

        res.status(200).json(uploadRecord);
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
