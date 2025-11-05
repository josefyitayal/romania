
import Image from "next/image";
import Link from "next/link";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";

export function Navbar() {
    return (
        <div className="z-50 bg-white w-full flex items-center justify-between py-2 px-4 md:px-8 border-b border-border fixed">
            {/* Logo */}
            <Link href={"/"}>
                <Image
                    src={"/Logo frame(1).png"}
                    alt="logo"
                    width={100}
                    height={100}
                    className="h-28 sm:h-36 w-auto object-contain"
                />
            </Link>

            {/* Book Consultation button (always visible) */}
            <Button size="lg" asChild>
                <Link href={"/book-consultation"}>Book Consultation</Link>
            </Button>

            {/* Desktop Nav (extra links) */}
            <div className="hidden md:flex items-center gap-6">
                <Link href={"/code-checker"} className="text-sm font-medium">
                    Code Checker
                </Link>
            </div>

            {/* Mobile Menu (hamburger) */}
            <div className="md:hidden">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button size="icon" variant="ghost">
                            <Menu className="h-6 w-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right">
                        <SheetHeader>
                            <SheetTitle>Menu</SheetTitle>
                        </SheetHeader>
                        <div className="mt-4 flex flex-col gap-4">
                            {/* You can repeat the button here if you want it inside the drawer too */}
                            <Link href={"/book-consultation"}>Book Consultation</Link>
                            <Link href={"/code-checker"}>Code Checker</Link>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    )
}
