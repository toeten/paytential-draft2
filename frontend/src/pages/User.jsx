import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import { getUser } from "../adapters/user-adapter";
import { logUserOut } from "../adapters/auth-adapter";
import UpdateUsernameForm from "../components/UpdateUsernameForm";
import RoleAndOrganizationForm from "../components/RoleAndOrganizationForm";
import AdminDashboard from "../components/AdminDashboard";

export default function UserPage() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser, redirectToGame, setRedirectToGame } = useContext(CurrentUserContext);
  const [userProfile, setUserProfile] = useState(null);
  const [errorText, setErrorText] = useState(null);
  const { id } = useParams();
  const isCurrentUserProfile = currentUser && currentUser.id === Number(id);

  useEffect(() => {
    if (redirectToGame) {
      navigate('/game');
      setRedirectToGame(false); // Reset the redirect trigger
    }
  }, [redirectToGame, navigate, setRedirectToGame]);

  useEffect(() => {
    const loadUser = async () => {
      const [user, error] = await getUser(id);
      if (error) return setErrorText(error.message);
      setUserProfile(user);
    };

    loadUser();
  }, [id]);

  const handleLogout = async () => {
    logUserOut();
    setCurrentUser(null);
    navigate('/');
  };

  const handleStartGame = () => {
    navigate('/game');
  };

  if (!userProfile && !errorText) return null;
  if (errorText) return <p>{errorText}</p>;

  const profileUsername = isCurrentUserProfile ? currentUser.username : userProfile.username;

  return (
    <>
      <h1>{profileUsername}</h1>
      {!!isCurrentUserProfile && <button onClick={handleLogout}>Log Out</button>}
      <p>If the user had any data, here it would be</p>
      <p>Fake Bio or something</p>
      {isCurrentUserProfile && <UpdateUsernameForm currentUser={currentUser} setCurrentUser={setCurrentUser} />}

      {isCurrentUserProfile && !currentUser.role && !currentUser.organization && (
        <RoleAndOrganizationForm />
      )}

      {currentUser.role && currentUser.organization && (
        <p>Your role is {currentUser.role} in the {currentUser.organization} organization.</p>
      )}

      {/* Show Admin Dashboard if user is an admin */}
      {currentUser.role === 'admin' && <AdminDashboard />}

      {/* Show Start Game button if user is a student */}
      {currentUser.role === 'student' && (
        <button onClick={handleStartGame}>Start Game</button>
      )}
    </>
  );
}

