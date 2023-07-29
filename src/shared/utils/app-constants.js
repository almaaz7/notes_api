export const AppConstants = {
    SCHEMA:{
        NOTE_SCHEMA : 'notes',
        USER_SCHEMA :'users',
        ROLE_SCHEMA :'roles',
        PERMISSION_SCHEMA :'permissions'
    },
    STATUS_CODE:{
        SUCCESS: 200,
        SERVER_ERROR:500,
        UNAUTHORIZED:401,
        RESOURCE_NOT_FOUND:404
    },
    ROUTES:{
        NOTES:{
            ADD:'/add-note',
            GET_ALL_NOTES:'/all-notes',
            Del_note:'/del-note',
            Update_note:'/update-note'
        },
        USER:{
            ADD:'/add-user',
            View_User:'/view-user',
            DEL_user:'/del-user',
            Update_user:'/update-user'  
        }
    }
}
export const NOTE_ROUTES = AppConstants.ROUTES.NOTES;
export const USER_ROUTES =AppConstants.ROUTES.USER;
export const SCHEMA = AppConstants.SCHEMA;
export const STATUS_CODES = AppConstants.STATUS_CODE;