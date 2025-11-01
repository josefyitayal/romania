"use server"

import { client } from "@/lib/db"

export const getUser = async (userId) => {
    try {
        const user = await client.BookCons.findUnique({
            where: {
                id: userId
            }
        })

        if (user) {
            return {
                errors: null,
                data: user
            }
        } else {
            return {
                errors: {
                    message: "User not found"
                },
                data: null
            }
        }

    } catch (error) {
        console.error(error)
        return {
            errors: {
                message: "something went wrong"
            },
            data: null
        }
    }
}
