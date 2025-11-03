import React, { useEffect } from 'react';
import {Link, NavLink} from 'react-router-dom';
import {useNavigate} from 'react-router';

export default function Guestbook() {
    const navigate = useNavigate();


    useEffect(() => {
        setTimeout(() => {
            // access denied 응답을 받은 경우,

            // X 
            // window.location.href = '/error/401';

            // O
            navigate('/error/401');
        }, 3000);
    }, []);

    return (
        <div>
            <h1>Guestbook</h1>
            <ul>
                <li><Link className={'menu'} to={'/'}>[Main]</Link></li>
                <li><NavLink className={'menu'} to={'/guestbook'}>[Guestbook]</NavLink></li>
                <li><NavLink to={'/gallery'}>[Gallery]</NavLink></li>
            </ul>            
        </div>
    );
}