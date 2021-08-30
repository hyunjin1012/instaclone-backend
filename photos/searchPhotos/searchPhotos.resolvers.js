import client from "../../client";

export default {
  Query: {
    searchPhotos: async (_, { keyword, page }, { loggedInUser }) => {
      const searchedPhotos = await client.photo.findMany({
        where: { caption: { contains: keyword, mode: "insensitive" } },
        skip: (page - 1) * 5,
        take: 5,
      });
      console.log(searchedPhotos)
      return searchedPhotos
    },
  },
};
