import Header from '@/components/Header.tsx';
import NavHeader from '@/components/NavHeader.tsx';
import Profile from'@/components/home/Profile.tsx';
import Values from "@/components/home/Values.tsx";
import FAQ from "@/components/home/FAQ.tsx"
import '@/styles/home.css'
import {STRINGS} from "@/strings.ts"

export default function HomePage(){
    return (
        <div className="home-page">
            <Header title={STRINGS.homePage.homeTitle} prev=""/>
            <NavHeader />
            <main id="main-content">
                <Profile />
                <Values />
                <FAQ />
            </main>
        </div>
    );
}