import React, {useState} from 'react';
import Modal from "react-modal";
import ReactModal from "react-modal";
import styled from 'styled-components';


import noImage from './assets/images/no-image.png';
import './assets/scss/App.scss';
import * as styles from './assets/scss/Modal.scss';

const ItemList = styled.ul``;
const Item = styled.li``;

ReactModal.setAppElement('body');

export default function App() {
    const [items, setItems] = useState(null);

    return (
        <div id={'App'}>
            <h1>AJAX: Restful API</h1>
            
            
            <h2 onClick={async () => {
                try {
                    const response = await fetch('/item', {
                        method: 'get',
                        header: {
                            'Accpet': 'application/json'
                        },
                        body: null
                    });

                    console.log(response);

                    
                } catch(err) {
                    console.error(err);
                }
            }}>Items</h2>

            <ItemList>
                {
                    items?.map((item, index) => <Item key={item.id}>
                        <h4>
                            <b>{item.name}</b>
                            <button>[Delete] (delete)</button>
                        </h4>
                        <div>
                            <span>{index + 1}</span>
                            <i>{item.type}</i>
                            <ins style={{backgroundImage: `url(${item.image || noImage})`}} />
                        </div>
                    </Item>)
                }
            </ItemList>



        </div>
    );
}