import React from 'react';
import GroceryItem from './GroceryItem';

function GroceryList({groceries}) {
    console.log(groceries);

    // const groceryItems = [];
    // groceries.forEach(grocery => groceryItems.push(<GroceryItem name={grocery.name} count={grocery.count} />));

    // const groceryItems = groceries.map(function(grocery) {
    //     return <GroceryItem name={grocery.name} count={grocery.count} />;
    // });

    return (
        <ol
            className={'grocery-list'}>
            { groceries.map((grocery, index) => <GroceryItem
                                            key={index}
                                            name={grocery.name}
                                            count={grocery.count} />) }
        </ol>
    );
}

export default GroceryList;