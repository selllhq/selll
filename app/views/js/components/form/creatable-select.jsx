import { useState } from "react";
import CreatableSelect from "react-select/creatable";

const Select = ({ placeholder, ...props }) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <CreatableSelect
            {...props}
            isMulti={props.isMulti}
            placeholder={typeof placeholder === "string" ? placeholder : placeholder(isFocused)}
            classNames={{
                control: ({ isFocused }) =>
                    "block w-full !bg-gray-100 dark:!bg-[#2C2C2C] dark:!border-0 !text-gray-900 dark:!text-white !rounded-lg " +
                    (isFocused
                        ? "!ring-ring !outline-hidden !ring-offset-2 !shadow-none"
                        : ""),
                placeholder: () =>
                    "!text-gray-500 dark:!text-gray-400 !text-sm",
                input: () => "!text-gray-900 dark:!text-white",
                indicatorSeparator: () => "!hidden",
                menu: () =>
                    "!bg-gray-100 dark:!bg-[#2C2C2C] !rounded-lg !shadow-lg !border !border-gray-200 dark:!border-[#2C2C2C]",
                option: ({ isFocused }) =>
                    "cursor-pointer !text-gray-900 dark:!text-white " +
                    (isFocused
                        ? "!bg-gray-200 dark:!bg-[#3A3A3A] !text-gray-900 dark:!text-white"
                        : ""),
                multiValue: () => "!bg-gray-200 dark:!bg-[#3A3A3A] !text-gray-900 dark:!text-white",
                multiValueLabel: () => "!text-gray-900 dark:!text-white",
                multiValueRemove: () =>
                    "!text-gray-500 dark:!text-gray-400 hover:!text-gray-900 dark:hover:!text-white hover:!bg-gray-300 dark:hover:!bg-[#4A4A4A] !rounded-full !p-1",
                noOptionsMessage: () => "!text-gray-500 dark:!text-gray-400 !text-sm",
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
        />
    );
};

export default Select;
