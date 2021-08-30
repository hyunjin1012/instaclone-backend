import client from "../client";

export default {
  Room: {
    users: ({id}) => client.room.findUnique({where: {id}}).users(),
    messages: ({id}) => client.message.findMany({
      where: {roomId: id}
    }),
    unreadTotal: ({id}, __, {loggedInUser}) => {
      if(!loggedInUser) {
        return 0
      } else return client.message.count({
        where: {
          roomId: id,
          room: {users: {some: {id: loggedInUser.id}}},
          userId: {not: loggedInUser.id},
          read: false,
          
        }
      })
    }
  },
  Message: {
    user: ({ id }) => client.message.findUnique({ where: { id } }).user(),
    room: ({roomId}) => client.room.findUnique({where: {id: roomId}})
  },
}