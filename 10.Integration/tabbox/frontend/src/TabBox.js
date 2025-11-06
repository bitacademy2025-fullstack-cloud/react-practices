import React, {useState, useEffect} from 'react';
import {Tab_Box} from './assets/scss/TabBox.scss';
import Tabs from './Tabs.js';
import TabView from './TabView.js';
import data from './assets/json/data.js';
import axios from 'axios';

function TabBox() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [title, setTitle] = useState('');

    const selectTab = function(no) {
        setActiveIndex(data.findIndex(e => e.no === no));
    }

    const fetchTitle = async () => {
        const response = await axios.get(API_HOST + '/api');
        const jsonResult = response.data;

        setTitle(jsonResult.data);
    }

    useEffect(() => {
        fetchTitle();
    }, []);

    return (
        <div className={Tab_Box}>
            <h1 style={{padding: '20px 0', textAlign: 'center'}}>{title}</h1>
            <Tabs 
                selectTab={selectTab}
                tabs={data.map((tab, index) => ({
                    no: tab.no,
                    name: tab.name,
                    active: index === activeIndex
                })
                )}/>
            <TabView contents={data[activeIndex].contents}/>
        </div>
    );
}

export default TabBox;