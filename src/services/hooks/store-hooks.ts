import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store/store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useSession = () => {
    const { accessToken, sessionId, status, error } = useAppSelector((state) => state.session);
    return {
        isSession: !!accessToken && !!sessionId,
        accessToken,
        sessionId,
        status,
        error
    };
};

export const useUser = () => {
    const { user, status, error } = useAppSelector((state) => state.user);
    return {
        isUser: !!user,
        user,
        status,
        error
    };
};

export const useStatusNotification = () => {
    const { isSuccess, message } = useAppSelector((state) => state.statusNotification);
    return {
        isSuccess,
        message
    };
};
