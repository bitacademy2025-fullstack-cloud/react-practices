import React from 'react';
import {_Task, Task_Remove} from './assets/scss/Task.scss';

const Task = ({no, name, done, deleteTask, changeTaskDone}) => {
    return (
        <li className={_Task}>
            <input
                type='checkbox'
                checked={done === 'Y'} 
                onChange={e => {
                    changeTaskDone(no, e.target.checked ? 'Y' : 'N');
                }} />
            {' '}    
            {name}     
            {' '}    
            <a
                href='#'
                className={Task_Remove}
                onClick={e => {
                    e.preventDefault();
                    deleteTask(no);
                }}/>
        </li>
    );
};

export default Task;
