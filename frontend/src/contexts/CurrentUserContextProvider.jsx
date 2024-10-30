import { useState, useEffect } from 'react';
import CurrentUserContext from './current-user-context';
import { createProfile } from '../adapters/profile-adapter';
import { getUser } from '../adapters/user-adapter';

export default function CurrentUserContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({});
  const [redirectToGame, setRedirectToGame] = useState(false);
  
  // Set up users and setUsers to be shared in the context
  const [users, setUsers] = useState([
    { id: 1, username: "Alice Johnson", role: "student", organization: "Organization A" },
    { id: 2, username: "Bob Smith", role: "admin", organization: "Organization B" },
    { id: 3, username: "Carol White", role: "student", organization: "Organization A" },
    { id: 4, username: "Dave Brown", role: "admin", organization: "Organization C" },
    { id: 5, username: "Eve Black", role: "student", organization: "Organization B" },
    { id: 6, username: "Frank Green", role: "student", organization: "Organization C" },
    { id: 7, username: "Grace Blue", role: "admin", organization: "Organization A" },
    { id: 8, username: "Hank Red", role: "student", organization: "Organization D" },
    { id: 9, username: "Ivy Purple", role: "admin", organization: "Organization D" },
    { id: 10, username: "Jake Yellow", role: "student", organization: "Organization C" }
  ]);

  const updateRoleAndOrganization = async (role, organization) => {
    const is_admin = role === 'admin';
    const [profile, error] = await createProfile({ is_admin, organization });

    if (error) {
      console.error("Error creating profile:", error);
      return;
    }

    setCurrentUser((prevUser) => ({ ...prevUser, role, organization }));

    if (role === 'student') {
      setRedirectToGame(true);
    }
  };

  useEffect(() => {
    const loadUserProfile = async (req) => {
      const userId = req.session.userId;
      const [user, error] = await getUser(userId);

      if (error) {
        console.error("Error fetching user profile:", error);
        return;
      }

      setCurrentUser(user);
    };

    loadUserProfile();
  }, []);

  const context = {
    currentUser,
    setCurrentUser,
    redirectToGame,
    setRedirectToGame,
    updateRoleAndOrganization,
    users,    // Make users available in context
    setUsers, // Add setUsers to context so it can be updated
  };

  return (
    <CurrentUserContext.Provider value={context}>
      {children}
    </CurrentUserContext.Provider>
  );
}
