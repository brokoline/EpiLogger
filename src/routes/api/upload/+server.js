import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function post(req, res) {
    const { image, description } = req.files; 
    const { userId } = req.body; 

   
    try {
        const imageUrl = await uploadImageToStorage(image); // gemmer billedet
        const upload = await prisma.upload.create({
            data: {
                title: image.name,
                content: imageUrl,
                description: description,
                authorId: userId
            }
        });
        res.status(200).json(upload);
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
