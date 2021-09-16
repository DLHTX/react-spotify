enum ORDER {
  HOT = 'hot',
  NEW = 'new',
}

export interface IGetSonglistsDetailRequest {
  id: number
}

export enum COLLECT {
  COLLECT = 1,
  UNCOLLECT = 2,
}

export interface ISubscribeSongListRequest {
  id: number
  t: COLLECT
}

export interface IGetSonglistsRequest {
  cat?: string
  order?: ORDER
  limit?: number
  offset?: number
}

export interface ICategory {
  activity: boolean
  category: number
  hot: boolean
  name: string
  type: number
}

export interface IGetSonglistCatsResponse {
  all: ICategory
  categories: IDictionary<string>
  sub: ICategory[]
}
