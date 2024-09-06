import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectLoggedInUser } from '../authSlice';
import { selectUserInfo } from '../../user/userSlice';

export default function ProtectedAdmin({ children }) {
    const user = useSelector(selectLoggedInUser);
    const userInfo = useSelector(selectUserInfo);

    if (!user) {
        return <Navigate to="/login" replace={true} />;
    }

    if (userInfo && userInfo.role !== 'admin') {
        return <Navigate to="/" replace={true} />;
    }

    return children;
}
