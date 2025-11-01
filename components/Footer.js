
import Link from "next/link";

const SocialMedias = [
    {
        id: 1,
        icon: "/facebook.svg",
        link: "/"
    },
    {
        id: 2,
        icon: "/tiktok.svg",
        link: "/"
    },
    {
        id: 3,
        icon: "/telegram.svg",
        link: "/"
    },
    {
        id: 4,
        icon: "/mail.svg",
        link: "/"
    },
]

const links = [
    {
        id: 1,
        label: "Privacy Policy",
        link: "/"
    },
    {
        id: 2,
        label: "Pricing terms",
        link: "/"
    },
    {
        id: 3,
        label: "Terms of Use",
        link: "/"
    },
]

export function Footer() {
    return (
        <div className="p-10 w-full flex flex-col items-center gap-10">
            <h2 className="text-4xl font-bold">Connect with us on Social Media</h2>
            <div className="w-full flex items-center justify-center gap-5">
                {SocialMedias.map((item) => (
                    <Link key={item.id} href={item.link}>
                        <img src={item.icon} className="size-16 bg-blue-500 p-2 rounded-md" />
                    </Link>
                ))}
            </div>
            <div className="flex items-center gap-5">
                {links.map((link) => (
                    <Link key={link.id} href={link.link} >
                        {link.label}
                    </Link>
                ))}
            </div>
            <p className="text-center text-lg font-bold">© Copyright 2025 RightWayRomania.com. All Rights Reserved.</p>
        </div>
    )
}
