<<<<<<< HEAD
import client from "../client"

export default {
  Comment: {
    user: ({userId}) => client.user.findUnique({where: {id: userId}}),
    photo: ({photoId}) => client.photo.findUnique({where: {id: photoId}}),
=======
export default {
  Comment: {
>>>>>>> 21ec01b1797b127a147b0c744c3c8cf8a692c19a
    isMine: ({userId}, __, {loggedInUser}) => {
      if (!loggedInUser) {
        return false
      }
      return userId === loggedInUser.id
    }
  }
}