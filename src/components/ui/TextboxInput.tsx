import type { UseFormRegisterReturn } from "react-hook-form";

type TextboxInputProps = {
  id: string;
  label: string;
  error?: string;
  registration: UseFormRegisterReturn;
  className?: string;
};

const TextboxInput = ({
  id,
  label,
  error,
  registration,
  className = "",
}: TextboxInputProps) => {
  const hasError = Boolean(error);

  return (
    <div className={`relative w-full ${className}`}>
      <input
        id={id}
        type="text"
        placeholder=" "
        className={`
          peer
          w-full 
          h-[48px] lg:h-[60px]
          border rounded-xl 
          px-3 pt-4 pb-1 
          text-xs lg:text-sm 
          outline-none transition-all

          ${
            hasError
              ? "border-red-300 focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
              : "border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          }

          bg-white/50 dark:bg-[#1A1A1A80] 
          text-gray-900 dark:text-white
        `}
        {...registration}
      />

      <label
        htmlFor={id}
        className={`
          pointer-events-none
          absolute left-3
          transition-all duration-200 ease-in-out

          top-1.5
          text-xs lg:text-sm
          text-gray-500 dark:text-gray-400

          peer-placeholder-shown:top-1/2
          peer-placeholder-shown:-translate-y-1/2
          peer-placeholder-shown:text-xs lg:text-sm

          peer-focus:top-1.5
          peer-focus:-translate-y-0
          peer-focus:text-xs lg:text-sm
          peer-focus:text-blue-600 dark:peer-focus:text-blue-400

          ${hasError ? "!text-red-500 dark:!text-red-400" : ""}
        `}
      >
        {label} {hasError && "*"}
      </label>

      {hasError && (
        <p className="absolute -bottom-5 left-0 text-xs lg:text-sm text-red-500 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
};

export default TextboxInput;
