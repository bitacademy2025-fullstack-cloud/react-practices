import React, {useState, useEffect} from 'react';
import data from './assets/json/data.js';
import update from 'react-addons-update';

export default function App() {
    const [order, setOrder] = useState(data);
    const [payment, setPayment] = useState(data.payment);
    const [goods, setGoods] = useState(data.goods);

    useEffect(() => {
        console.log('Order Updated', order);
    }, [order]);

    useEffect(() => {
        console.log('Payment Updated', payment);
    }, [payment]);

    useEffect(() => {
        console.log('Goods Updated', goods);
    }, [goods]);

    return (
        <div id={'App'}>
            <button
                onClick={() => {
                    // violation
                    // order.receive = '서울시 서초구 논현동...';
                    // setOrder(order);
                    
                    // sol1
                    // const orderUpdated = Object.assign({}, order, {
                    //    receive: '서울 서초구 논현동'
                    // });
                    // setOrder(orderUpdated);
                    
                    // sol. recommended
                    const orderUpdated = update(order, {
                        receive: {
                            $set: '서울 서초구 논현동'
                        }         
                    });
                    setOrder(orderUpdated);

                }}>
                {'배송지 수정'}
            </button>
            <br/>
            <br/>
            <button
                onClick={() => {
                    // violation
                    // const orderUpdated = Object.assign({}, order);
                    // orderUpdated.payment.method = "Mobile";
                    // setPayment(orderUpdated.payment);

                    // sol.1
                    // const orderUpdated = Object.assign({}, order);
                    // orderUpdated.payment = Object.assign({}, order.payment, {mothod: 'Mobile'});
                    // setPayment(orderUpdated.payment);
                    
                    // sol recommended
                    const orderUpdated = update(order, {
                        payment: {
                            method: {
                                $set: 'Mobile'
                            }
                        }
                    });
                    setPayment(orderUpdated.payment);
                }}>
                {'결제수단 변경'}
            </button>
            <br/>
            <br/>
            <button
                onClick = {() => {
                    // violation
                    // goods.push({
                    //    "no": "p002-002",
                    //    "name": "블루양말",
                    //    "price": 1000,
                    //    "amount": 10
                    // });
                    // setGoods(goods);

                    // sol1
                    // const goodsUpdated = goods.concat([{
                    //    "no": "p002-002",
                    //    "name": "블루양말",
                    //    "price": 1000,
                    //    "amount": 10
                    // }]);
                    // setGoods(goodsUpdated);

                    // sol2
                    // const goodsUpdate = [{
                    //    "no": "p002-002",
                    //    "name": "블루양말",
                    //    "price": 1000,
                    //    "amount": 10
                    // }, ...goods];
                    // setGoods(goodsUpdate);

                    // sol recommended
                    const goodsUpdated = update(goods, {
                        $unshift: [{
                            "no": "p002-002",
                            "name": "블루양말",
                            "price": 1000,
                            "amount": 10
                        }]
                    });
                    setGoods(goodsUpdated);
                }}>
                {'상품추가'}
            </button>

        </div>
    );
    
}