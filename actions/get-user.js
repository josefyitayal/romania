"use server";

import { db } from "@/db/drizzle";
import { bookCons } from "@/db/schema"; // your Drizzle schema
import { eq } from "drizzle-orm";

export const getUser = async (userId) => {
    try {
        const rows = await db
            .select()
            .from(bookCons)
            .where(eq(bookCons.id, userId))
            .limit(1);

        const user = rows[0];

        if (user) {
            return { errors: null, data: user };
        } else {
            return { errors: { message: "User not found" }, data: null };
        }
    } catch (error) {
        console.error(error);
        return {
            errors: { message: "something went wrong" },
            data: null,
        };
    }
};
