import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';


export async function POST({ request, cookies }) {
    const body = await request.json();
    const { username, password } = body;
    const prisma = new PrismaClient();
    const user = await prisma.user.findFirst({ where: { email: username } });
    console.log(user);
    const match = bcrypt.compareSync(password, user.hashPass);
    if (match) {
        cookies.set('session', 'admin', { httpOnly: true, path: '/' }); // cookies
        return new Response('Logged in', { status: 200 });
    } else {
        return new Response('Unauthorized', { status: 401 });
    }
}
