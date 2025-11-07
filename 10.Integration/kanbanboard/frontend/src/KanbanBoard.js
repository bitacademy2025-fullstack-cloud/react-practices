import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import CardList from './CardList.js';
import data from './assets/json/data.js';

const StyledDiv = styled.div`
    white-space: nowrap;
    height: 100%;
    margin: 20px auto;
`;

const KanbanBoard = () => {
    const [cards, setCards] = useState([]);
    const fetchCrads = async () => {
        try {
            const response = await fetch('/api/card', {
                method: 'get',
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }

            const json = await response.json();
            if (json.result !== 'success') {
                throw new Error(`${json.result} ${json.message}`);
            }

            setCards(json.data);
        } catch (err) {
            console.log(err.message);
        }
    };

    useEffect(() => {
        fetchCrads();
    }, []);
    
    return (
            <StyledDiv className={'Kanban_Board'}>
                <CardList 
                    key={'To Do'}
                    title={'To Do'}
                    cards={cards.filter(card => card.status === 'ToDo')} />
                <CardList
                    key={'Doing'}
                    title={'Doing'}
                    cards={cards.filter(card => card.status === 'Doing')} />
                <CardList
                    key={'Done'}
                    title={'Done'}
                    cards={cards.filter(card => card.status === 'Done')} />
            </StyledDiv>
    );
};

export default KanbanBoard;
