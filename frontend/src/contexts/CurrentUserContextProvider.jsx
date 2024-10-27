import { useState, useEffect } from 'react';
import CurrentUserContext from './current-user-context';

export default function CurrentUserContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({
    role: localStorage.getItem('role') || '',
    organization: localStorage.getItem('organization') || '',
  });

  // Flag to trigger redirection only once after role selection
  const [redirectToGame, setRedirectToGame] = useState(false);

  const [users, setUsers] = useState([
    { id: 1, username: 'adminUser', role: 'admin', organization: 'Org1' },
    { id: 2, username: 'student1', role: 'student', organization: 'Org1' },
    { id: 3, username: 'student2', role: 'student', organization: 'Org1' },
    { id: 4, username: 'student3', role: 'student', organization: 'Org2' },
  ]);

  const updateRoleAndOrganization = (role, organization) => {
    setCurrentUser((prevUser) => ({ ...prevUser, role, organization }));
    localStorage.setItem('role', role);
    localStorage.setItem('organization', organization);

    if (role === 'student') {
      setRedirectToGame(true); // Trigger redirect for students
    }
  };

  useEffect(() => {
    const savedRole = localStorage.getItem('role');
    const savedOrganization = localStorage.getItem('organization');
    if (savedRole && savedOrganization) {
      setCurrentUser((prevUser) => ({
        ...prevUser,
        role: savedRole,
        organization: savedOrganization,
      }));
    }
  }, []);

  const context = {
    currentUser,
    setCurrentUser,
    users,
    setUsers,
    redirectToGame,
    setRedirectToGame,
    updateRoleAndOrganization,
  };

  return (
    <CurrentUserContext.Provider value={context}>
      {children}
    </CurrentUserContext.Provider>
  );
}
