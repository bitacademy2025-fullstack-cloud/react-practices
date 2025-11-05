import React, {useState, useEffect} from 'react';

import Modal from "react-modal";
import ReactModal from "react-modal";
import styled from 'styled-components';

import axios from 'axios';
import serialize from 'form-serialize';

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

    const addItem = async (item) => {
       try {
            const response = await fetch('/item', {
                method: 'post',
                header: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item)
            });

            if(!response.ok) {
                throw new Error(response.status);
            }

            const jsonResult = await response.json();

            if(jsonResult.result === 'fail') {
                throw new Error(jsonResult.message);
            }

            console.log(jsonResult.data);

        } catch(err) {
            console.error(err);
        }        
    }

    const deleteItem = async (id) => {
        try {
            const response = await axios.delete(`/item/${id}`);
            const jsonResult = response.data;

            if(jsonResult.result === 'fail') {
                throw new Error(jsonResult.message);
            }

            jsonResult.data && setItems(items.filter(item => item.id !== id));
        } catch(err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    return (
        <div id={'App'}>
            <h1>AJAX: Restful API</h1>
            <div>
                <form onSubmit={(event) => {
                    event.preventDefault();
                    
                    try {
                        /*
                        const item = Array.from(event.target, (el) => {
                            if(el.name !== '' && el.value === '') {
                                throw new Error(`validation ${el.name} is empty`);
                            }

                            return {name: el.name, value: el.value};
                        })
                        .filter((e) => e.name !== '')
                        .reduce((res, e) => { 
                            res[e.name] = e.value;
                            return res;
                        }, {});
                        */

                        Array.from(event.target, (el) => {
                            if(el.name !== '' && el.value === '') {
                                throw new Error(`validation ${el.name} is empty`);
                            }
                            return null;
                        })

                        // const item = serialize(event.target);

                        const item = serialize(event.target, {hash: true});                        
                        addItem(item);
                    } catch(err) {
                        alert(err);
                    }

                }}>
                    <select name={'type'}>
                        <option>CLOTHE</option>
                        <option>MUSIC</option>
                        <option>CAR</option>
                        <option>BEAUTY</option>
                        <option>MOVIE</option>
                        <option>FOOD</option>
                    </select>
                    {' '}
                    <input type={'text'} name={'name'} placeholder={'name'} />
                    <input type={'submit'} value={'[Create] (post)'} />
                </form>

                <form>
                    <select name={'type'}>
                        <option>CLOTHE</option>
                        <option>MUSIC</option>
                        <option>CAR</option>
                        <option>BEAUTY</option>
                        <option>MOVIE</option>
                        <option>FOOD</option>
                    </select>
                    {' '}
                    <input type={'text'} name={'name'} placeholder={'name'} />
                    <input type={'file'} name={'file'} />
                    <input type={'submit'} value={'[Create] (post)'} />
                </form>                
            </div>  
            
            <h2 onClick={() => fetchItems()}>Items</h2>
                
            <ItemList>
                    {
                        items?.map((item, index) => <Item key={item.id}>
                            <h4>
                                <b>{item.name}</b>
                                <button onClick={() => deleteItem(item.id)}>[Delete] (delete)</button>
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