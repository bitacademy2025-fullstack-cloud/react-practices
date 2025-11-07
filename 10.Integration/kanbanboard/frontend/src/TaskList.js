import React from 'react';
import Task from './Task';
import {Task_List, Input_Add_Task} from './assets/scss/TaskList.scss';

const TaskList = ({cardNo, tasks, callbackAddTask, callbackChangeTaskDone}) => {
    return (
        <div className={Task_List}>
            <ul>
                {
                    tasks?.map(task => <Task
                                        key={task.no}
                                        no={task.no}                                        
                                        name={task.name}
                                        done={task.done}
                                        callback={callbackChangeTaskDone} />)
                }
            </ul>
            <input
                type='text'
                placeholder={'태스크 추가'}
                className={Input_Add_Task}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        callbackAddTask(e.target.value);
                        e.target.value = '';
                    }
                }} />
        </div>
    );
};

export default TaskList;
