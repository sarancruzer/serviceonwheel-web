"use client";

import Select from "react-select";

export type ServiceSortValue = "featured" | "price-asc" | "price-desc";

type ServiceSortOption = {
  label: string;
  value: ServiceSortValue;
};

const options: ServiceSortOption[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price Low to High" },
  { value: "price-desc", label: "Price High to Low" },
];

export default function ServiceSortSelect({
  value,
  onChange,
}: {
  onChange: (value: ServiceSortValue) => void;
  value: ServiceSortValue;
}) {
  return (
    <Select<ServiceSortOption, false>
      className="sow-select"
      classNamePrefix="sow-select"
      isSearchable={false}
      options={options}
      value={options.find((option) => option.value === value)}
      onChange={(selectedOption) => {
        if (selectedOption) {
          onChange(selectedOption.value);
        }
      }}
    />
  );
}
