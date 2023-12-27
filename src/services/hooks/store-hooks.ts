import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store/store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useSessionId = () => {
    const { sessionId, status, error } = useAppSelector((state) => state.sessionId);
    return {
        isSessionId: !!sessionId,
        sessionId,
        status,
        error
    };
};

export const useUser = () => {
    const { user, status, error } = useAppSelector((state) => state.user);
    return {
        isUser: user ? true : false,
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
