import React, { forwardRef } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface TextInputProps {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  [x: string]: any; // This allows for any additional props to be passed through
}

// Use forwardRef to pass the ref down to the Input component
const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ id, label, type = 'text', required = false, ...field }, ref) => {
    return (
      <div>
        <Label htmlFor={id}>{label}</Label>
        <Input id={id} type={type} required={required} ref={ref} {...field} />
      </div>
    );
  },
);

TextInput.displayName = 'TextInput';

export default TextInput;
