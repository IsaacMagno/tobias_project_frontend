const SelectIncrease = ({ renderComponent, token }) => {
  console.log("heroku");
  return token ? (
    <div className='stats-select'>
      <select
        className='form-select-sm p-2 m-2 bg-dark text-white'
        onChange={({ target }) => renderComponent(target)}
      >
        <option value='DEFAULT'>Select</option>
        <option value='strength'>Strength</option>
        <option value='agility'>Agility</option>
        <option value='inteligence'>Inteligence</option>
        <option value='vitality'>Vitality</option>
      </select>
    </div>
  ) : null;
};

export default SelectIncrease;
