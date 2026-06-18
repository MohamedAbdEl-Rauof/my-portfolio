"use client";
import TimelineComp from "./components/TimelineComp";
import ExperienceSection from "./components/ExperienceSection";
import InfiniteLogoSlider from "./components/InfiniteLogoSlider";

export default function Home() {

    return (
        <div>
            <TimelineComp/>
            <ExperienceSection/>
            <InfiniteLogoSlider/>
        </div>
    );
}