import { useState, Fragment, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { Option } from "./T";

/* interface Props {
    onFilterChange: () => void,
} */

const FilterForTypes = (/* { onFilterChange }:Props */) => {

  const options: Option[] = [
    { opt: "all" },
    { opt: "price from low to high" },
    { opt: "price from high to low" },
    { opt: "size from small to bigg" },
    { opt: "size from big to small" },
    { opt: "color from light to dark" },
    { opt: "color from dark to light" },
    { opt: "only available items" },
  ]

  const [selected, setSelected] = useState<Option>(options[0])
  const [sortingOptions, setSortingOptions] = useState([])

  /*   const handleFilterChange = () => {
    onFilterChange();
  }; */

  useEffect(() => {
    const loadSortingOptions = async () => {
      try {
        const response = await axios.get("/api/sorting-options")
        setSortingOptions(response.data)
      } catch (error) {
        console.error("Error fetching sorting options:", error)
      }
    }

    loadSortingOptions();
  }, [])

  return (
    <div className="w-72">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-grey-300 sm:text-sm">
            <span className="block truncate">{selected.opt}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {options.map((option, optIdx) => (
                <Listbox.Option
                  key={optIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-gray-300 text-black" : "text-gray-900"
                    }`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {option.opt}
                      </span>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

export default FilterForTypes
