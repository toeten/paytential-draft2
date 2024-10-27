import { useContext } from 'react';
import CurrentUserContext from '../contexts/current-user-context';

export default function AdminDashboard() {
  const { currentUser, users, setUsers } = useContext(CurrentUserContext);

  // Filter students in the same organization
  const studentsInOrg = users.filter(
    (user) => user.role === 'student' && user.organization === currentUser.organization
  );

  // Delete student function
  const handleDeleteStudent = (studentId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== studentId));
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <h3>Students in {currentUser.organization}:</h3>
      <ul>
        {studentsInOrg.map((student) => (
          <li key={student.id}>
            {student.username}
            <button onClick={() => handleDeleteStudent(student.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
