import React from 'react';
    
export default function TitelBar02() {
    const onClick = () => {
        console.log('TitleBar02 Clicked');
    };

    return (
        <div>
            <h4 onClick={onClick}>{'Funtion Component (click here!)'}</h4>
        </div>
    )
}