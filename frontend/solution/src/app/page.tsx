"use client"

import { Navbar } from "@/components/Navbar";
import { SearchBar } from "@/components/SearchBar";

import { coursesData } from "../../courses";
import { Card } from "@/components/Card";
import { useState } from "react";

export default function Home() {
  const [titleClicked, setTitleClicked] = useState(false);

  return (
    <main className="flex min-h-screen">
      <Navbar />
      <div className="flex flex-row flex-col w-full items-center pl-20">
        <div className="flex flex-row flex-col py-4 gap-3 w-5/6">
          <p className="text-md">DevSoc presents</p>
          <h1 className="text-7xl" style={{ fontWeight: "bolder", color: titleClicked ? "#B789E5" : "#1279F2", cursor: "pointer" }} onClick={() => setTitleClicked(!titleClicked)}>unilectives</h1>
          <p className="text-md" style={{ fontWeight: "bold" }}>Your one-stop shop for UNSW course and elective reviews.</p>
        </div>

        {/* Search Bar and Sort By Button */}
        <SearchBar />

        <div className="grid grid-cols-3 gap-x-12 gap-y-8 mt-4 items-center w-5/6">
          {coursesData.map(course => (
            <Card
              key={course.courseCode}
              course={course}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
