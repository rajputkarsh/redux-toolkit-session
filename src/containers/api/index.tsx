import { useDispatch, useSelector } from "react-redux";
import { AppState, AppStore } from "../../redux/store";
import { fetchUserList, getUsers } from "../../redux/slices/api.slice";
import { useEffect } from "react";

function ApiContainer() {
  const dispatch = useDispatch<AppStore>();
  const users = useSelector<AppState, Array<{ [key: string]: any }>>(getUsers);

  useEffect(() => {
    dispatch((fetchUserList({})));
  }, []);

  return (
    <div>
      <h3>API based Example</h3>
      <ol style={{fontSize: '0.7rem'}}>
        {users.map((user) => {
          return <li key={user.id}>{user.name}</li>
        })}
      </ol>      
    </div>
  );
}

export default ApiContainer;
