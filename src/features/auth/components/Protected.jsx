import React from 'react'
import { selectLoggedInUser } from '../authSlice';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectUserInfo } from '../../user/userSlice';

export default function Protected({ children }) {
    const user = useSelector(selectLoggedInUser);
    const userInfo = useSelector(selectUserInfo);

    if (!user) {
        return <Navigate to="/login" replace={true}></Navigate>
    }
    if (userInfo && userInfo.role !== 'user') {
        return <Navigate to="/admin" replace={true} />;
    }

    return children;
}
