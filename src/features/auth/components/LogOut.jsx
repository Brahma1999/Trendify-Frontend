import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectLoggedInUser, signOutAsync } from '../authSlice';

export default function LogOut() {
    const dispatch = useDispatch();
    const user = useSelector(selectLoggedInUser);

    useEffect(() => {
        if (user) {
            dispatch(signOutAsync(user.id));
        }
    }, [dispatch, user]);

    return <Navigate to="/login" />;
}
