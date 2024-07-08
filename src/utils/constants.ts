export const BASE_URL:string = `${process.env.REACT_APP_BASE_URL}`

export type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';
export type OptionType = 'chip' | 'drink' | 'chocolate';
export interface RequestConfig {
    params?: any;
    data?: any;
    config?: object;
}

const roles:object = {
    ROLE_ADMIN: "1",
    ROLE_USER: "2",
}

const page:object = {
    PRIVACY_POLICY: 'privacy-policy',
    TERMS: 'terms-and-conditions'
}

const contentType:object = {
    'image/jpeg': 'image',
    'image/jpg': 'image',
    'image/png': 'image',
    'image/gif': 'image',
    'application/pdf': 'doc',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'doc',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'doc',
    'audio/mpeg': 'audio',
    'video/mp4': 'video',
}

const errorMessages:object = {
    fileSize: 'The file size is too large',
    fileSuccess: 'file uploaded successfully',
    fileError: 'Error in uploading file',
}

export const s3Credential:object = {
    bucketName: "dummy-bucket",
    region: "us-east-1",
    accessKeyId: "accessKeyId",
    secretAccessKey: "secretAccessKey",
    fileSize: '10000000'
}

export const constants:any = {
    LOCAL_STORAGE_TOKEN: 'AUTH_ACCESS_TOKEN',
    LOCAL_STORAGE_USER: 'USER_DATA',
    BASE_URL: process.env.REACT_APP_BASE_URL,
    CSA_URL: process.env.REACT_APP_CSA_BASE_URL,
    ADMIN_URL: process.env.REACT_APP_ADMIN_BASE_URL,
    VENDOR_URL: process.env.REACT_APP_VENDOR_BASE_URL,
    ROLES: roles,
    NOTIFICATIONTYPES: '',
    LOCALE: 'en-OM',
    CURRENCY: 'OMR',
    PAGES: page,
    PERPAGE: 20,
    ORDER_BY_VALUE: 'desc',
    ORDER_BY_COLUMN: 'id',
    COLLECTION: '',
    S3CREDENTIAL: s3Credential,
    ERRORMESSAGES: errorMessages,
    CONTENTTYPE: contentType,
};