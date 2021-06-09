import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        'API-KEY': 'abbdd15d-25c5-489b-bf41-880fe8431dc9'
    },
})

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return (
            instance.get(`users?page=${currentPage}&count=${pageSize}`)
                .then(response => {
                    return response.data
                })
        )
    },
    followUsers(id: string) {
        return (
            instance.post(`follow/${id}`, {})
                .then(response => {
                    return response.data
                })
        )
    },
    unFollowUsers(id: string) {
        return (
            instance.delete(`follow/${id}`, {})
                .then(response => {
                    return response.data
                })
        )
    },
}

export const profileAPI={
    getProfilePage(userId: number) {
        return (
            instance.get(`profile/${userId}`)
                .then(response => {
                    return response.data
                })
        )
    },
    getStatus(userId: number) {
        return (
            instance.get(`profile/status/${userId}`)
                .then(response => {
                    return response.data
                })
        )
    },
    updateStatus(status: string) {
        return (
            instance.put(`profile/status`, {status: status})
                .then(response => {
                    return response.data
                })
        )
    },
}

export const authAPI={
    me() {
        return (
            instance.get(`auth/me`)
                .then(response => {
                    return response.data
                })
        )
    },
    login(email: string | null, password: string | null, rememberMe: boolean) {
        return (
            instance.post(`/auth/login`, {email, password, rememberMe})
                .then(response => {
                    return response.data
                })
        )
    },
    logout() {
        return (
            instance.delete(`/auth/login`)
                .then(response => {
                    return response.data
                })
        )
    }
}



