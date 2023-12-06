import React from "react";

const PersonForm = ({
  submitEvent,
  handleName,
  handleNumber,
  valueName,
  valueNumber,
}) => {
  
  return (
    <div>
      <form onSubmit={submitEvent}>
        <div>
          name: <input onChange={handleName} value={valueName} />
        </div>
        <div>
          number: <input onChange={handleNumber} value={valueNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
