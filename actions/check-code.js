"use server"

import { db } from "@/db/drizzle"
import { bookCons } from "@/db/schema" // your table definition
import { eq } from "drizzle-orm"

export const checkCode = async (code) => {
    try {
        // query the first matching row
        const user = await db
            .select({
                id: bookCons.id,
                otpCode: bookCons.otpCode,
                otpCodeCreatedAt: bookCons.otpCodeCreatedAt,
            })
            .from(bookCons)
            .where(eq(bookCons.otpCode, code))
            .limit(1)

        const found = user[0]

        if (!found) {
            return { data: null, errors: { message: "User not found" } }
        }

        // check if code matches (redundant since we queried by otpCode, but kept for parity)
        if (found.otpCode !== code) {
            return { data: null, errors: { message: "Invalid code" } }
        }

        // check if within 24 hours
        const now = new Date()
        const diffMs = now.getTime() - found.otpCodeCreatedAt.getTime()
        const diffHours = diffMs / (1000 * 60 * 60)

        if (diffHours > 24) {
            return { data: { id: found.id, success: true }, errors: null }
        }

        return {
            data: { success: false },
            errors: { message: "wait 24 hours for approved" },
        }
    } catch (error) {
        console.error(error)
        return {
            data: false,
            errors: { message: "Something went wrong" },
        }
    }
}
