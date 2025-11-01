
import Image from "next/image";
import Link from "next/link";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";

export function Navbar() {
    return (
        <div className="z-50 bg-white w-full flex items-center justify-center gap-36 py-1 px-8 border-b border-border fixed">
            <Link href={"/"}>
                <Image src={"/Logo frame(1).png"} alt="logo" width={100} height={100} className="size-36 object-cover" />
            </Link>

            <Button size="lg" asChild>
                <Link href={"/book-consultation"}>
                    Book Consultation
                </Link>
            </Button>

            <Sheet>
                <SheetTrigger asChild>
                    <Button size={"lg"} variant={"icon"}><Menu className="size-10" /></Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Menu</SheetTitle>
                    </SheetHeader>
                    <div className="px-8 flex flex-col gap-3">
                        <Link href={"book-consultation"}>Book Consultation</Link>
                        <Link href={"code-checker"}>Code Checker</Link>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}
