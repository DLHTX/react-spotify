import React from 'react';
import HelloWorld from "../../components/ComponentsTemplate";
import {inject, observer} from "mobx-react";
import {Button} from "antd"
import {ITemplateStore} from "../../store/interface/ITemplateStore";


const Home = (props: { templateStore: ITemplateStore }) => {
    const buttonClick = function () {
        props.templateStore.changeTemplateName('1')
    }

    return (
        <div>
            <HelloWorld helloString={'React create success'}></HelloWorld>

            <div>
                This is mobx store value:
                {props.templateStore.template}
            </div>

            <Button type="primary" onClick={buttonClick}>Change Mobx value</Button>
        </div>
    )
}

export default inject('templateStore')(observer(Home));


