import { useDispatch, useSelector } from 'react-redux'
import { AppState, AppStore } from './redux/store';
import { increment, decrement, reset } from './redux/reducers/count/actions'
import './App.css'

function App() {

  const count = useSelector<AppState, number>((state) => state.count.count);
  const dispatch = useDispatch<AppStore>();

  const handleIncrement = () => {
    dispatch(increment());
  };

  const handleDecrement = () => {
    dispatch(decrement());
  };

  const handleReset = () => {
    dispatch(reset());
  };

  return (
    <div>
      <label>{count}</label>
      <div>
        <button className="button" onClick={handleIncrement}>
          Increment
        </button>
        <button className="button" onClick={handleDecrement}>
          Decrement
        </button>
        <button className="button" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default App
