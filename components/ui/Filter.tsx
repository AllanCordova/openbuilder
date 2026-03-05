export interface FilterOption {
  label: string;
  value: string;
}

interface FilterProps {
  options: FilterOption[];
  activeValue: string;
  onFilterChange: (value: string) => void;
  allLabel?: string;
}

export const Filter = ({
  options,
  activeValue,
  onFilterChange,
  allLabel = "All",
}: FilterProps) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        onClick={() => onFilterChange("")}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 border ${
          activeValue === ""
            ? "bg-primary text-background border-primary shadow-sm"
            : "bg-background-alt text-muted border-border-light hover:border-primary hover:text-foreground"
        }`}
      >
        {allLabel}
      </button>

      {options.map((option) => {
        const isActive = activeValue === option.value;

        return (
          <button
            key={option.value}
            onClick={() => onFilterChange(option.value)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 border ${
              isActive
                ? "bg-primary text-background border-primary shadow-sm"
                : "bg-background-alt text-muted border-border-light hover:border-primary hover:text-foreground"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};
