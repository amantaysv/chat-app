export const BASE_URL = 'https://www.theaudiodb.com/api/v1/json'

export const getArtistByName = (name: string) => BASE_URL + `/2/search.php?s=${name}`
