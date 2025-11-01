"use server"

import { client } from "@/lib/db"

export const checkCode = async (code) => {
    try {
        // make sure to await the query
        const user = await client.BookCons.findFirst({
            where: { otpCode: code },
            select: {
                id: true,
                otpCode: true,
                otpCodeCreatedAt: true,
            },
        })

        if (!user) {
            return { data: null, errors: { message: "User not found" } }
        }

        // check if code matches
        if (user.otpCode !== code) {
            return { data: null, errors: { message: "Invalid code" } }
        }

        console.log(user.otpCode, user)
        // check if within 24 hours
        const now = new Date()
        const diffMs = now.getTime() - user.otpCodeCreatedAt.getTime()
        const diffHours = diffMs / (1000 * 60 * 60)

        if (diffHours > 24) {
            return { data: { id: user.id, success: true }, errors: null }
        }

        return { data: { success: false }, errors: { message: "wait 24 hours for approved" } }
    } catch (error) {
        console.error(error)
        return {
            data: false,
            errors: { message: "Something went wrong" },
        }
    }
}
