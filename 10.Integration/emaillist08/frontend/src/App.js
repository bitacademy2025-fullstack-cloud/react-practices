import React, {useState} from 'react';
import RegisterForm from './RegisterForm';
import SearchBar from './SearchBar';
import Emaillist from './Emaillist';
import './assets/scss/App.scss';
import data from './assets/json/data.js';

function App() {
    const [emails, setEmails] = useState(data);
    const searchEmail = (keyword) => {
        const newEmails = data.filter((email) => {
            return email.firstName.indexOf(keyword) !== -1;
        });

        setEmails(newEmails);
    }

    return (
        <div id={'App'}>
            <RegisterForm />
            <SearchBar searchEmail={searchEmail} />
            <Emaillist emails={emails} />
        </div>
    );
}

export default App;