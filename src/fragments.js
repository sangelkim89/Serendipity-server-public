export const USER_FRAGMENT = `


    id
   name
   email  
  phone
  birth
  companyName
  companyRole
  geoLocation
  tags
  profileImgLocation
  cardImgLocation
  bio

  
   



`;
export const COMMENT_FRAGMENT = `
   
    id
    text
    user {
        ${USER_FRAGMENT}
    }
`;

export const FILE_FRAGMENT = `
    id
    url
`;
export const MESSAGE_FRAGMENT = `
id
text
to{
    ${USER_FRAGMENT}
}
from{
    ${USER_FRAGMENT}
}

`;

export const FULL_POST_FRAGMENT = `
    fragment PostParts on Post{
        id
        
        location
        caption
        files {
            ${FILE_FRAGMENT}
        }
        comments {
            ${COMMENT_FRAGMENT}
        }
        user {
            
            ${USER_FRAGMENT}
        }
    }
`;
export const ROOM_FRAGMENT = `
fragment RoomParts on Room{
id
createdAt
participants{
   
    ${USER_FRAGMENT}
}
messages{
    ${MESSAGE_FRAGMENT}
}
}
`;

export const MESSAGES_FRAGMENT = `
fragment MessageParts on Message{
id
text

to{
    ${USER_FRAGMENT}
}
from{
    ${USER_FRAGMENT}
}
room{
    id
}
}
`;
