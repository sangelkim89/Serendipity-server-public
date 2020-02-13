export const USER_FRAGMENT = `
fragment UserParts on User{
    id
    tags{
        ${TAG_FRAGMENT}
    }
}
`;

export const TAG_FRAGMENT = `
    tag
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

participants{
    id
    ${USER_FRAGMENT}
}
messages{
    ${MESSAGE_FRAGMENT}
}
}
`;
