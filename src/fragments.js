export const USER_FRAGMENT = `
    id 
    userName 
    email 
    firstName 
    lastName 
    bio
    avatar`;

export const COMMENT_FRAGMENT = `
comments {
    id
    text
    user {
        ${USER_FRAGMENT}
    }
}`;

export const FILE_FRAGMENT = `
files {
    id
    url
}`;

export const FULL_POST_FRAGMENT = `
fragment PostParts on Post {
    id
    caption
    location

    ${FILE_FRAGMENT}

    ${COMMENT_FRAGMENT}

    user {
        ${USER_FRAGMENT}
    }
}`;

export const ROOM_FRAGMENT = `
fragment RoomParts on Room {
    id
    participants {
        ${USER_FRAGMENT}
    }
}`;
