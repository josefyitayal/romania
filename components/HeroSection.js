import Image from "next/image";

export function HeroSection() {
    return (
        <div className="w-full flex flex-col items-center">
            <Image src={"/only logo.png"} alt="logo" width={150} height={150} className="object-cover size-44" />
            <div className="flex flex-col items-center gap-16">
                <h1 className="text-4xl font-bold text-center capitalize">Ethiopia to Romania Immigration Consultants</h1>
                <div className="border-t border-black w-full" />
            </div>
        </div>
    )
}
