import React from 'react';
import styled from 'styled-components';
import CardList from './CardList.js';
import data from './assets/json/data.js';

const StyledDiv = styled.div`
    white-space: nowrap;
    height: 100%;
    margin: 20px auto;
`;

const KanbanBoard = () => {
    return (
            <StyledDiv className={'KanbanBoard'}>
                <CardList 
                    key={'To Do'}
                    title={'To Do'}
                    cards={data.filter(card => card.status === 'ToDo')} />
                <CardList
                    key={'Doing'}
                    title={'Doing'}
                    cards={data.filter(card => card.status === 'Doing')} />
                <CardList
                    key={'Done'}
                    title={'Done'}
                    cards={data.filter(card => card.status === 'Done')} />
            </StyledDiv>
    );
};

export default KanbanBoard;
