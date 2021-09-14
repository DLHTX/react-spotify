import React from 'react';
import {inject, observer} from "mobx-react";

const Home = () => {
    return (
        <div>
        </div>
    )
}

export default inject('templateStore')(observer(Home));


