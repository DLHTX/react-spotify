import {action, computed, runInAction, makeAutoObservable} from "mobx";

class TemplateStore {
    //es7的装饰器语法
    template;

    //mobx版本6之后的更新需要显式加入makeAutoObservable
    constructor() {
        this.template = 'test'
        makeAutoObservable(this)
    }

    //用于绑定this 去除bound this指向的就不是容器的实例对象
    @action.bound
    public changeTemplateName(v: string) {
        console.log(v)
        this.template = v;
    }

    //计算属性 根据先有后状态或其他计算值衍生的数据
    @computed get totalName() {
        return this.template + "test"
    }

    //异步action 有三种操作方法
    @action.bound asyncChange() {
        setTimeout(() => {
            runInAction(() => {
                this.template = "change Name"
            })
        }, 100)
    }
}

export default TemplateStore;