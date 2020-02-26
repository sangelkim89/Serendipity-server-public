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
  bio
  distance



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
createdAt
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
export const NESTEDROOM_FRAGMENT = `

id
createdAt
participants{
   
    ${USER_FRAGMENT}
}
messages{
    ${MESSAGE_FRAGMENT}
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
    ${NESTEDROOM_FRAGMENT}
}
createdAt
}
`;
