import {useState} from 'react';

/**
* Creates selctor of employees
* @ param {props} rosterList - list of employee objects  
* @function
* @returns {selector} to display 
*/
const RosterSelector = (props) => {

  const [selectedEmployee, setSelectedEmployee] = useState('');

  console.log(props.rosterList);
  const employeeNames = []
  if (!props.rosterList) {
    return (<label>Empty Roster</label>);
  }
  for (let i = 0; i < props.rosterList.length; i++) {
    const item = props.rosterList[i];
    const RosterSelector = (
      <option value={item.employee_id}>{item.employee_name}</option>)
      employeeNames.push(RosterSelector);
  }
  return ( 
    <div>
    <select name="employees" id="employeeSelector" onChange={(e) =>{
      const selectedEmployee = e.target.value;
      setSelectedEmployee(selectedEmployee);
    }}>
      {employeeNames}
    </select>
    <span id="selectedEmployeeDiv" hidden>
    {selectedEmployee}
    </span>
    </div>
  );
}

export default RosterSelector
