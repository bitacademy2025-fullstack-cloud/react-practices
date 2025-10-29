import React from 'react';
import {title} from './assets/scss/App.scss';
import GroceryList from './GroceryList';

function App () {
    const groceries = [
        {name: 'milk', count:10},
        {name: 'bread', count:5},
        {name: 'egg', count:20},
        {name: 'banana', count:30}
    ];

    return (
        <div id={'App'}>
            <h1 className={title}>{'Grocery List'}</h1>
            <GroceryList groceries={groceries}/>
        </div>
    );
}

export default App;