import {api, axiosService} from './api.service'
import {BASE_URL, constants,HttpMethod,RequestConfig} from "../../utils/constants";

export const SetBaseUrl = () => {
    const storageUser = localStorage.getItem(constants.LOCAL_STORAGE_USER)
    let base_url = BASE_URL;
    if (storageUser !== null) {
        let user = JSON.parse(storageUser)?.user;
        if (user && user.roles) {
            let role_id = user.roles[0].id;
            if (role_id == constants.ROLES.ROLE_ADMIN) {
                base_url = constants.ADMIN_URL;
            } else if (role_id == constants.ROLES.ROLE_VENDOR) {
                base_url = constants.VENDOR_URL;
            } else if (role_id == constants.ROLES.ROLE_CSA) {
                base_url = constants.CSA_URL;
            } else {
                base_url = constants.BASE_URL;
            }
        }
    }
    return base_url

}

export const POST = async (url: string, data: any = null, config: object | undefined = undefined) => {
    const res = await api.post(SetBaseUrl() + url, data, config || undefined);
    return res?.data;
}



const requestWithoutToken = async (method: HttpMethod, url: string, { params, data, config }: RequestConfig = {}) => {
    const fullUrl = SetBaseUrl() + url;
    const response = await axiosService.request({
        method,
        url: fullUrl,
        params,
        data,
        ...config,
    });
    return response?.data;
}

export const GET = async (url: string, params: object | undefined = undefined) => {
    const res = await api.get(SetBaseUrl() + url, {
        params
    });
    return res?.data;
}

export const PUT = async (url: string, id: string, data: any = null, config: object | undefined = undefined) => {
    const res = await api.put(SetBaseUrl() + url + "/" + id, data, config || undefined);
    return res?.data;
}

export const DELETE = async (url: string, id: string) => {
    const res = await api.delete(SetBaseUrl() + url + "/" + id);
    return res?.data;
}

