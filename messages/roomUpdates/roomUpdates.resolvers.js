import { withFilter } from "graphql-subscriptions";
import client from "../../client";
import { NEW_MESSAGE } from "../../constants";
import pubsub from "../../pubsub";

export default {
  Subscription: {
    roomUpdates: {
      subscribe: async (root, args, loggedInUser, info) => {
        console.log(args);
        console.log(loggedInUser)
        const room = await client.room.findFirst({
          where: {
            id: args.id,
            users: {
              some: {
                id: loggedInUser.id
              }
            }
          },
          select: {
            id: true
          }
        })
        if (!room) {
          throw new Error("You can't see this room.")
        }
        return withFilter(
          () => pubsub.asyncIterator(NEW_MESSAGE),
          ({roomUpdates}, {id}) => {
            return roomUpdates.roomId === id;
          }
        )(root, args, loggedInUser, info)
      }
      
      
    }
  }
}