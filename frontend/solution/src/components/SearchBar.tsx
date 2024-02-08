
import { MagnifyingGlassIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export const SearchBar = () => {
  const [isClicked, setIsClicked] = useState(false);

  const handleSearchBarClick = () => {
    setIsClicked(true);
  };

  const handleDismissButtonClick = () => {
    setIsClicked(false);
  };

  return (
    <div className="w-5/6 py-6 flex flex-col gap-4">
      <div className="flex items-center border-2 border-[#9CADE9] rounded-md px-0.5 cursor-pointer" onClick={handleSearchBarClick}>
        <MagnifyingGlassIcon className="h-9 w-9 text-[#9CADE9] px-1.5" />
        <input
          type="text"
          placeholder="Search for a course e.g. COMP1511"
          className="outline-none w-full bg-transparent px-3 text-sm placeholder-[#9CADE9]"
        />
      </div>

      {isClicked && (
        <div className="bg-white border border-black p-8 w-full h-60 rounded-md relative">
          <div className="rounded-md bg-[#CCEBF6] px-4 py-2 absolute bottom-0 left-0 ml-3 mb-3">
            <button className="text-sm flex flex-col flex-wrap" onClick={handleDismissButtonClick}>Close</button>
          </div>
        </div>
      )}

      <div className="w-[200px] h-11 flex flex-row items-center border border-slate-400 rounded-md shadow-md">
        <p className="px-4 text-sm flex-grow" style={{ color: "#989898" }}>Sort by</p>
        <ChevronDownIcon className="h-4 w-4 right-0 mr-4" />
      </div>
    </div>
  )
}