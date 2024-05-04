// src/routes/api/upload/post.js
import { PrismaClient } from '@prisma/client';
import multer from 'multer';

const prisma = new PrismaClient();
const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

export async function post(req, res) {
    upload.single('image')(req, res, async (error) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded.' });
        }

        const { description } = req.body; 
        const { userId } = req.body; 

        try {
            const imageUrl = await uploadImageToStorage(req.file); 

            const uploadRecord = await prisma.upload.create({
                data: {
                    title: req.file.originalname,
                    content: imageUrl,
                    description: description,
                    authorId: userId
                }
            });

            res.json({ success: true, upload: uploadRecord });
        } catch (error) {
            console.error('Upload error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
}
