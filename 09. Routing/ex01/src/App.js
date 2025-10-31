import React, {useState, useEffect} from 'react';
import Main from "./component/Main";
import Gallery from "./component/Gallery";
import Guestbook from "./component/Guestbook";
import Error404 from './component/Error404';

export default function App() {
    const [route, setRoute] = useState('');

    useEffect(() => {
        window.addEventListener('hashchange', () => {
            setRoute(window.location.hash.substring(1));
        })
    }, []);

    return (
        <>
            <div>Hash Route 직접 만들어 보기</div>
            <ul>
                <li><a href='/#/'>main</a></li>
                <li><a href='/#/guestbook'>guestbnook</a></li>
                <li><a href='/#/gallery'>gallery</a></li>
            </ul>
            {
                (() => {
                    switch(route) {
                        case ''  :
                        case '/' :
                            return <Main />;
                        case '/guestbook' : 
                            return <Guestbook />;
                        case '/gallery' :
                            return <Gallery />;
                        default :
                            return <Error404 />;
                    }
                })()
            }

        </>
    );
}