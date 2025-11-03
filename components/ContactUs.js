
import { Briefcase, Phone } from "lucide-react"

const items = [
    {
        id: 1,
        icon: Briefcase,
        title: "Working Hours",
        content: ["Mon-Fri: 9:00AM-5:30PM", "Saturday: 10:00AM-2:00PM "]
    },
    {
        id: 2,
        icon: Phone,
        title: "Phone Numbers",
        content: ["Local: +1 (647) 494-7977", "Toll Free: +1 (877) 494-7977"]
    }
]

export function ContantUs() {
    return (
        <div className="bg-gray-500 text-white w-full px-6 md:px-10 py-10 flex flex-col items-center gap-10">
            <h2 className="text-3xl md:text-5xl font-bold text-center">Contact Us</h2>

            {/* Responsive container */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-20">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="flex flex-col items-center text-center gap-5 max-w-xs"
                    >
                        <div className="rounded-full bg-white p-3">
                            <item.icon className="h-12 w-12 md:h-16 md:w-16 text-blue-600" />
                        </div>
                        <p className="text-lg md:text-xl font-bold">{item.title}</p>
                        <div className="flex flex-col gap-1">
                            {item.content.map((c, i) => (
                                <p key={i}>{c}</p>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
