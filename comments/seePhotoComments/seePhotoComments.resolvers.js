import client from "../../client"

export default {
  Query: {
    seePhotoComments: async (_, {page, photoId}) =>
      await client.comment.findMany({where: {photoId}, skip: (page-1)*5, take: 5, orderBy: {createdAt: "asc"}})
  }
}