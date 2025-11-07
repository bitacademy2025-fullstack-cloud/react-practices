import React from 'react';
import Card from './Card';
import {Card_List} from './assets/scss/CardList.scss';

const CardList = ({title, cards}) => {
    return (
        <div className={Card_List}>
            <h1>{title}</h1>
            {
                cards.map(card => <Card
                                    key={card.no}
                                    no={card.no}
                                    title={card.title}
                                    description={card.description} />)
            }
        </div>
    );
};

export default CardList;
