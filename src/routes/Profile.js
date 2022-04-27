import { authService, dbService } from 'fbase';
import { useEffect,useState } from 'react';
import { useHistory } from 'react-router-dom';
import Nweet from 'components/Nweet';

const Profile = ({ userObj }) =>{
  const history = useHistory();
  const [nweets, setNweets] = useState([]);
  

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

    const newArray = nweets.docs.map((document) => ({
      id: document.id,
      ...document.data(),
    }));
    setNweets(newArray);
  };

  useEffect(() => {
    getMyNweets();
  }, []);

  return (
    <div>
      <div>
        {nweets.map((nweet) => (
          <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid}/>
        ))}
      </div>
      <div>
        <button onClick={onLogOutClick}>Log Out</button>
      </div>
    </div>
  )
}

export default Profile;