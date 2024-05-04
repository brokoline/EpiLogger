import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { image, description } = req.files;  
      const { userId } = req.body; 

      // gemmer billedet
      const imageUrl = await uploadImageToStorage(image);

      // Create upload record in the database
      const upload = await prisma.upload.create({
        data: {
          title: image.name,
          content: imageUrl,
          description: description,
          authorId: userId
        }
      });

      res.status(200).json({ success: true, upload });
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  } else {
    // Handle any non-POST requests
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
