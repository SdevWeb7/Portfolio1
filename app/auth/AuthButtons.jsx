"use client"

import {signIn, signOut} from "next-auth/react";
import {useState} from "react";
import {IconLogin} from "/assets/svg/IconLogin";
import {IconLogout} from "/assets/svg/IconLogout";
import toast from "react-hot-toast";

export function LoginButtonGithub () {
    return (
        <button
            onClick={async() => {
                return await signIn('github')
            }}>Login with Github</button>
    )
}

export function LoginButtonEmail () {
    const [email, setEmail] = useState('')

    return <><input
            type="text" value={email}
            placeholder={'example@example.com'}
            onChange={e => setEmail(e.target.value)}/>

        <button
            onClick={async() => {
                return await signIn('email', {
                    email: email})
            }}>Login with Email</button></>
}

export function LogoutButton ({children, className}) {
    return (
        <button
            className={className}
            onClick={async(e) => {
                e.stopPropagation()
                return await signOut()
            }}>

            <IconLogout/>

            {children}
        </button>
    )
}

export function LoginButton ({children, className}) {
    return (
        <button
            className={className}
            onClick={async(e) => {
                e.stopPropagation()
                const signed = await signIn()
                if (!signed?.ok) {
                    return toast.error('Problème de connexion')
                }
                toast.success('Vous êtes connecté')
                return signed
            }}>
            <IconLogin />
            {children}
        </button>
    )
}