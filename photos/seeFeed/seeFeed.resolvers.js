import client from "../../client";
import { protectedResolver } from "../../users/users.utils";


<<<<<<< HEAD
const seeFeedFn = async (_, {offset}, { loggedInUser }) => {
  const feed = await client.photo.findMany({
    take: 2,
    skip: offset,
=======
const seeFeedFn = async (_, __, { loggedInUser }) => {
  const feed = await client.photo.findMany({
>>>>>>> 21ec01b1797b127a147b0c744c3c8cf8a692c19a
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
