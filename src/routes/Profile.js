import { authService, dbService } from 'fbase';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Profile = ({ userObj }) =>{
  const history = useHistory();

  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };

  const getMyNweets = async () => {
    /* 필터링 관련 코드 */
    const nweets = await dbService
    .collection("nweets")
    .where("creatorId","==", userObj.uid)
    .orderBy("createdAt","asc")
    .get();

    console.log(nweets.docs.map((doc) => doc.data()));
  };

  useEffect(() => {
    getMyNweets();
  }, []);

  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  )
}

export default Profile;