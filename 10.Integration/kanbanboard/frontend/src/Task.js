import React, {useState} from 'react';
import {_Task, Task_Remove} from './assets/scss/Task.scss';

const Task = ({no, name, done, callback}) => {
    const [doneChecked, setDoneChecked] = useState(done);

    return (
        <li className={_Task}>
            <input
                type='checkbox'
                checked={done === 'Y'} 
                onChange={e => {
                    callback(no, e.target.checked ? 'Y' : 'N');
                }} />
            {' '}    
            {name}     
            {' '}    
            <a
                href='#'
                className={Task_Remove} />
        </li>
    );
};

export default Task;
