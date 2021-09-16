import { IAudioInfo, IMusicState, MODE } from './interface/IMusicStore'
import { action, computed, runInAction, makeAutoObservable } from 'mobx'
import { IMyMusic } from '../apis/types/business'
import { getMusicUrl } from '../helpers/business'

class MusicStore {
  //es7的装饰器语法
  state: IMusicState
  audioInfo: IAudioInfo
  playList: IMusicState[]
  musicSearchValue:string

  //mobx版本6之后的更新需要显式加入makeAutoObservable
  constructor() {
    this.state = {
      musicId: 0,
      musicUrl: '',
      playMode: MODE.PLAY_IN_ORDER,
      showLyric: true,
    }
    this.musicSearchValue = ""
    this.audioInfo = {}
    this.playList = JSON.parse(localStorage.getItem('playlist') || '[]')
    makeAutoObservable(this)
  }

  @action.bound
  public SET_SEARCH_VALUE(payload: string) {
    this.musicSearchValue = payload
  }


  //用于绑定this 去除bound this指向的就不是容器的实例对象
  @action.bound
  public PLAY(payload: IDictionary<any>) {
    this.state = {
      musicId: payload?.musicId,
      musicUrl: getMusicUrl(payload?.musicId),
      music: payload?.music,
      //后期需求
      playMode: MODE.PLAY_IN_ORDER,
      showLyric: false,
    }
    console.log(this.state)
    // this.SET_PLAYLIST(this.state)
    return this.state
  }

  @action.bound
  public SET_PLAYLIST(payload: IMusicState[] | IMusicState) {
    if (localStorage.getItem('playlist')) {
      let playList: IMusicState[] = JSON.parse(
        localStorage.getItem('playlist') || '[]',
      )
      if (playList instanceof Array) {
        if (payload instanceof Array) {
          //如果都是数组直接连接数组
          localStorage.setItem('playlist', JSON.stringify(payload))
        } else {
          if (!playList.some((it) => it.musicId == payload.musicId)) {
            playList.unshift(payload)
            localStorage.setItem('playlist', JSON.stringify(playList))
          }
        }
      }
    } else {
      if (payload instanceof Array) {
        //如果都是数组直接连接数组
        localStorage.setItem('playlist', JSON.stringify(payload))
      } else {
        localStorage.setItem('playlist', JSON.stringify([payload]))
      }
    }
    this.playList = JSON.parse(localStorage.getItem('playlist') || '[]')
    // return this.state
  }

  @action.bound
  //暂时不需要
  public SET_PLAYHISTORY(payload: IDictionary<any>) {
    return this.state
  }

  @action.bound
  public SET_AUDIOINFO(payload: IDictionary<any>) {
    this.audioInfo = payload
  }

  @action.bound
  public PLAY_NEXT_MUSIC() {
    switch (this.state.playMode) {
      case MODE.PLAY_IN_ORDER: {
        const idx = this.playList.findIndex(
          ({ musicId }: IMusicState) => musicId === this.state.musicId,
        )
        if (this.playList.length) {
          const nextIdx = idx > -1 ? (idx + 1) % this.playList.length : 0
          this.PLAY_MUSIC(nextIdx)
        }
        return
      }
      case MODE.SINGLE_CYCLE: {
        this.audioInfo.control?.play()
        return
      }
      case MODE.SHUFFLE_PLAYBACK: {
        if (this.playList.length) {
          const randomIdx = Math.floor(Math.random() * this.playList.length)
          this.PLAY_MUSIC(randomIdx)
        }
        return
      }
      default:
        return
    }
  }

  @action.bound
  public PLAY_PREV_MUSIC() {
    switch (this.state.playMode) {
      case MODE.PLAY_IN_ORDER: {
        const idx = this.playList.findIndex(
          ({ musicId }: IMusicState) => musicId === this.state.musicId,
        )
        if (this.playList.length) {
          const preIdx =
            idx == 0
              ? this.playList.length - 1
              : (idx - 1) % this.playList.length
          this.PLAY_MUSIC(preIdx)
        }
        return
      }
      case MODE.SINGLE_CYCLE: {
        this.audioInfo.control?.play()
        return
      }
      case MODE.SHUFFLE_PLAYBACK: {
        if (this.playList.length) {
          const randomIdx = Math.floor(Math.random() * this.playList.length)
          this.PLAY_MUSIC(randomIdx)
        }
        return
      }
      default:
        return
    }
  }

  @action.bound
  public PLAY_MUSIC(idx: number) {
    this.PLAY(this.playList[idx])
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

export default MusicStore
