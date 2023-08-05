import {FC, useEffect, useState} from 'react';
import {googleLogout, useGoogleLogin} from "@react-oauth/google";
import axios from "axios";
import {selectName, setUserAuthInfo} from "../../store/slices/userSlice.ts";
import {useAppSelector} from "../../hooks/useAppSelector.ts";
import {useAppDispatch} from "../../hooks/useAppDispatch.ts";
import './Auth.css'

interface IAuth {
    access_token: string
}
const Auth: FC = () => {

    const dispatch = useAppDispatch()

    const [userInfo, setUserInfo] = useState<IAuth>();
    const userName = useAppSelector(selectName)
    const login = useGoogleLogin({
        onSuccess: (res) => setUserInfo(res),
        onError: (err) => console.log(`${err}`)
    });

    const logOut = () => {
        googleLogout();
        dispatch(setUserAuthInfo({
            name: '',
            picture: ''
        }))
    };

    useEffect(
        () => {
            if (userInfo) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${userInfo.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${userInfo.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((response) => {
                        setUserInfo(response.data)
                        const {name, picture} = response.data
                        console.log(name, picture)
                        dispatch(setUserAuthInfo({name, picture}))
                    })
                    .catch((error) => console.log(error));
            }
        },
        [userInfo]
    );

    return (
        <div className="auth">
            {userName ?
                <button className='auth-btn' onClick={logOut}>Log out</button>
                :
                <button className='auth-btn' onClick={() => login()}>Login with Google</button>
            }
        </div>
    );
};

export default Auth;
