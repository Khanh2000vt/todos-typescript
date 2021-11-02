/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-lone-blocks */
import {useState} from 'react';
import classNames from 'classnames'
import './css/TodoItem.css'
import check from './img/circle.svg'
import checkComplete from './img/check-complete.svg'
import deleteIcon from './img/delete.svg'
import updateTodo from './img/update.svg'

interface ItemProps {
    item: any;
    key?: number;
    onItemClick: any;
    onDelete?: any;
    onUpdate?: any
}

const TodoItem = ({item,
    onItemClick,
    onDelete,
    onUpdate}: ItemProps) => {

    const [isHovered, setIsHovered] = useState(false);

    const onMouseEnter = () => {
        setIsHovered(true);
    };
    const onMouseLeave = () => {
        setIsHovered(false);
    };

    let iconCheck = check;
    if(item.isComplete) {
        iconCheck = checkComplete;
    }
    return(
        <div onMouseEnter={ onMouseEnter}
            onMouseLeave={onMouseLeave} 
            className={classNames('TodoItem', {
            'TodoItem-complete': item.isComplete
        })}>
            <div onClick={onItemClick}
                 className={classNames('contain',{
                     'contain-complete': item.isComplete
                    })}>
                <img className={classNames({
                    'img-complete': item.isComplete
                })}
                src={iconCheck} width={32} height={32}/>
                <p> { item.title }</p>
            </div>
            {
                isHovered && (
                    <div className='icon'>
                        <img src={deleteIcon}
                             width={24} height= {24} 
                             className='icon-hover delete'
                             onMouseUp={onDelete}/>
                        <img src={updateTodo}
                         width={24}
                          height={24} 
                          className='icon-hover update'
                          onMouseUp ={onUpdate}/>
                    </div>
                )
            }
        </div>
    );
}
export default TodoItem;