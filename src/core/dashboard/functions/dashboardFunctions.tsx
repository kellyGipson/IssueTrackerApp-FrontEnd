import React, { SetStateAction } from "react";


export function handleActiveNav(prevSelectedNavItem: string, currentSelectedNavItem: string, setPrevSelectedNavItem: React.Dispatch<SetStateAction<string>>) {
  if(currentSelectedNavItem !== "addDown" && currentSelectedNavItem !== "addUp") {
    document.getElementById(`${prevSelectedNavItem}`)?.children[0].classList.remove("text-teal-400");
    document.getElementById(`${prevSelectedNavItem}`)?.children[1]?.classList.remove("text-teal-400");
    document.getElementById(`${prevSelectedNavItem}Container`)?.children[1].classList.remove("text-neutral-700");
    document.getElementById(`${prevSelectedNavItem}Container`)?.children[1].classList.remove("font-bold");
    document.getElementById(`${prevSelectedNavItem}Selector`)?.classList.add("hidden");
    setPrevSelectedNavItem(currentSelectedNavItem);
    document.getElementById(`${currentSelectedNavItem}`)?.children[0].classList.add("text-teal-400");
    document.getElementById(`${currentSelectedNavItem}`)?.children[1]?.classList.add("text-teal-400");
    document.getElementById(`${currentSelectedNavItem}Container`)?.children[1].classList.add("text-neutral-700");
    document.getElementById(`${currentSelectedNavItem}Container`)?.children[1].classList.add("font-bold");
    document.getElementById(`${currentSelectedNavItem}Selector`)?.classList.remove("hidden");
  }
  if(currentSelectedNavItem === "addDown") {
    document.getElementById(`${prevSelectedNavItem}`)?.children[0].classList.remove("text-teal-400");
    document.getElementById(`${prevSelectedNavItem}`)?.children[1]?.classList.remove("text-teal-400");
    document.getElementById(`${prevSelectedNavItem}Container`)?.children[1].classList.remove("text-neutral-700");
    document.getElementById(`${prevSelectedNavItem}Container`)?.children[1].classList.remove("font-bold");
    document.getElementById(`${prevSelectedNavItem}Selector`)?.classList.add("hidden");
    setPrevSelectedNavItem(currentSelectedNavItem);
  }
}

