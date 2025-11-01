
import { z } from "zod";

export const BookConsSchema = z.object({
    photo: z.string().url("Photo must be a valid URL"),
    name: z.string()
        .min(2, "Name must be at least 2 characters")
        .max(64, "Name must be at most 64 characters"),
    fatherName: z.string()
        .min(2, "Father's name must be at least 2 characters")
        .max(64, "Father's name must be at most 64 characters"),
    grandFatherName: z.string()
        .min(2, "Grandfather's name must be at least 2 characters")
        .max(64, "Grandfather's name must be at most 64 characters"),
    gender: z.enum(["Male", "Female", "Other"], {
        errorMap: () => ({ message: "Please select a gender" }),
    }),
    dateOfBirth: z.date({
        required_error: "Date of birth is required",
        invalid_type_error: "Date of birth must be a valid date",
    }),
    placeOfBirth: z.string().min(1, "Place of birth is required"),
    height: z.number({
        required_error: "Height is required",
        invalid_type_error: "Height must be a number",
    }).min(1, "Height must be greater than 0"),
    eyeColor: z.string().min(1, "Eye color is required"),
    hairColor: z.string().min(1, "Hair color is required"),
    occupation: z.string().min(1, "Occupation is required"),
    region: z.string().min(1, "Region is required"),
    country: z.string().min(1, "Country is required"),
    zone: z.string().min(1, "Zone is required"),
    city: z.string().min(1, "City is required"),
    woreda: z.string().min(1, "Woreda is required"),
    streetName: z.string().min(1, "Street name is required"),
    kebele: z.string().min(1, "Kebele is required"),
    phoneNumber: z.string().min(1, "Phone number is required"),
    houseNo: z.string().min(1, "House number is required"),
    poBox: z.string().optional(),
    email: z.string().email("Invalid email address"),
});
