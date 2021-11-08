import { useState, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "./Add.css";

interface stateType {
  [x: string]: any;
  pathname: string;
  state: {
    data: [];
    item: {
      title: string;
      isComplete: boolean;
    };
  };
}
const Update = () => {
  const history = useHistory();
  const { state } = useLocation<stateType>();
  const [item, setItem] = useState(state.item.title);

  const inputRef = useRef<HTMLInputElement>(null);
  setTimeout(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, 1000);

  const handleGoBack = () => {
    history.push("./");
  };

  const handleSubmit = () => {
    if (item.trim() === "") {
      return;
    } else {
      let index = state.data.indexOf(state.item);
      const listTodos = [
        ...state.data.slice(0, index),
        {
          title: item,
          isComplete: false,
        },
        ...state.data.slice(index + 1),
      ];
      history.push({
        pathname: "./",
        state: {
          data: listTodos,
          check: 1,
        },
      });
    }
  };

  return (
    <div className="Update">
      <h1>Update Todos</h1>
      <input
        ref={inputRef}
        type="text"
        placeholder="Enter a todo..."
        value={item}
        onChange={(e) => setItem(e.target.value)}
      />

      <div className="add-button">
        <div className="link-btn">
          <button type="submit" className="submit" onClick={handleSubmit}>
            Submit
          </button>

          <button type="submit" className="cancel" onClick={handleGoBack}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
export default Update;
