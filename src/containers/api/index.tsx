import { useDispatch, useSelector } from "react-redux";
import { AppState, AppStore } from "../../redux/store";
import {
  fetchUserList,
  getUserById,
  getUsers,
} from "../../redux/slices/api.slice";
import { useEffect, useState } from "react";

function ApiContainer() {
  const dispatch = useDispatch<AppStore>();
  const [id, setId] = useState<string>("");
  const users = useSelector<AppState, Array<{ [key: string]: any }>>(getUsers);
  const randomUser = useSelector<AppState, { [key: string]: any }>(
    getUserById(id)
  );

  // using closure to avoid rerendering
  const getRandomUser = () => {
    setId((_) => Math.floor(Math.random() * 50 + 1).toString());
  };

  useEffect(() => {
    dispatch(fetchUserList({}));
  }, []);

  useEffect(() => {
    if(randomUser?.name) {
      alert(`Selected - ${randomUser?.name}`);
    }
  }, [randomUser?.name])

  return (
    <div>
      <h3>API based Example</h3>
      <button onClick={getRandomUser}>Select Random User</button>

      <ol style={{ fontSize: "0.7rem" }}>
        {users.map((user) => {
          return <li key={user.id}>{user.name}</li>;
        })}
      </ol>
    </div>
  );
}

export default ApiContainer;
