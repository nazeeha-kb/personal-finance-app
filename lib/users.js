// database user logic lives here

import { prisma } from "./prisma";

export async function getOrCreateUser(clerkId, email, name) {

    // userId contains sumt like user_2xyzAbc123 which you'll store in db

    // find user by clerkId
    const user = await prisma.user.findUnique({
        where: {
            // using JS object shorthand here - same as - clerkId: clerkId,
            clerkId,
        }
    })

    if (user) {
        return user;
    }

    // Since we already return above, we don't need the below code under "else" block - it's called "early return"


    // create user
    const newUser = await prisma.user.create({
        data: {
            clerkId,
            name,
            email
        },
    })
    // return created user
    return newUser

}
