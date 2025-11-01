import { ContantUs } from "@/components/ContactUs";
import { Content } from "@/components/Content";
import { FeaturedIn } from "@/components/FeaturedIn";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { Button } from "@/components/ui/button";
import { VideoPlayer } from "@/components/VideoPlayer";

export default function Home() {
    return (
        <div className="w-full pt-48 flex flex-col gap-5 items-center px-20">
            <HeroSection />
            <Content />
            <VideoPlayer />
            <FeaturedIn />
            <ContantUs />
            <Footer />
        </div>
    );
}
