import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const main = async () => {
    // Write Prisma Client queries here
    console.log("It works?")

    /*
	// Get all phones and console.log them
	const phones = await prisma.phones.findMany({   // SELECT * FROM phones
        // select: {                                   // SELECT manufacturer, model FROM phones
        //     manufacturer: true,
        //     model: true,
        //     // imei: true                              // SELECT imei FROM phones
        // },
        where: {
            manufacturer: "Apple",
        }
    })
	console.log("Phones:", phones)

	// Get all users and console.log them
	const users = await prisma.users.findMany()
	console.log("User:", users)
    */

    /*
    // Get the first user that matches our query
	const user = await prisma.users.findFirst({
        where: {
            // id: 2,
            name: "Korben Dallas"
        }
    })
	console.log("User:", user)
    */

    /*
    // Get all users who's name starts with "Th" and console.log them
    // SELECT * FROM users WHERE name LIKE "Th%" eller "%an%"
    const users = await prisma.users.findMany({
        where: {
            name: {
                // startsWith: "Th",
                // endsWith: "an",
                // contains: "an",
            },
        },
        orderBy: [  // Sort name ascending but id descending
            {
                name: 'asc',
            },
            {
                id: 'desc',
            },
        ],
        take: 2,
        skip: 1,
     })
     console.log("Users:", users)
    */

    /*
    // Get a specific user
     const user = await prisma.users.findUnique({
        where: {
            id: 2
        }
     })
     console.log("Unique user:", user)
     */

     /*
     // Get a specific user and their phone(s)
     const user = await prisma.users.findUnique({
        where: {
            id: 4,
        },
        include: {
            phones: true
        }
     })
     console.log(user)
     */

    // Get all the users and their phones
    const users = await prisma.users.findMany({
        include: {
            phones: true
        }
    })
    console.dir(users, { depth: null})
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async e => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
