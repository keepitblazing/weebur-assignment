import {
  ReactNode,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  SelectHTMLAttributes,
} from "react";

interface BaseFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  children?: ReactNode;
}

interface InputFieldProps
  extends BaseFieldProps,
    InputHTMLAttributes<HTMLInputElement> {
  type?: "text" | "number" | "email" | "password";
  suffix?: string | ReactNode;
  maxLength?: number;
  showCharacterCount?: boolean;
}

interface TextareaFieldProps
  extends BaseFieldProps,
    TextareaHTMLAttributes<HTMLTextAreaElement> {}

interface SelectFieldProps
  extends BaseFieldProps,
    SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const InputField = ({
  label,
  error,
  required = false,
  className = "",
  type = "text",
  suffix,
  maxLength,
  value,
  ...props
}: InputFieldProps) => {
  const inputClasses = `w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
    error && "border-red-300 focus:border-red-500 focus:ring-red-500"
  } ${suffix ? "pr-8" : ""} ${className}`;

  return (
    <div>
      <label htmlFor={props.id} className="mb-1 block text-sm font-medium">
        <b>{label}</b>
        {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          type={type}
          className={inputClasses}
          value={value}
          maxLength={maxLength}
          {...props}
        />
        {suffix && (
          <span className="absolute top-2 right-3 text-gray-500">{suffix}</span>
        )}
      </div>
      {error && <FormFieldError error={error} />}
    </div>
  );
};

export const TextareaField = ({
  label,
  error,
  required = false,
  className = "",
  ...props
}: TextareaFieldProps) => {
  const textareaClasses = `w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
    error && "border-red-300 focus:border-red-500 focus:ring-red-500"
  } ${className}`;

  return (
    <div>
      <label htmlFor={props.id} className="mb-1 block text-sm font-medium">
        <b>{label}</b>
        {required && <span className="text-red-500">*</span>}
      </label>
      <textarea className={textareaClasses} {...props} />
      {error && <FormFieldError error={error} />}
    </div>
  );
};

export const SelectField = ({
  label,
  error,
  required = false,
  className = "",
  options,
  placeholder,
  ...props
}: SelectFieldProps) => {
  const selectClasses = `w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
    error && "border-red-300 focus:border-red-500 focus:ring-red-500"
  } ${className}`;

  return (
    <div>
      <label htmlFor={props.id} className="mb-1 block text-sm font-medium">
        <b>{label}</b>
        {required && <span className="text-red-500">*</span>}
      </label>
      <select className={selectClasses} {...props}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <FormFieldError error={error} />}
    </div>
  );
};

const FormFieldError = ({ error }: { error: string }) => {
  return <strong className="mt-1 ml-1 text-sm text-red-600">{error}</strong>;
};
