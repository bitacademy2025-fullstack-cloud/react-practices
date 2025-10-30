import React from 'react';
import styled from 'styled-components';
import TabItem from './TabItem';

const StyledUl = styled.ul`
    height:24px;
`;

function Tabs({selectTab, tabs}) {
    return (
        <StyledUl>
            {tabs.map(tab => <TabItem
                key={tab.no}
                no={tab.no}
                name={tab.name}
                active={tab.active}
                selectTab={selectTab} />)}
        </StyledUl>
    );
}

export default Tabs;