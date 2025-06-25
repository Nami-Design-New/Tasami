import React, { useState } from "react";
import { Link } from "react-router";
import SectionHeader from "../../ui/website/home/SectionHeader";
import HelperCard from "../../ui/cards/HelperCard";
export default function PersonalHelper() {
    const [activeTab, setActiveTab] = useState("الكل");

   const helpers = [
    {
        id: 1,
        name: "انس تركي",
        country: "السعودية",
        rating: 4.4,
        type: "ريادي",
        members: 40,
        price: 248,
        image: "/images/p2.png",
        status: true,
    },
    {
        id: 2,
        name: "مها صالح",
        country: "الإمارات",
        rating: 4.7,
        type: "تقنية",
        members: 35,
        price: 212,
        image: "/images/p1.png",
        status: true,
    },
    {
        id: 3,
        name: "انس تركي",
        country: "السعودية",
        rating: 4.4,
        type: "ريادي",
        members: 40,
        price: 228,
        image: "/images/p2.png",
        status: true,
    },
    {
        id: 4,
        name: "مها صالح",
        country: "الإمارات",
        rating: 4.7,
        type: "تقنية",
        members: 35,
        price: 292,
        image: "/images/p1.png",
        status: true,
    },
];

    const types = [...new Set(helpers.map((helper) => helper.type))];

    const tabs = ["الكل", ...types];

    const filteredhelpers =
        activeTab === "الكل"
            ? helpers
            : helpers.filter((helper) => helper.type === activeTab);

    return (
        <div className="personal-helpers container page">
            <SectionHeader
                title="المساعدون الشخصيون"
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                resultCount={filteredhelpers.length}
            />

<div className="row g-5">
                {filteredhelpers.map((helper) => (
                    <div className="col-12 col-md-6 col-lg-4">
                        <HelperCard key={helper.id} helper={helper} />
                    </div>

                ))}
            </div>
        </div>
    );
}
