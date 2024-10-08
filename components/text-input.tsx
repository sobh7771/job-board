import React from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TextInputProps {
  id: string;
  label: string;
  type?: string; // Add the type prop here
  required?: boolean;
  [x: string]: any; // This allows for any additional props to be passed through
}

const TextInput: React.FC<TextInputProps> = ({
  id,
  label,
  type = "text",
  required = false,
  ...field // Spread the rest of the props here
}) => {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type={type} required={required} {...field} />{" "}
      {/* Spread field props */}
    </div>
  );
};

export default TextInput;
