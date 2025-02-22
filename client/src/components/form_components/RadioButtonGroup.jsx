import PropTypes from "prop-types";

const RadioButtonGroup = ({
  label,
  name,
  options,
  selectedValue,
  onChange,
  required,
}) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm font-medium text-primary-text">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="flex items-center gap-4">
        {options.map((option) => {
          const value = typeof option === "object" ? option.value : option;
          const label = typeof option === "object" ? option.label : option;

          return (
            <label
              key={value}
              className={`flex items-center gap-2 cursor-pointer`}
            >
              <input
                type="radio"
                name={name}
                value={value}
                checked={selectedValue === value}
                onChange={() => onChange(value)}
                required={required}
              />
              <span className="text-sm text-gray-700">{label}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

RadioButtonGroup.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      }),
    ])
  ).isRequired,
  selectedValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
};

export default RadioButtonGroup;
