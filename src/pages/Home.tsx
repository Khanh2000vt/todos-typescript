/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import { useLocation, useHistory } from "react-router-dom";
import { useState, useEffect} from 'react';
import TodoItem from '../components/TodoItem'
import push from '../components/img/plus.svg'
import './Home.css'
interface stateType {
  [x: string]: any;
  pathname: string,
  state: {
      data: [],
      check: number
  }
}
const Home = () => {
  let history = useHistory();
  const { state } = useLocation<stateType>();

  const storageTodo = localStorage.getItem('json-todos')
  const arrayTodo = JSON.parse(storageTodo || '[]')

  const [todoItems, setTodoItems]: any[] = useState(arrayTodo)
  const [option, setOption] = useState('All')
  let check: number = state?.check ? state.check: 0;
  
  useEffect(()=>{
    localStorage.setItem('json-todos', JSON.stringify(todoItems))
    return() => {
      localStorage.setItem('json-todos', JSON.stringify(todoItems))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[todoItems])
  
  useEffect(() => {
    if (check !== 0) {
      setTodoItems([
        ...state.data
      ])
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[state?.data]) 

  

  const handlePush = (title: string, item: {}) => {
    history.replace({ 
      pathname: title,
      state: {
        data: todoItems,
        item: item,
      }})
  }

  function onItemClick(item: any) {
    return(): void => {
      let index = todoItems.indexOf(item);
      const isComplete = item.isComplete;
      setTodoItems([
        ...todoItems.slice(0, index),
        {
          ...item,
          isComplete: !isComplete,
        },
      ...todoItems.slice(index + 1)
      ])
    }
  }

  function handleDelete(item: {}) {
    return(): void => {
      let index = todoItems.indexOf(item as never);
      setTodoItems([
        ...todoItems.slice(0, index),
        ...todoItems.slice(index + 1)
      ])
    }
  }

  function handleUpdate(item: {}) {
    return(): void => {
      handlePush('./update',item)
    }
  }

  return ( 
    <div className="Home">
      <h1>List TODO</h1>
      {
        todoItems.length > 0 && option === 'All' &&
          todoItems.map((item: {}, index: number | undefined) => {
            return <TodoItem key={index}
                    item={item} 
                    onItemClick={onItemClick(item)}
                    onDelete={handleDelete(item)}
                    onUpdate={handleUpdate(item)} />})
      } {
        todoItems.length > 0 && option === 'Active' &&
        todoItems.map((item: { isComplete?: any; }, index: number | undefined) => {
          return  !item.isComplete &&
           <TodoItem key={index}
                  item={item} 
                  onItemClick={onItemClick(item)}
                  onDelete={handleDelete(item)}
                  onUpdate={handleUpdate(item)}/>})
      } {
        todoItems.length > 0 && option === 'Completed' &&
        todoItems.map((item: { isComplete?: any; }, index: number | undefined) => {
          return  item.isComplete &&
           <TodoItem key={index}
                  item={item} 
                  onItemClick={onItemClick(item)}
                  onDelete={handleDelete(item)}
                  onUpdate={handleUpdate(item)}/>})
                  
      } {
        todoItems.length === 0 && 
          <p className="nothing">Nothing here !!!</p>
      }
      <div className="option">
        <p>{todoItems.length} item</p>
        <ul>
          <li onClick={()=> {setOption('All')}}>All</li>
          <li onClick={()=> {setOption('Active')}}>Active</li>
          <li onClick={()=> {setOption('Completed')}}>Completed</li>
        </ul>
        <img src={push} width={24} height= {24}
          className="img-add" 
           onClick={() => {handlePush('./add',{})}}
           />
      </div>
    </div>
  );
}
export default Home;