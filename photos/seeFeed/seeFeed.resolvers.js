import client from "../../client";
import { protectedResolver } from "../../users/users.utils";


const seeFeedFn = async (_, __, { loggedInUser }) => {
  const feed = await client.photo.findMany({
    where: {
      OR: [
        { user: { followers: { some: { id: loggedInUser.id } } } },
        { userId: loggedInUser.id },
      ],
    },
    orderBy: { createdAt: "desc" },
  });
  // console.log(feed);
  return feed;
};


export default {
  Query: {
    seeFeed: protectedResolver(seeFeedFn)
  }
}
