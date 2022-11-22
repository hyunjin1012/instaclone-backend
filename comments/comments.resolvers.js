import client from "../client"

export default {
  Comment: {
    user: ({userId}) => client.user.findUnique({where: {id: userId}}),
    photo: ({photoId}) => client.photo.findUnique({where: {id: photoId}}),
    isMine: ({userId}, __, {loggedInUser}) => {
      if (!loggedInUser) {
        return false
      }
      return userId === loggedInUser.id
    }
  }
}