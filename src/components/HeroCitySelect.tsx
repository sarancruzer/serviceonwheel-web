"use client";

import Select, { components, type DropdownIndicatorProps } from "react-select";

export type CitySelectOption = {
  label: string;
  value: string;
};

type HeroCitySelectProps = {
  onChange: (option: CitySelectOption) => void;
  onMenuClose?: () => void;
  onMenuOpen?: () => void;
  options: CitySelectOption[];
  value: CitySelectOption | null;
};

function DropdownIndicator(
  props: DropdownIndicatorProps<CitySelectOption, false>,
) {
  return (
    <components.DropdownIndicator {...props}>
      <i className="ti ti-chevron-down" />
    </components.DropdownIndicator>
  );
}

export default function HeroCitySelect({
  onChange,
  onMenuClose,
  onMenuOpen,
  options,
  value,
}: HeroCitySelectProps) {
  return (
    <div className="sow-hero-search__field sow-hero-search__field--city">
      <span className="sow-hero-search__icon" aria-hidden="true">
        <i className="ti ti-map-pin" />
      </span>

      <Select<CitySelectOption, false>
        className="sow-city-select"
        classNamePrefix="sow-city-select"
        components={{
          DropdownIndicator,
          IndicatorSeparator: null,
        }}
        isClearable={false}
        isSearchable
        menuPlacement="auto"
        menuPortalTarget={
          typeof document !== "undefined" ? document.body : undefined
        }
        noOptionsMessage={({ inputValue }) =>
          inputValue ? "No matching cities" : "No cities available"
        }
        onChange={(selectedOption) => {
          if (selectedOption) {
            onChange(selectedOption);
          }
        }}
        onMenuClose={onMenuClose}
        onMenuOpen={onMenuOpen}
        options={options}
        placeholder="Select city"
        styles={{
          menuPortal: (base) => ({
            ...base,
            zIndex: 1080,
          }),
        }}
        value={value}
      />
    </div>
  );
}
