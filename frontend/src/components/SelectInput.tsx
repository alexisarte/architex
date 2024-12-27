"use client";

import { Label, Select } from "flowbite-react";

const SelectInput = ({value="Select your option", id="options", options = ["United States", "Canada", "France", "Germany"]}) => {
  return (
    <div className="max-w-md">
      <div className="mb-2 block">
        <Label htmlFor={id} value={value} />
      </div>
      <Select id={id} required>
        {
            options.map((option) => (
                <option key={option} value={option}>{option}</option>
            ))
        }
      </Select>
    </div>
  );
};

export default SelectInput;
