
"use server";

import { client } from "@/lib/db";
import { BookConsSchema } from "@/schema/BookConsSchema";
import otpGenerator from 'otp-generator';

export const createUser = async (data) => {
    try {
        // ✅ Validate incoming data with Zod
        const parsed = BookConsSchema.parse(data);

        const otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            specialChars: false,
            lowerCaseAlphabets: false
        });

        // ✅ Create new record in Prisma
        const user = await client.bookCons.create({
            data: {
                otpCode: otp,
                photo: parsed.photo,
                name: parsed.name,
                fatherName: parsed.fatherName,
                grandFatherName: parsed.grandFatherName,
                gender: parsed.gender,
                dateOfBirth: parsed.dateOfBirth, // already a Date if using z.date()
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
            },
        });

        return {
            errors: null,
            data: user,
        };
    } catch (error) {
        console.error(error);

        // Handle Zod validation errors separately
        if (error instanceof Error && "issues" in error) {
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
