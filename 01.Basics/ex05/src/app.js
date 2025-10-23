import React from 'react';

function App() {
    // const App = document.createElement('div');
    // App.textContent = 'hello, world';

    const App = React.createElement('div', null, "hello, world");
    return App;
}

export {App};