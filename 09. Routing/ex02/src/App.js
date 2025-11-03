import React, {useState, useEffect} from 'react';
import Main from "./component/Main";
import Gallery from "./component/Gallery";
import Guestbook from "./component/Guestbook";
import Error404 from './component/Error404';

function Router() {
    const [route, setRoute] = useState({page: ''});
    
    const pushstateHandler = (e) => {
        setRoute(e.detail);
    } 

    const popstateHandler = (e) => {
        setRoute(e.state);
    } 

    useEffect(() => {
        window.addEventListener('pushstate', pushstateHandler);
        window.addEventListener('popstate', popstateHandler);

        return () => {
            window.removeEventListener('pushstate', pushstateHandler);
            window.removeEventListener('popstate', popstateHandler);
        }
    }, []);

    let component = null;

    switch(route.page) {
        case ''  :
        case '/' :
            component = <Main />;
            break;
        case '/guestbook' : 
            component = <Guestbook />;
            break;
        case '/gallery' :
            component = <Gallery />;
            break;
        default :
            component = <Error404 />;
    }

    return component;
}

export default function App() {
    const clickHandler = (e) => {
        e.preventDefault();

        const url = e.target.href.substring(e.target.href.lastIndexOf('/'));
        window.history.pushState({page: url}, e.target.txt, url);

        window.dispatchEvent(new CustomEvent('pushstate', {detail:{page: url}}));
    };

    return (
        <>
            <div>Browser Route 직접 만들어 보기</div>
            <ul>
                <li><a href='/' onClick={clickHandler}>main</a></li>
                <li><a href='/guestbook' onClick={clickHandler}>guestbook</a></li>
                <li><a href='/gallery' onClick={clickHandler}>gallery</a></li>
            </ul>
            <Router />
        </>
    );
}