import React, {useState} from 'react';
import TaskList from './TaskList';
import {_Card, Card_Title, Card_Title_Open}from './assets/scss/Card.scss';

const Card = ({title, description, tasks}) => {
    const [showDetails, setShowDetails] = useState(false);
    
    return (
        <div className={_Card}>
            <div
                className={[Card_Title, (showDetails ? Card_Title_Open : '')].join(' ')}
                onClick={() => {
                   setShowDetails(!showDetails);
                }}>
                {title}
            </div>
            {
                showDetails ?    
                    <div>
                        {description}
                        <TaskList tasks={tasks} />
                    </div> :
                    null
            }
        </div>
    );
};

export default Card;