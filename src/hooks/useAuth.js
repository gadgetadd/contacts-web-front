import { useSelector } from 'react-redux';
import {
    selectUser,
    selectIsLoggedIn,
    selectIsRefreshing,
    selectIsAuth,
    selectError
} from '@/redux/selectors';

export const useAuth = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const isAuth = useSelector(selectIsAuth);
    const isRefreshing = useSelector(selectIsRefreshing);
    const user = useSelector(selectUser);
    const error = useSelector(selectError);


    return {
        isLoggedIn,
        isRefreshing,
        isAuth,
        user,
        error
    };
};
