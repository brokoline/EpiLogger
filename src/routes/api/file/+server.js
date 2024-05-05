import { PrismaClient } from '@prisma/client';
import {put} from "@vercel/blob";

export async function POST({request, cookies}){
    const formData = await request.formData();
    const image = formData.get("image");
    const {url} = await put ("image/"+image.name,image,{access:"public"});
    const prisma = new PrismaClient();
    await prisma.upload.create({
        data:{
            authorId: request.user.id,
            description: url,
            title: "test",
            content: "test"
        }
    })
    return new Response("Ok", {status: 201})

}