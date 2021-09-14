import React from 'react';
import {inject, observer} from "mobx-react";

const Login = () => {
    return (
        <div>
        </div>
    )
}

export default inject('templateStore')(observer(Login));


