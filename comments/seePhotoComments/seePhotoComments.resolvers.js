import client from "../../client"

export default {
  Query: {
    seePhotoComments: async (_, {offset, photoId}) =>
      await client.comment.findMany({where: {photoId}, skip: offset, take: 100, orderBy: {createdAt: "asc"}})
  }
}