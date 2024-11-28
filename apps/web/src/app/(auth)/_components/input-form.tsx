import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { FieldError } from "react-hook-form";

type Props = {
  id: string;
  label: string;
  type: React.HTMLInputTypeAttribute;
  placeholder?: string;
  register: (...args: any) => any;
  error?: FieldError;
};

const InputForm: React.FC<Props> = (props) => {
  const { id, label, placeholder, type, register, error } = props;

  return (
    <div className="space-y-1">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        placeholder={placeholder}
        type={type}
        {...register(id)}
        className="h-9 md:h-10"
      />
      {error && <span className="text-xs text-red-600">{error.message}</span>}
    </div>
  );
};

export default InputForm;
