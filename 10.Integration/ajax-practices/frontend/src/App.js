import React, {useState} from 'react';
import Modal from "react-modal";
import ReactModal from "react-modal";

import noImage from './assets/images/no-image.png';
import './assets/scss/App.scss';
import * as styles from './assets/scss/Modal.scss';


ReactModal.setAppElement('body');


export default function App() {
    return (
        <div id={'App'}>
            <h1>AJAX: Restful API</h1>
            
            
            <h2>Items</h2>
            <ul>
                <li>
                    <h4>
                        <b>apple pie</b>
                        <button>[Delete] (delete)</button>
                    </h4>
                    <div>
                        <span>1</span>
                        <i>FOOD</i>
                        <ins style={{backgroundImage: `url(${noImage})`}} />
                    </div>
                </li>
            </ul>
            <ul>
                <li>
                    <h4>
                        <b>apple pie</b>
                        <button>[Delete] (delete)</button>
                    </h4>
                    <div>
                        <span>1</span>
                        <i>FOOD</i>
                        <ins style={{backgroundImage: `url(${noImage})`}} />
                    </div>
                </li>
            </ul>


        </div>
    );
}