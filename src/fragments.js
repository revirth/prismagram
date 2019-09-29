export const USER_FRAGMENT = `
user {
    id 
    userName 
    email 
    firstName 
    lastName 
    bio
}`;

export const COMMENT_FRAGMENT = `
comments {
    id
    text
    ${USER_FRAGMENT}
}
`;

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

    ${USER_FRAGMENT}
}`;
