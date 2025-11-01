import Table from './Table';
import data from './assets/datas.json';

 function Employees() {
  // 🧩 Extract data from nested structure
  const groups = data.groups || [];

  const employees = groups.flatMap(group =>
    group.departments.flatMap(dept =>
      dept.teams.flatMap(team =>
        team.employees.map(emp => ({
          group: group.groupName,
          department: dept.departmentName,
          team: team.teamName,
          name: emp.name,
          role: emp.role,
          experience: emp.experience,
          skills: emp.skills
        }))
      )
    )
  );

  const headers = employees.length > 0 ? Object.keys(employees[0]) : [];

  return (
    <div >
      <h2 >
        Employee Hierarchy Table 🏢
      </h2>

      {employees.length > 0 ? (
        <Table data={employees} headers={headers} />
      ) : (
        <p>No employee data found.</p>
      )}
    </div>
  );
}

export default Employees;
