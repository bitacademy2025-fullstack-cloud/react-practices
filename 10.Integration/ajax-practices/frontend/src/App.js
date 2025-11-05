import React, {useState, useEffect} from 'react';
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
    
    const fetchItems = async () => {
        try {
            const response = await fetch('/item', {
                method: 'get',
                header: {
                    'Accept': 'application/json'
                },
                body: null
            });

            if(!response.ok) {
                throw new Error(response.status);
            }

            const jsonResult = await response.json();

            if(jsonResult.result === 'fail') {
                throw new Error(jsonResult.message);
            }

            setItems(jsonResult.data);

        } catch(err) {
            console.error(err);
        }
    };

    useEffect(() => {
        console.log(items);
    }, [items]);

    useEffect(() => {
        fetchItems();
    }, []);


    return (
        <div id={'App'}>
            <h1>AJAX: Restful API</h1>
            


            
            <h2 onClick={() => fetchItems()}>Items</h2>
            <ItemList>
                {
                    items?.map((item, index) => <Item key={item.id}>
                        <h4>
                            <b>{item.name}</b>
                            <button onClick={() => {
                                
                                console.log(item.id + "will be deleted....");

                                

                            }}>[Delete] (delete)</button>
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