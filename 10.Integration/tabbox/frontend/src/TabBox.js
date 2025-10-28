import React from 'react';
import data from './assets/json/data.js';

function TabBox() {
    console.log(data);

    return (
        <div>
            <h1>{'Tab Box'}</h1>
            <Tabs tabs={data} />
        </div>
    );
}

export default TabBox;