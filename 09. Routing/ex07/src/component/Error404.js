import React from 'react';
import { SiteLayout } from '../layout';
import * as styles from '../assets/scss/component/Error404.scss'

function Error404(props) {
    return (
        <SiteLayout>
            <div className={styles.Error404}>
                <h2>Error 404</h2>
            </div>
        </SiteLayout>
    );
}

export default Error404;