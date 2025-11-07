import React, {useState} from 'react';
import update from 'react-addons-update';
import axios from 'axios';
import TaskList from './TaskList';
import {_Card, Card_Title, Card_Title_Open}from './assets/scss/Card.scss';

const Card = ({no, title, description}) => {
    const [showDetails, setShowDetails] = useState(false);
    const [tasks, setTasks] = useState([]);

    const changeTaskDone = async (no, done) => {
        try {
            const response = await axios.put(`/api/task/${no}`, new URLSearchParams({done: done}), {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            });
            const jsonResult = response.data;

            jsonResult.data && setTasks(update(tasks, {
                [tasks.findIndex(task => task.no === no)]: {
                    done: {
                        $set: done
                    }
                }
            }));

        } catch (err) {
            console.error(err);
        }
    }

    const addTask = async (taskName) => {
        try {
            const response = await axios.post('/api/task', {
                no: null,
                name: taskName,
                done: 'N',
                cardNo: no
            });

            const jsonResult = response.data;

            if (jsonResult.result !== 'success') {
                throw new Error(`${json.result} ${json.message}`);
            }

            setTasks([jsonResult.data, ...tasks]);

        } catch (err) {
            console.error(err);
        }
    }
    
   const deleteTask = async (no) => {
    try {
            const response = await axios.delete(`/api/task/${no}`);
            const jsonResult = response.data;

            if (jsonResult.result !== 'success') {
                throw new Error(`${json.result} ${json.message}`);
            }

            jsonResult.data && setTasks(tasks.filter(t => t === no));
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className={_Card}>
            <div
                className={[Card_Title, (showDetails ? Card_Title_Open : '')].join(' ')}
                onClick={async () => {
                    if(!showDetails) {
                        try {
                            const response = await axios.get(`/api/task?cardNo=${no}`);                
                            const jsonResult = response.data;
                            
                            if (jsonResult.result !== 'success') {
                                throw new Error(`${jsonResult.result} ${jsonResult.message}`);
                            }
                
                            setTasks(jsonResult.data);

                        } catch (err) {
                            console.log(err.message);
                        }
                    }

                    setShowDetails(!showDetails);
                }}>
                {title}
            </div>
            {
                showDetails ?    
                    <div>
                        {description}
                        <TaskList
                            tasks={tasks}
                            addTask={addTask}
                            deleteTask={deleteTask}
                            changeTaskDone={changeTaskDone} />
                    </div> :
                    null
            }
        </div>
    );
};

export default Card;
