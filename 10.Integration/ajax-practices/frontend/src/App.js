import React, {useState, useEffect} from 'react';

import Modal from "react-modal";
import ReactModal from "react-modal";
import styled from 'styled-components';

import axios from 'axios';
import serialize from 'form-serialize';
import update from 'react-addons-update';

import noImage from './assets/images/no-image.png';
import './assets/scss/App.scss';
import * as styles from './assets/scss/Modal.scss';

const ItemList = styled.ul``;
const Item = styled.li``;

ReactModal.setAppElement('body');

export default function App() {
    const [items, setItems] = useState(null);
    const [modalData, setModalData] = useState({
        itemId: 0,
        itemType: '',
        itemName: '',
        open: false
    })

    const fetchItems = async () => {
        try {
            const response = await fetch('/item', {
                method: 'get',
                headers: {
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

    const addItemWithImage = async(item) => {
        try {
            const formData = new FormData();
            formData.append("name", item.name);
            formData.append("type", item.type);
            formData.append("file", item.file);

            const response = await axios.post('/item', formData, {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            });
            const jsonResult = response.data;

            if(jsonResult.result === 'fail') {
                throw new Error(jsonResult.message);
            }

            setItems([jsonResult.data, ...items]);
        } catch(err) {
            console.error(err);
        }
    }
    
    const addItem = async (item) => {
       try {
            const response = await fetch('/item', {
                method: 'post',
                headers: {
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

            setItems([jsonResult.data, ...items]);

        } catch(err) {
            console.error(err);
        }        
    }

    const updateItem = async (id, item) => {
        try {
            const response = await axios.put(`/item/${id}`, new URLSearchParams(item), {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            });
            const jsonResult = response.data;

            if(jsonResult.result === 'fail') {
                throw new Error(jsonResult.message);
            }

            const updateItem = jsonResult.data;
            const index = items.findIndex((e) => e.id === updateItem.id);

            setItems([...items.slice(0, index), updateItem, ...items.slice(index + 1)]);
            setModalData(update(modalData, {
                open: {$set: false},
                itemId: {$set: 0},
                itemType: {$set: ''},
                itemName: {$set: ''}
            }));
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
                        <option>BOOK</option>
                        <option>FOOD</option>
                    </select>
                    {' '}
                    <input type={'text'} name={'name'} placeholder={'name'} />
                    <input type={'submit'} value={'[Create] (post)'} />
                </form>

                <form onSubmit={(event) => {
                    event.preventDefault();
                    
                    try {
                        Array.from(event.target, (el) => {
                            if(el.name !== '' && el.value === '') {
                                throw new Error(`validation ${el.name} is empty`);
                            }
                            return null;
                        })

                        const item = serialize(event.target, {hash: true});                        
                        item.file = event.target.file.files[0];

                        addItemWithImage(item);
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
                        <option>BOOK</option>
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
                                <b onClick={async () => {
                                    const response = await axios.get(`/item/${item.id}`);
                                    const jsonResult = response.data;

                                    setModalData(update(modalData, {
                                        open: {$set: true},
                                        itemId: {$set: jsonResult.data.id},
                                        itemType: {$set: jsonResult.data.type},
                                        itemName: {$set: jsonResult.data.name}
                                    }));
                                }}>{item.name}</b>
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

            <Modal
                isOpen={modalData.open}
                onRequestClose={ () => setModalData(update(modalData, {
                    open: {
                        $set: false
                    }
                })) }
                className={ styles.Modal }
                overlayClassName={ styles.Overlay }
                style={ {content: {width: 350}} }>
                
                <h3>Update Item</h3>
                <form onSubmit={(event) => {
                    event.preventDefault();

                    const item = serialize(event.target, {hash: true});
                    updateItem(modalData.itemId, item);
                }}>
                    <label>Type</label>
                    {' '}
                    <select
                        name={'type'}
                        value={modalData.itemType}
                        onChange={(event) => {
                             setModalData(update(modalData, {
                                itemType: {
                                    $set: event.target.value
                                } 
                            }))                           
                        }}>
                        <option>CLOTHE</option>
                        <option>MUSIC</option>
                        <option>CAR</option>
                        <option>BEAUTY</option>
                        <option>MOVIE</option>
                        <option>BOOK</option>
                        <option>FOOD</option>
                    </select>
                    <br/><br/>
                    <label>Name</label>
                    {' '}
                    <input
                        type={'text'}
                        name={'name'}
                        placeholder={'name'}
                        value={modalData.itemName}
                        onChange={(event) => {
                            setModalData(update(modalData, {
                                itemName: {
                                    $set: event.target.value
                                } 
                            }))
                        }}/>
                    <hr/>
                    <input type={'submit'} value={'[Update] (put)'} />
                </form>
            </Modal>            
 
        </div>
    );
}