import { useDispatch, useSelector } from "react-redux";
import { AppState, AppStore } from "../../store";
import { getCount, increment, decrement, reset } from "../../slices/count.slice";

function CountContainer() {
  const dispatch = useDispatch<AppStore>();

  const count = useSelector<AppState, number>(getCount);

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
      <h3>Simple Example</h3>
      {count}
      <div>
        <button className="button" onClick={handleIncrement}>Increment</button>
        <button className="button" onClick={handleDecrement}>Decrement</button>
        <button className="button" onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}

export default CountContainer;
