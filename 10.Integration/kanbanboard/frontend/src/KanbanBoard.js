import React, {useEffect, useState} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import CardList from './CardList.js';

const StyledDiv = styled.div`
    white-space: nowrap;
    height: 100%;
    margin: 20px auto;
`;

const KanbanBoard = () => {
    const [cards, setCards] = useState([]);

    const fetchCrads = async () => {
        try {
            const response = await axios.get('/api/card');
            const jsonResult = response.data
            if (jsonResult.result !== 'success') {
                throw new Error(`${jsonResult.result} ${jsonResult.message}`);
            }

            setCards(jsonResult.data);
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
