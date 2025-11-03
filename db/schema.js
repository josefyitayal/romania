import { pgTable, varchar, text, timestamp, pgEnum, real } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

// Enum
export const genderEnum = pgEnum("Gender", ["Male", "Female", "Other"]);

export const bookCons = pgTable("BookCons", {
    id: varchar("id", { length: 36 })
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),

    otpCode: text("otpCode").notNull().unique(),
    otpCodeCreatedAt: timestamp("otpCodeCreatedAt", { withTimezone: true })
        .defaultNow()
        .notNull(),

    photo: text("photo").notNull(),

    name: varchar("name", { length: 64 }).notNull(),
    fatherName: varchar("fatherName", { length: 64 }).notNull(),
    grandFatherName: varchar("grandFatherName", { length: 64 }).notNull(),

    gender: genderEnum("gender").notNull(),

    dateOfBirth: timestamp("dateOfBirth", { withTimezone: true }).notNull(),
    placeOfBirth: text("placeOfBirth").notNull(),

    height: real("height").notNull(),

    eyeColor: text("eyeColor").notNull(),
    hairColor: text("hairColor").notNull(),
    occupation: text("occupation").notNull(),
    region: text("region").notNull(),
    country: text("country").notNull(),
    zone: text("zone").notNull(),
    city: text("city").notNull(),
    woreda: text("woreda").notNull(),
    streetName: text("streetName").notNull(),
    kebele: text("kebele").notNull(),
    phoneNumber: text("phoneNumber").notNull(),
    houseNo: text("houseNo").notNull(),

    poBox: text("poBox"), // optional

    email: text("email").notNull().unique(),

    createdAt: timestamp("createdAt", { withTimezone: true })
        .defaultNow()
        .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true })
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull(),
});
