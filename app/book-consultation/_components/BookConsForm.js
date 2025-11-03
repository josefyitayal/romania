
"use client"

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CircularImageCrop } from "@/components/CircularImageCrop";
import { createUser } from "@/actions/createUser";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { BookConsSchema } from "@/schema/BookConsSchema";

export function ApplicantForm() {
    const form = useForm({
        resolver: zodResolver(BookConsSchema),
        mode: "onSubmit",
        defaultValues: {
            photo: "",
            name: "",
            fatherName: "",
            grandFatherName: "",
            gender: "Male",
            dateOfBirth: undefined,
            placeOfBirth: "",
            height: undefined,
            eyeColor: "",
            hairColor: "",
            occupation: "",
            region: "",
            country: "",
            zone: "",
            city: "",
            woreda: "",
            streetName: "",
            kebele: "",
            phoneNumber: "",
            houseNo: "",
            poBox: "",
            email: "",
        },
    });

    const onSubmit = async (data) => {
        const result = await createUser(data)
        console.log(result)
        if (result.errors) {
            toast.error(result.errors.message)
        } else {
            toast.success("Registration complete")
            return redirect(`/${result.data.id}/congra?otp=${result.data.otpCode}`)
        }
    };

    return (
        <div className="max-w-4xl mx-auto min-h-screen">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden space-y-8">
                {/* Header */}
                <div className="bg-blue-900 text-white w-full px-6 py-6">
                    <h1 className="text-2xl font-bold">Application Form</h1>
                    <p className="text-blue-100 mt-2">Please fill out all required fields accurately</p>
                </div>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                    {/* Photo */}
                    <Card className="border-l-4 border-l-orange-600">
                        <CardHeader className="bg-orange-50">
                            <CardTitle className="text-lg font-semibold text-orange-900">
                                Photo
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6 w-full">
                            <div className="space-y-2">
                                <Label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700">
                                    Photo *
                                </Label>
                                <Controller
                                    name="photo"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <CircularImageCrop
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                    )}
                                />
                                {form.formState.errors.photo && (
                                    <p className="text-red-600 text-sm">{form.formState.errors.photo.message}</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Personal Information Section */}
                    <Card className="border-l-4 border-l-blue-600">
                        <CardHeader className="bg-blue-50">
                            <CardTitle className="text-lg font-semibold text-blue-900">
                                Personal Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                                        Name *
                                    </Label>
                                    <Controller
                                        name="name"
                                        control={form.control}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                id="name"
                                                placeholder="Enter your name"
                                                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                            />
                                        )}
                                    />
                                    {form.formState.errors.name && (
                                        <p className="text-red-600 text-sm">{form.formState.errors.name.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="fatherName" className="text-sm font-medium text-gray-700">
                                        Father's Name *
                                    </Label>
                                    <Controller
                                        name="fatherName"
                                        control={form.control}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                id="fatherName"
                                                placeholder="Enter father's name"
                                                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                            />
                                        )}
                                    />
                                    {form.formState.errors.fatherName && (
                                        <p className="text-red-600 text-sm">{form.formState.errors.fatherName.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="grandFatherName" className="text-sm font-medium text-gray-700">
                                        Grandfather's Name *
                                    </Label>
                                    <Controller
                                        name="grandFatherName"
                                        control={form.control}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                id="grandFatherName"
                                                placeholder="Enter grandfather's name"
                                                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                            />
                                        )}
                                    />
                                    {form.formState.errors.grandFatherName && (
                                        <p className="text-red-600 text-sm">{form.formState.errors.grandFatherName.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="gender" className="text-sm font-medium text-gray-700">
                                        Gender *
                                    </Label>
                                    <Controller
                                        name="gender"
                                        control={form.control}
                                        render={({ field }) => (
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                                                    <SelectValue placeholder="Select gender" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Male">Male</SelectItem>
                                                    <SelectItem value="Female">Female</SelectItem>
                                                    <SelectItem value="Other">Other</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />
                                    {form.formState.errors.gender && (
                                        <p className="text-red-600 text-sm">{form.formState.errors.gender.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="dateOfBirth" className="text-sm font-medium text-gray-700">
                                        Date of Birth *
                                    </Label>
                                    <Controller
                                        name="dateOfBirth"
                                        control={form.control}
                                        render={({ field }) => (
                                            <Input
                                                id="dateOfBirth"
                                                type="date"
                                                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                                value={
                                                    field.value instanceof Date && !isNaN(field.value.getTime())
                                                        ? field.value.toISOString().split("T")[0]
                                                        : ""
                                                }
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    field.onChange(val ? new Date(val) : null);
                                                }}
                                            />
                                        )}
                                    />
                                    {form.formState.errors.dateOfBirth && (
                                        <p className="text-red-600 text-sm">{form.formState.errors.dateOfBirth.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="placeOfBirth" className="text-sm font-medium text-gray-700">
                                        Place of Birth *
                                    </Label>
                                    <Controller
                                        name="placeOfBirth"
                                        control={form.control}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                id="placeOfBirth"
                                                placeholder="Enter place of birth"
                                                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                            />
                                        )}
                                    />
                                    {form.formState.errors.placeOfBirth && (
                                        <p className="text-red-600 text-sm">{form.formState.errors.placeOfBirth.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="occupation" className="text-sm font-medium text-gray-700">
                                        Occupation *
                                    </Label>
                                    <Controller
                                        name="occupation"
                                        control={form.control}
                                        render={({ field }) => (
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger
                                                    id="form-occupation"
                                                    className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                                >
                                                    <SelectValue placeholder="Select occupation status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Employed">Employed</SelectItem>
                                                    <SelectItem value="Unemployed">Unemployed</SelectItem>
                                                    <SelectItem value="Entrepreneur">Entrepreneur</SelectItem>
                                                    <SelectItem value="Student">Student</SelectItem>
                                                    <SelectItem value="Retired">Retired</SelectItem>
                                                    <SelectItem value="Other">Other</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />
                                    {form.formState.errors.occupation && (
                                        <p className="text-red-600 text-sm">{form.formState.errors.occupation.message}</p>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Physical Characteristics Section */}
                    <Card className="border-l-4 border-l-green-600">
                        <CardHeader className="bg-green-50">
                            <CardTitle className="text-lg font-semibold text-green-900">
                                Physical Characteristics
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="height" className="text-sm font-medium text-gray-700">
                                        Height (cm) *
                                    </Label>
                                    <Controller
                                        name="height"
                                        control={form.control}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                id="height"
                                                type="number"
                                                step="0.01"
                                                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                                value={field.value ?? ""} // show empty string if undefined/null
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    // if empty, set undefined; otherwise parse as number
                                                    field.onChange(val === "" ? undefined : e.target.valueAsNumber);
                                                }}
                                            />
                                        )}
                                    />
                                    {form.formState.errors.height && (
                                        <p className="text-red-600 text-sm">{form.formState.errors.height.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="eyeColor" className="text-sm font-medium text-gray-700">
                                        Eye Color
                                    </Label>
                                    <Controller
                                        name="eyeColor"
                                        control={form.control}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                id="eyeColor"
                                                placeholder="Enter eye color"
                                                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                            />
                                        )}
                                    />
                                    {form.formState.errors.eyeColor && (
                                        <p className="text-red-600 text-sm">{form.formState.errors.eyeColor.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="hairColor" className="text-sm font-medium text-gray-700">
                                        Hair Color
                                    </Label>
                                    <Controller
                                        name="hairColor"
                                        control={form.control}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                id="hairColor"
                                                placeholder="Enter hair color"
                                                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                            />
                                        )}
                                    />
                                    {form.formState.errors.hairColor && (
                                        <p className="text-red-600 text-sm">{form.formState.errors.hairColor.message}</p>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Address Information Section */}
                    <Card className="border-l-4 border-l-purple-600">
                        <CardHeader className="bg-purple-50">
                            <CardTitle className="text-lg font-semibold text-purple-900">
                                Address Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="country" className="text-sm font-medium text-gray-700">
                                        Country *
                                    </Label>
                                    <Controller
                                        name="country"
                                        control={form.control}
                                        render={({ field }) => (
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                                                    <SelectValue placeholder="Select Country" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="ethiopia">Ethiopia</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />
                                    {form.formState.errors.country && (
                                        <p className="text-red-600 text-sm">{form.formState.errors.country.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="region" className="text-sm font-medium text-gray-700">
                                        Region *
                                    </Label>
                                    <Controller
                                        name="region"
                                        control={form.control}
                                        render={({ field }) => (
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                                                    <SelectValue placeholder="Select Region" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Addis Ababa">Addis Ababa</SelectItem>
                                                    <SelectItem value="Afar">Afar</SelectItem>
                                                    <SelectItem value="Amhara">Amhara</SelectItem>
                                                    <SelectItem value="Benishangul-Gumuz">Benishangul-Gumuz</SelectItem>
                                                    <SelectItem value="Dire Dawa">Dire Dawa</SelectItem>
                                                    <SelectItem value="Gambela">Gambela</SelectItem>
                                                    <SelectItem value="Harari">Harari</SelectItem>
                                                    <SelectItem value="Oromia">Oromia</SelectItem>
                                                    <SelectItem value="Sidama">Sidama</SelectItem>
                                                    <SelectItem value="Somali">Somali</SelectItem>
                                                    <SelectItem value="Southern Nations, Nationalities, and Peoples (SNNP)">
                                                        SNNP
                                                    </SelectItem>
                                                    <SelectItem value="South West Ethiopia Peoples">South West Ethiopia Peoples</SelectItem>
                                                    <SelectItem value="Tigray">Tigray</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />
                                    {form.formState.errors.region && (
                                        <p className="text-red-600 text-sm">{form.formState.errors.region.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="zone" className="text-sm font-medium text-gray-700">
                                        Zone *
                                    </Label>
                                    <Controller
                                        name="zone"
                                        control={form.control}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                id="zone"
                                                placeholder="Enter zone"
                                                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                            />
                                        )}
                                    />
                                    {form.formState.errors.zone && (
                                        <p className="text-red-600 text-sm">{form.formState.errors.zone.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="city" className="text-sm font-medium text-gray-700">
                                        City *
                                    </Label>
                                    <Controller
                                        name="city"
                                        control={form.control}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                id="city"
                                                placeholder="Enter city"
                                                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                            />
                                        )}
                                    />
                                    {form.formState.errors.city && (
                                        <p className="text-red-600 text-sm">{form.formState.errors.city.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="woreda" className="text-sm font-medium text-gray-700">
                                        Woreda *
                                    </Label>
                                    <Controller
                                        name="woreda"
                                        control={form.control}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                id="woreda"
                                                placeholder="Enter woreda"
                                                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                            />
                                        )}
                                    />
                                    {form.formState.errors.woreda && (
                                        <p className="text-red-600 text-sm">{form.formState.errors.woreda.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="kebele" className="text-sm font-medium text-gray-700">
                                        Kebele *
                                    </Label>
                                    <Controller
                                        name="kebele"
                                        control={form.control}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                id="kebele"
                                                placeholder="Enter kebele"
                                                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                            />
                                        )}
                                    />
                                    {form.formState.errors.kebele && (
                                        <p className="text-red-600 text-sm">{form.formState.errors.kebele.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="streetName" className="text-sm font-medium text-gray-700">
                                        Street Name *
                                    </Label>
                                    <Controller
                                        name="streetName"
                                        control={form.control}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                id="streetName"
                                                placeholder="Enter street name"
                                                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                            />
                                        )}
                                    />
                                    {form.formState.errors.streetName && (
                                        <p className="text-red-600 text-sm">{form.formState.errors.streetName.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="houseNo" className="text-sm font-medium text-gray-700">
                                        House Number *
                                    </Label>
                                    <Controller
                                        name="houseNo"
                                        control={form.control}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                id="houseNo"
                                                placeholder="Enter house number"
                                                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                            />
                                        )}
                                    />
                                    {form.formState.errors.houseNo && (
                                        <p className="text-red-600 text-sm">{form.formState.errors.houseNo.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="poBox" className="text-sm font-medium text-gray-700">
                                        P.O. Box
                                    </Label>
                                    <Controller
                                        name="poBox"
                                        control={form.control}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                id="poBox"
                                                placeholder="Enter P.O. Box (optional)"
                                                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                            />
                                        )}
                                    />
                                    {form.formState.errors.poBox && (
                                        <p className="text-red-600 text-sm">{form.formState.errors.poBox.message}</p>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Contact Information Section */}
                    <Card className="border-l-4 border-l-orange-600">
                        <CardHeader className="bg-orange-50">
                            <CardTitle className="text-lg font-semibold text-orange-900">
                                Contact Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700">
                                        Phone Number *
                                    </Label>
                                    <Controller
                                        name="phoneNumber"
                                        control={form.control}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                id="phoneNumber"
                                                placeholder="Enter phone number"
                                                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                            />
                                        )}
                                    />
                                    {form.formState.errors.phoneNumber && (
                                        <p className="text-red-600 text-sm">{form.formState.errors.phoneNumber.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                                        Email Address *
                                    </Label>
                                    <Controller
                                        name="email"
                                        control={form.control}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                id="email"
                                                type="email"
                                                placeholder="Enter email address"
                                                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                            />
                                        )}
                                    />
                                    {form.formState.errors.email && (
                                        <p className="text-red-600 text-sm">{form.formState.errors.email.message}</p>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Separator className="my-8" />

                    {/* Submit Section */}
                    <div className="bg-gray-50 p-6 rounded-lg border">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Ready to Submit?</h3>
                                <p className="text-gray-600 text-sm mt-1">
                                    Please review all information before submitting your application.
                                </p>
                            </div>
                            <Button
                                type="submit"
                                className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-3 text-lg font-semibold"
                                isabled={form.formState.isSubmitting}
                            >
                                {form.formState.isSubmitting ? "Submitting..." : "Submit Application"}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
