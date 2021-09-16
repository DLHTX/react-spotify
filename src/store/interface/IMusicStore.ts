import { IMyMusic } from '../../apis/types/business'
import {
  HTMLMediaControls,
  HTMLMediaState,
} from '../../hooks/utils/createHTMLMediaHook'

export enum MODE {
  PLAY_IN_ORDER = 'PLAY_IN_ORDER',
  SINGLE_CYCLE = 'SINGLE_CYCLE',
  SHUFFLE_PLAYBACK = 'SHUFFLE_PLAYBACK',
}

export interface IMusicStore {
  state: IMusicState
  audioInfo: IAudioInfo
  playList: IMusicState[]
  musicSearchValue: string
  SET_SEARCH_VALUE(payload: string): void
  PLAY(payload: IDictionary<any>): IMusicState
  SET_PLAYLIST(payload: IMusicState[] | IMusicState): void
  SET_PLAYHISTORY(payload: IDictionary<any>): void
  SET_AUDIOINFO(payload: IDictionary<any>): IAudioInfo
  PLAY_NEXT_MUSIC(): void
  PLAY_PREV_MUSIC(): void
  PLAY_MUSIC(index: number): void
}

export interface IMusicState {
  musicId: number
  musicUrl: string
  music?: IMyMusic
  playMode?: MODE
  showLyric?: boolean
}

export interface IAudioInfo {
  audio?: React.ReactElement<any> | undefined
  state?: HTMLMediaState
  control?: HTMLMediaControls
  ref?: {
    current: HTMLAudioElement | null
  }
}
