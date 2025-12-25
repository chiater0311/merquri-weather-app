import type { FieldError, UseFormRegister } from "react-hook-form";
import TextboxInput from "../ui/TextboxInput";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/16/solid";

type WeatherFormValues = {
  city: string;
  country: string;
};

type SearchBarErrors = {
  city?: FieldError;
  country?: FieldError;
  root?: FieldError;
};

type SearchBarProps = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onClear: () => void;
  register: UseFormRegister<WeatherFormValues>;
  errors: SearchBarErrors;
  isSubmitting: boolean;
};

const SearchBar = ({
  onSubmit,
  onClear,
  register,
  errors,
  isSubmitting,
}: SearchBarProps) => {
  return (
    <>
      <form onSubmit={onSubmit} className="w-full max-w-2xl mb-8">
        <div className="flex items-start gap-3 w-full">
          {/* City Field */}
          <TextboxInput
            id="city"
            label="City"
            error={errors.city?.message}
            registration={register("city", {
              required: "City is required.",
            })}
          />

          {/* Country Field */}
          <TextboxInput
            id="country"
            label="Country"
            error={errors.country?.message}
            registration={register("country", {
              required: "Country is required.",
            })}
          />

          {/* Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="submit"
              disabled={isSubmitting}
              className="
                rounded-xl flex items-center justify-center
                bg-[#6749ae] dark:bg-[#28124D]
                text-white
                hover:opacity-90 
                disabled:opacity-60 disabled:cursor-not-allowed
                transition-all duration-200
                shadow-lg hover:shadow-xl
                w-[48px] h-[48px]
                lg:w-[60px] lg:h-[60px]
              "
              aria-label="Search"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white border-t-transparent rounded-xl animate-spin" />
              ) : (
                <MagnifyingGlassIcon className="w-4 h-4 md:w-6 md:h-6" />
              )}
            </button>
            <button
              type="button"
              onClick={onClear}
              className="
                rounded-xl flex items-center justify-center
                bg-white/20 dark:bg-white/10
                text-white
                hover:opacity-90 
                disabled:opacity-60 disabled:cursor-not-allowed
                transition-all duration-200
                shadow-lg hover:shadow-xl
                w-[48px] h-[48px]
                lg:w-[60px] lg:h-[60px]
              "
              aria-label="Clear form"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* API / root-level errors */}
        {errors.root?.message && (
          <div className="mt-8 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 capitalize">
            <p className="text-sm text-red-600 dark:text-red-400">
              {errors.root.message}
            </p>
          </div>
        )}
      </form>
    </>
  );
};

export default SearchBar;
