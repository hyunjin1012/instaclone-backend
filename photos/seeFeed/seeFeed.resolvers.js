import client from "../../client";
import { protectedResolver } from "../../users/users.utils";


const seeFeedFn = async (_, {offset}, { loggedInUser }) => {
  const feed = await client.photo.findMany({
    take: 2,
    skip: offset,
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
