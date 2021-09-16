const HOME = '/'
const HOME_DISCOVERY = `/discovery`
const HOME_SEARCH = `/search`

const PLAYLIST = '/playlist'
const PLAYLIST_ID = '/playlist/:id'
const QUEUE = '/queue'
const GENRE_BASE = '/genre'
const GENRE = '/genre/:cat'

const SEARCH_GENRE_BASE = '/searchGenre'
const SEARCH_GENRE = '/searchGenre/:search'

const COLLECTION_BASE = '/collection'
const COLLECTION = '/collection/:type'

const LYRIC = '/lyric'


const LOGIN = '/login'


const DEFAULT_ROUTE: string = HOME

const ROUTES = {
    HOME,
    HOME_DISCOVERY,
    HOME_SEARCH,
    PLAYLIST_ID,
    PLAYLIST,
    QUEUE,
    GENRE,
    LYRIC,
    GENRE_BASE,
    SEARCH_GENRE_BASE,
    SEARCH_GENRE,
    COLLECTION_BASE,
    COLLECTION,
    LOGIN,
    DEFAULT_ROUTE
}

export default ROUTES
