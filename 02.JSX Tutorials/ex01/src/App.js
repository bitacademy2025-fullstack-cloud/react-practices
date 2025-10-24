import React from 'react';

function App() {
    const greetings = 'hello, world';

    return (
        <div>
            <h1>Ex01</h1>
            <p>특징 I: HTML과 비교</p>
            <input type='text' maxLength='5' />
            <hr/>
            <img src=''/>
            <h4 id='title' className='header' style={{
                textDecoration: 'underline'
            }}>{greetings}</h4>
        </div>
    );
}

export default App;