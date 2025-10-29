import React, {useState} from 'react';
import {_Task, Task_Remove} from './assets/scss/Task.scss';

const Task = ({no, name, done}) => {
    const [doneChecked, setDoneChecked] = useState(done);

    return (
        <li className={_Task}>
            <input
                type='checkbox'
                checked={doneChecked} />
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