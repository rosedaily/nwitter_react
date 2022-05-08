import { authService, dbService } from 'fbase';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Nweet from 'components/Nweet';

const Profile = ({ userObj, refreshUser }) =>{
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName)
  
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };

  const onChange = (event) => {
    const { 
      target : { value },
    } = event;
    setNewDisplayName(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    // userObj.updateProfile()
    if(userObj.displayName !== newDisplayName){
      await userObj.updateProfile({ displayName: newDisplayName});
      refreshUser();
    }
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input 
          onChange={onChange} 
          type="text" 
          placeholder="Display name" 
          value={newDisplayName}
          autoFocus
          className="formInput"
        />
        <input 
          type="submit" 
          value="Update Profile"
          className="formBtn"
          style={{
            marginTop: 10,
          }}
        />
      </form>
      <span className="formBtn cancleBtn logOut" onClick={onLogOutClick}>
        Log Out
      </span>
    </div>
  )
}

export default Profile;