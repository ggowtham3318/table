import React, { useState, useRef, useEffect } from "react";

function MultiSelectDropdown({ options, selected, setSelected, placeholder }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Toggle individual option
  const toggleOption = (value) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((item) => item !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  // Handle "Select All"
  const handleSelectAll = () => {
    if (selected.length === options.length - 1) {
      setSelected([]);
    } else {
      setSelected(options.filter((opt) => opt.value !== "All").map((opt) => opt.value));
    }
  };

  // Filter options using search
  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 🟢 Updated display text logic
  const getDisplayText = () => {
    if (selected.length === 0) return placeholder || "Select";
    if (selected.length === 1) {
      const selectedLabel = options.find((opt) => opt.value === selected[0])?.label;
      return selectedLabel || selected[0];
    }
    return `${selected.length} Selected`;
  };

  return (
    <div className="multi-select" ref={dropdownRef}>
      <div className="dropdown-header" onClick={() => setIsOpen(!isOpen)}>
        {getDisplayText()}
        <span className="arrow">{isOpen ? "▲" : "▼"}</span>
      </div>

      {isOpen && (
        <div className="dropdown-list">
          <input
            type="text"
            className="search-box"
            placeholder={`Search ${placeholder}`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="select-all">
            <label>
              <input
                type="checkbox"
                checked={selected.length === options.length - 1}
                onChange={handleSelectAll}
              />
              Select All
            </label>
          </div>

          {filteredOptions.map((option) => (
            <label key={option.value} className="dropdown-option">
              <input
                type="checkbox"
                checked={selected.includes(option.value)}
                onChange={() => toggleOption(option.value)}
              />
              {option.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default MultiSelectDropdown;
