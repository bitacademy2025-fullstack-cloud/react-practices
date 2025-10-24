import React, {Component} from 'react';

function Contents() {
    /*
        1. jsx 밖은 JavaScript 구문이 가능하기 때문에 주석문이 가능하다.
    */

    return (
        <div
            className='clock'
            /*
                2. JSX 태그 자체의 내부에 주석이 가능하다. - 비추
            */
            title='clock'>

            {
                /*
                    3. 표현식이 실행되는 블록은 주석이 가능하다, - 추천
                */
                [0, 1, 2, 3].forEach((e) => {})
            }


            {
                // 4. 표현식과 상관없이 JSX 내부 주석을 달아야 할 경우는 주석문 전용 표현식 블록은 사용한다. - 추천
            }

            {/*
                5. JSX는 HTML이 아니다. 따라서 <!-- --> 사용할 수 없다.
            */}

            <p>{'Comment'}</p>
            <div>{'00:00:00'}</div>

            /* JSX 안에서 JavaScript 주석을 사용하면 그대로 렌더링 된다. */
        </div>
    );
}

export default Contents;