import { getUser } from "@/actions/get-user";
import { redirect } from "next/navigation";
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const approvedPeople = [
    { name: "Abebe Bekele", gender: "Male", region: "Amhara" },
    { name: "Sara Alemu", gender: "Female", region: "Oromia" },
    { name: "Mulugeta Tesfaye", gender: "Male", region: "Tigray" },
    // ... add up to 20
]

async function CongraPage(props) {
    const searchParams = await props.searchParams;
    const userId = searchParams.userId

    if (!userId) {
        redirect("/")
    }

    const { data: user, errors } = await getUser(userId)
    if (errors) {
        return (
            <div>{errors.message}</div>
        )
    }

    return (
        <div className="">
            <div className="max-w-4xl mx-auto py-48 px-6">
                {/* User Photo */}
                <div className="flex flex-col items-center gap-3 justify-center mb-8">
                    <Image
                        src={user.photo} // replace with user.photo from DB
                        alt="Approved User"
                        width={160}
                        height={160}
                        className="rounded-md border border-gray-300 shadow"
                    />
                    <p className="text-center font-bold text-lg">{user.name} {user.fatherName}</p>
                </div>

                {/* Heading */}
                <h1 className="text-3xl font-bold text-center text-green-700 mb-4">
                    ✅ You Are Approved
                </h1>

                {/* Long Description */}
                <Card className="mb-10">
                    <CardHeader>
                        <CardTitle>Official Approval Notice</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-justify leading-relaxed">
                        <p>
                            This is to formally certify that your application has been reviewed
                            and approved. Out of <strong>400 applicants</strong>, you
                            have successfully met all requirements and are hereby recognized as
                            an officially approved individual.
                        </p>
                        <p>
                            Your information has been securely recorded in the national
                            registry. You are now part of the approved community, and we may
                            contact you for further verification, opportunities, or official
                            communications. Please ensure that your contact details remain
                            accurate and up to date.
                        </p>
                        <p>
                            This approval is a recognition of your compliance, integrity, and
                            eligibility. We congratulate you on this achievement and welcome you
                            into the approved group of citizens.
                        </p>

                        <p className="">For detailed guidance on how to proceed with your payment, please reach out directly to our only immigration agent assigned alemu semachew to your visa application. They will provide you with the appropriate instructions and ensure that all steps are completed accurately and in a timely manner.</p>
                    </CardContent>
                </Card>
                {/* <div className="flex flex-col items-center gap-8"> */}
                {/*     <p className="font-medium">For detailed guidance on how to proceed with your payment, please reach out directly to the immigration agent assigned to your visa application. They will provide you with the appropriate instructions and ensure that all steps are completed accurately and in a timely manner.</p> */}
                {/* </div> */}

                {/* Table of 20 Approved People */}
            </div>
        </div>
    )
}

export default CongraPage
