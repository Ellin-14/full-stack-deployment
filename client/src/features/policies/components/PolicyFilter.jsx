const PolicyFilter = ({
  filters,
  setFilters,
  policyTypes = [],
  ranges = [],
}) => {
  return (
    <div className="flex gap-4 bg-white p-4 rounded-xl shadow">
      <input
        type="text"
        placeholder="Search insurance..."
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        className="border px-4 py-2 rounded w-1/3"
      />
      <select
        value={filters.type || ""}
        onChange={(e) => setFilters({ ...filters, type: e.target.value })}
        className="border px-4 py-2 rounded"
      >
        <option value="">Policy Types</option>

        {Array.isArray(policyTypes) &&
          policyTypes.map((type, index) => (
            <option key={`${type}-${index}`} value={type}>
              {type}
            </option>
          ))}
      </select>
      <select
  value={
    filters.range
      ? ranges.findIndex(
          r =>
            r.min === filters.range.min &&
            r.max === filters.range.max
        )
      : ""
  }
  onChange={(e) =>
    setFilters({
      ...filters,
      range: e.target.value !== ""
        ? ranges[Number(e.target.value)]
        : null,
    })
  }
  className="border px-4 py-2 rounded"
>
  <option value="">coverage_amount</option>

  {Array.isArray(ranges) &&
    ranges.map((range, index) => (
      <option key={index} value={index}>
        {range.label}
      </option>
    ))}
</select>
      <select>
        {Array.isArray(ranges) &&
          ranges.map((range, index) => (
            <option key={`range-${index}`} value={index}>
              {range.label}
            </option>
          ))}
      </select>
    </div>
  );
};

export default PolicyFilter;