/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useRef } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import './Add.css'
interface stateType {
    [x: string]: any;
    pathname: string,
    state: {
        data: [],
        item: {
            title: string,
            isComplete: boolean
    }
    }
  }
const Add = ()=> {
    const history = useHistory();
    const { state } = useLocation<stateType>();
    const [item, setItem] = useState('')

    const inputRef = useRef<HTMLInputElement>(null);
    setTimeout(() => {
        if(inputRef && inputRef.current) {
            inputRef.current.focus();
        }
    }, 100);

    const handleGoBack = () => {
        history.push('./');
    }

    const handleSubmit = () => {
        if (item.trim() === '') {
            return;
        }
        else {
            const listTodos = [
                {
                    title: item,
                    isComplete: false
                },
                ...state.data
            ];

            history.push({ 
                pathname: './',
                state: {
                  data: listTodos,
                  check: 1
                }})
        }
    }

    return(
        <div className="Add">
            <h1>Add Todo</h1>
            <input ref={inputRef}
                type="text" 
                placeholder = "Add a new item..."
                value={item} 
                onChange={e => setItem(e.target.value)} />
            
            <div className="add-button">
                <div className="link-btn">
                    <button type="submit" className="submit" 
                        onClick={handleSubmit}>
                            Submit
                    </button>

                    <button type="submit" className='cancel' 
                        onClick={handleGoBack}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}
export default Add;
