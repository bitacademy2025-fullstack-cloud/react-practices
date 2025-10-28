import React from 'react';
import styled from 'styled-components';
import TabItem from './TabItem';

const StyledUl = styled.ul`
    height:24px;
`;

function Tabs({tabs}) {
    console.log(tabs);

    return (
        <StyledUl>
            {tabs.map(tab => <TabItem key={tab.no} name={tab.name} />)}
        </StyledUl>
    );
}

export default Tabs;