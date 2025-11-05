"use server";

import { db } from "@/db/drizzle";
import { bookCons } from "@/db/schema";   // your Drizzle schema
import { BookConsSchema } from "@/schema/BookConsSchema";
import { eq } from "drizzle-orm";
import otpGenerator from "otp-generator";

export const createUser = async (data) => {
    try {
        // ✅ Validate incoming data with Zod
        const parsed = BookConsSchema.parse(data);

        // ✅ Check if email already exists
        const existing = await db
            .select()
            .from(bookCons)
            .where(eq(bookCons.email, parsed.email))
            .limit(1);

        if (existing.length > 0) {
            return { errors: { message: "Email already registered" }, data: null };
        }

        const otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            specialChars: false,
            lowerCaseAlphabets: false,
        });

        // ✅ Insert new record with Drizzle
        const [user] = await db
            .insert(bookCons)
            .values({
                otpCode: otp,
                photo: parsed.photo,
                name: parsed.name,
                fatherName: parsed.fatherName,
                grandFatherName: parsed.grandFatherName,
                gender: parsed.gender,
                dateOfBirth: parsed.dateOfBirth,
                placeOfBirth: parsed.placeOfBirth,
                height: parsed.height,
                eyeColor: parsed.eyeColor,
                hairColor: parsed.hairColor,
                occupation: parsed.occupation,
                region: parsed.region,
                country: parsed.country,
                zone: parsed.zone,
                city: parsed.city,
                woreda: parsed.woreda,
                streetName: parsed.streetName,
                kebele: parsed.kebele,
                phoneNumber: parsed.phoneNumber,
                houseNo: parsed.houseNo,
                poBox: parsed.poBox ?? null,
                email: parsed.email,
            })
            .returning({
                id: bookCons.id,
                otpCode: bookCons.otpCode,
                otpCodeCreatedAt: bookCons.otpCodeCreatedAt,
            });

        return {
            errors: null,
            data: user,
        };
    } catch (error) {
        console.error(error);

        // Handle Zod validation errors separately
        if (error?.issues) {
            return {
                errors: error,
                data: null,
            };
        }

        return {
            errors: {
                message: "Failed to create user",
            },
            data: null,
        };
    }
};
