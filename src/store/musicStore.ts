import { IMusicState, MODE } from './interface/IMusicStore';
import {action, computed, runInAction, makeAutoObservable} from "mobx";
import { IMyMusic } from "../apis/types/business";
import { getMusicUrl } from "../helpers/business";


class MusicStore {
    //es7的装饰器语法
    state:IMusicState;

    //mobx版本6之后的更新需要显式加入makeAutoObservable
    constructor() {
        this.state = {
            musicId: 0,
            musicUrl: '',
            playMode: MODE.PLAY_IN_ORDER,
            showLyric: false,
        }
        makeAutoObservable(this)
    }

    //用于绑定this 去除bound this指向的就不是容器的实例对象
    @action.bound
    public SET_PLAYLIST(payload: IDictionary<any>) {
        this.state = {
            musicId: payload?.musicId,
            musicUrl: getMusicUrl(payload?.musicId),
            //后期不需求
            music: payload?.music,
            playMode: MODE.PLAY_IN_ORDER,
            showLyric: false,
        };
        console.log(this.state)
        return this.state
    }

    // //计算属性 根据先有后状态或其他计算值衍生的数据
    // @computed get totalName() {
    //     return this.musicUrl + "test"
    // }

    // //异步action 有三种操作方法
    // @action.bound asyncChange() {
    //     setTimeout(() => {
    //         runInAction(() => {
    //             this.musicUrl = "change Name"
    //         })
    //     }, 100)
    // }
}

export default MusicStore;