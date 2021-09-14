import { IMyMusic } from "../../apis/types/business";

export enum MODE {
    PLAY_IN_ORDER = 'PLAY_IN_ORDER',
    SINGLE_CYCLE = 'SINGLE_CYCLE',
    SHUFFLE_PLAYBACK = 'SHUFFLE_PLAYBACK',
}

export interface IMusicStore{
    state:IMusicState
    SET_PLAYLIST(payload: IDictionary<any>):IMusicState
}   

export interface IMusicState {
    musicId: number
    musicUrl: string
    music?: IMyMusic
    playMode: MODE
    showLyric: boolean
}