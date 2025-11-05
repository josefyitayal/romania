
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
        <div className="p-6 md:p-10 w-full flex flex-col items-center gap-8 md:gap-10">
            {/* Heading */}
            {/* <h2 className="text-2xl md:text-4xl font-bold text-center"> */}
            {/*     Connect with us on Social Media */}
            {/* </h2> */}
            {/**/}
            {/* {/* Social Media Icons */}
            {/* <div className="w-full flex flex-wrap justify-center gap-4 md:gap-6"> */}
            {/*     {SocialMedias.map((item) => ( */}
            {/*         <Link key={item.id} href={item.link}> */}
            {/*             <img */}
            {/*                 src={item.icon} */}
            {/*                 alt={item.id} */}
            {/*                 className="h-12 w-12 md:h-16 md:w-16 bg-blue-500 p-2 rounded-md" */}
            {/*             /> */}
            {/*         </Link> */}
            {/*     ))} */}
            {/* </div> */}
            {/**/}
            {/* {/* Footer Links */}
            {/* <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm md:text-base"> */}
            {/*     {links.map((link) => ( */}
            {/*         <Link key={link.id} href={link.link} className="hover:underline"> */}
            {/*             {link.label} */}
            {/*         </Link> */}
            {/*     ))} */}
            {/* </div> */}

            {/* Copyright */}
            <p className="text-center text-sm md:text-lg font-bold">
                © Copyright 2025 rightway-romania-consultancy.site. All Rights Reserved.
            </p>
        </div>
    )
}
