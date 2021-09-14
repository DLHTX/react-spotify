import React from 'react';
import {inject, observer} from "mobx-react";

const Discovery = () => {
    return (
        <div>
        </div>
    )
}

export default inject('templateStore')(observer(Discovery));


