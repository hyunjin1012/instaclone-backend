import client from "../../client"

export default {
  Query: {
    seeHashtag: async (_, {hashtag}) => await client.hashtag.findUnique({where: {hashtag}})
      
      
      
      // const hashtagFound = await client.hashtag.findUnique({where: {hashtag}})
      // const photosFound = await client.hashtag.findUnique({where: {hashtag: hashtagFound.hashtag}}).photos({skip: (page-1) * 5 , take: 5})
      // const totalPhotos = await client.photo.count({where: {hashtags:{some: {hashtag: hashtagFound.hashtag}} }})
      // return {
      //   ok: true,
      //   error: null,
      //   photos: photosFound,
      //   totalPhotos

      
      // const photosFound = await client.photo.findMany({where: {hashtags: {some: {hashtag: hashtagFound.hashtag}}}, take: 5, skip: (page - 1) * 5 })  
      // console.log(photosFound)
      // const totalPhotos = photosFound.length
      // console.log(totalPhotos)
      // return {
      //   ok: true,
      //   photos: photosFound,
      //   totalPhotos}
  }
}
  