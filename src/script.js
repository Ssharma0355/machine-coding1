(async function () {
  const response = await fetch("../src/data.json");
  const employees = await response.json();

  console.table(employees);

  let selectedEmployeeId = employees[0]?.id || null;
  let selectedEmployeeObj = employees[0] || {};

  const employeeList = document.querySelector(".employees__names--list");
  const employeeDetails = document.querySelector(".employees__single--names");

  // Function to render employees
  const renderEmployee = () => {
    employeeList.innerHTML = ""; // Clear the list

    employees.forEach((emp) => {
      const employee = document.createElement("span");
      employee.classList.add("employee__name--item");
      employee.setAttribute("id", emp.id);
      employee.textContent = emp.name;

      if (parseInt(selectedEmployeeId, 10) === emp.id) {
        employee.classList.add("active");
        selectedEmployeeObj = emp;
        displayEmployeeDetails();
      }

      employee.addEventListener("click", () => {
        selectedEmployeeId = emp.id;
        renderEmployee();
      });

      employeeList.append(employee);
    });
  };

  // Function to display selected employee details
  const displayEmployeeDetails = () => {
    if (employeeDetails && selectedEmployeeObj) {
      employeeDetails.innerHTML = `
                <h2>${selectedEmployeeObj.name}</h2>
                <p>ID: ${selectedEmployeeObj.id}</p>
            `;
    }
  };

  renderEmployee(); // Initial render
})();
