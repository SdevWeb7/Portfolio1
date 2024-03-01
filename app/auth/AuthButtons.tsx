"use client"

import {signIn, signOut} from "next-auth/react";
import {useState} from "react";
import {IconLogin} from "../svg/IconLogin";
import {IconLogout} from "../svg/IconLogout";
import toast from "react-hot-toast";
import {Message} from "postcss";

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

export function LogoutButton () {
    return (
        <button onClick={async(e) => {
            e.stopPropagation()
            return await signOut()
        }}>
            <IconLogout/>
        </button>
    )
}

export function LoginButton () {
    return (
        <button onClick={async(e) => {
            e.stopPropagation()
            const signed = await signIn()
            if (!signed?.ok) {
                return toast.error('Problème de connexion')
            }
            toast.success('Vous êtes connecté')
            return signed
        }}>
            <IconLogin />
        </button>
    )
}