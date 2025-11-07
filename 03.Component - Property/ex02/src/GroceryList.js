import React from 'react';
import GroceryItem from './GroceryItem';

function GroceryList({groceries}) {

    console.log(groceries);
    
    // const groceryItems = [
    //     <GroceryItem name={'bread'} count={10}/>,
    //     <GroceryItem name={'milk'} count={5}/>,
    //     <GroceryItem name={'egg'} count={20}/>
    // ];
    // --> transpile
    // const groceryItems = [
    //     React.createElement(GroceryItem, {name: 'bread', count: 10}), 
    //     React.createElement(GroceryItem, {name: 'milk', count: 5}), 
    //     React.createElement(GroceryItem, {name: 'egg', count: 20})
    // ];

    const groceryItems = [];

    // for(let i = 0; i < groceries.length; i++) {
    //     groceryItems[i] = <GroceryItem name={groceries[i].name} count={groceries[i].count} />;
    // }

    // groceries.forEach(function(grocery) {
    //     groceryItems.push(<GroceryItem name={grocery.name} count={grocery.count} />);
    // });

    groceries.forEach(grocery => groceryItems.push(<GroceryItem name={grocery.name} count={grocery.count} />));

    return (
        <ol className={'grocery-list'}>
            {groceryItems}
        </ol>
    );
}

/*
1)
<ol className={'grocery-list'}>
    <GroceryItem name={'bread'} count={10}/>
    <GroceryItem name={'milk'} count={5}/>
    <GroceryItem name={'egg'} count={20}/>
</ol>
--> transpile
React.createElement('ol', {className: 'grocery-list'}, React.createElement(GroceryItem, {name: 'bread', count: 10}),  React.createElement(GroceryItem, {name: 'milk', count: 5}), React.createElement(GroceryItem, {name: 'egg', count: 20}));


2)
<ol className={'grocery-list'}>
    {[<GroceryItem name={'bread'} count={10}/>, <GroceryItem name={'milk'} count={5}/>, <GroceryItem name={'egg'} count={20}/>]}
</ol>
--> transpile
React.createElement('ol', {className: 'grocery-list'}, [React.createElement(GroceryItem, {name: 'bread', count: 10}),  React.createElement(GroceryItem, {name: 'milk', count: 5}), React.createElement(GroceryItem, {name: 'egg', count: 20}]));


*/

export default GroceryList;