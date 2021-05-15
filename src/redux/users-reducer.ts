type PhotoType = {
    small: null | string
    large: null | string
}

export type UserType = {
    name: string
    id: string
    uniqueUrlName: null | string
    photos: PhotoType
    status: null | string
    followed: boolean
}

export type InitialStateType = typeof initialState;

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_FOLLOWING_IN_PROGRESS = 'TOGGLE_FOLLOWING_IN_PROGRESS';

export const follow = (userId: string) => {
    return {
        type: FOLLOW, userId: userId
    } as const
}

export const unFollow = (userId: string) => {
    return {
        type: UNFOLLOW, userId: userId
    } as const
}

export const setUsers = (users: Array<UserType>) => {
    return {
        type: SET_USERS, users: users
    } as const
}
export const setTotalUsersCount = (totalUsersCount: number) => {
    return {
        type: SET_TOTAL_USERS_COUNT, totalCount: totalUsersCount
    } as const
}
export const setCurrentPage = (currentPage: number) => {
    return {
        type: SET_CURRENT_PAGE, currentPage: currentPage
    } as const
}
export const toggleIsFetching = (isFetching: boolean) => {
    return {
        type: TOGGLE_IS_FETCHING, isFetching: isFetching
    } as const
}
export const toggleIsFollowingInProgress = (userId: string, isFetching: boolean) => {
    return {
        type: TOGGLE_FOLLOWING_IN_PROGRESS, userId, isFetching
    } as const
}

type followActionType = ReturnType<typeof follow>
type unFollowActionType = ReturnType<typeof unFollow>
type setUsersActionType = ReturnType<typeof setUsers>
type setCurrentPageActionType = ReturnType<typeof setCurrentPage>
type setTotalUsersCountActionType = ReturnType<typeof setTotalUsersCount>
type toggleIsFetchingActionType = ReturnType<typeof toggleIsFetching>
type toggleIsFollowingInProgressActionType = ReturnType<typeof toggleIsFollowingInProgress>

export type ActionsTypes = followActionType | unFollowActionType | setUsersActionType |
    setCurrentPageActionType | setTotalUsersCountActionType | toggleIsFetchingActionType |
    toggleIsFollowingInProgressActionType

export let initialState = {
    users: [] as Array<UserType>,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<string>
}

export const usersReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            }

        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u;
                })
            }

        case SET_USERS:
            return {
                ...state, users: [...action.users]
            }

        case SET_CURRENT_PAGE:
            return {
                ...state, currentPage: action.currentPage
            }

        case SET_TOTAL_USERS_COUNT:
            return {
                ...state, totalUsersCount: action.totalCount
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state, isFetching: action.isFetching
            }
        case TOGGLE_FOLLOWING_IN_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        default:
            return state;
    }
}