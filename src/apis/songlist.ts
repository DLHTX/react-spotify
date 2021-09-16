import axios from '../helpers/axios'
import { ISonglist } from './types/business'
import { IGetSonglistsRequest,IGetSonglistsDetailRequest, IGetSonglistCatsResponse, ICategory, ISubscribeSongListRequest } from './types/songlist'
import { PAGE_SIZE } from '../constants/pagination'

type GetSonglistsDetailFn = (params: IGetSonglistsDetailRequest) => Promise<{ playlist: ISonglist}>
type GetSonglistsFn = (params: IGetSonglistsRequest) => Promise<{ playlists: ISonglist[]; total: number }>
type GetSonglistCatsFn = () => Promise<IGetSonglistCatsResponse>
type GetSonglistHotCatsFn = () => Promise<ICategory[]>
type GetHighQualitySonglistFn = (cat?: string) => Promise<ISonglist>
type GetUserSonglistFn = (uid: number) => Promise<{ create: ISonglist[]; collect: ISonglist[] }>
type SubscribeSongListFn = (params:ISubscribeSongListRequest) => Promise<any>



const subscribeSongList: SubscribeSongListFn = async ({ id,t }) => {
  const response = await axios({
    url: '/playlist/subscribe',
    params: {
      id,
      t
    },
  })

  return response
}

const getSongListDetail: GetSonglistsDetailFn = async ({ id }) => {
  const response = await axios({
    url: '/playlist/detail',
    params: {
      id,
    },
  })

  return response
}

const getSonglists: GetSonglistsFn = async ({ cat, order, limit = PAGE_SIZE, offset }) => {
  const response = await axios({
    url: '/top/playlist',
    params: {
      cat,
      order,
      limit,
      offset,
    },
  })

  return response
}

const getSonglistCats: GetSonglistCatsFn = async () => {
  const response = await axios({
    url: '/playlist/catlist',
  })

  return response
}

const getSonglistHotCats: GetSonglistHotCatsFn = async () => {
  const response = await axios({
    url: '/playlist/hot',
  })

  return response.tags
}

const getHighQualitySonglist: GetHighQualitySonglistFn = async (cat = '全部') => {
  const response = await axios({
    url: '/top/playlist/highquality',
    params: {
      limit: 1,
      cat,
    },
  })

  return response?.playlists?.[0]
}

const getUserSonglist: GetUserSonglistFn = async (uid) => {
  const response = await axios({
    url: '/user/playlist?timestamp=' + new Date().getTime(),
    params: {
      uid,
      limit: PAGE_SIZE,
    },
  })

  const playlist: ISonglist[] = response.playlist || []
  const create = playlist.filter(({ creator }) => uid === creator.userId)
  const collect = playlist.filter(({ creator }) => uid !== creator.userId)

  return {
    create,
    collect,
  }
}

export default {
  getSongListDetail,
  getSonglists,
  getSonglistCats,
  getSonglistHotCats,
  getHighQualitySonglist,
  getUserSonglist,
  subscribeSongList
}
