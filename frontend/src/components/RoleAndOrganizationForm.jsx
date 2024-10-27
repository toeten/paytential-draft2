import { useContext, useState } from 'react';
import CurrentUserContext from '../contexts/current-user-context';

export default function RoleAndOrganizationForm() {
  const { updateRoleAndOrganization } = useContext(CurrentUserContext);
  const [role, setRole] = useState('');
  const [organization, setOrganization] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    updateRoleAndOrganization(role, organization);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Role:
          <select value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="">Select role</option>
            <option value="admin">Admin</option>
            <option value="student">Student</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Organization:
          <input
            type="text"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            required
          />
        </label>
      </div>
      <button type="submit">Save</button>
    </form>
  );
}
