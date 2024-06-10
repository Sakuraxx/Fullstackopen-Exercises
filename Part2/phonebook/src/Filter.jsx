const Filter = ({ filterName, setFilterName }) => {
  const handleOnChangeFilter = (event) => {
    setFilterName(event.target.value);
  };

  return (
    <>
      filter shown with{" "}
      <input value={filterName} onChange={handleOnChangeFilter} />
    </>
  );
};

export default Filter;
