import client from "../../client"
import { protectedResolver } from "../../users/users.utils"

const seeRoomFn = async (_, __, {loggedInUser}) => {
  await client.room.findMany({
    where: {users: {some: {id: loggedInUser.id}}}
  })
}

export default {
  Query: {
    seeRooms: protectedResolver(seeRoomFn)
  }
}