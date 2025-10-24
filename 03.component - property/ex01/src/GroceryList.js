import React from 'react';
import GroceryItem from './GroceryItem';

function GroceryList({groceries}) {

    console.log(groceries);
    const a = [<GroceryItem name={'bread'} count={10}/>, <GroceryItem name={'milk'} count={5}/>];

    return (
        <ol className={'grocery-list'}>
            {a}
        </ol>
    );
}

//React.createElement('ol', {}, <GroceryItem />, <GroceryItem />);
//React.createElement('ol', {}, [<GroceryItem />, <GroceryItem />]);

export default GroceryList;