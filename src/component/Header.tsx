"use client"

import Image from "next/image";
import {LoginButton, LogoutButton} from "../../app/auth/AuthButtons";
import {useEffect, useState} from "react";


export function Header ({session}) {
    const [isOpenMenu, setIsOpenMenu] = useState(false)
    const [isVisibleLinks, setIsVisibleLinks] = useState(false)
    const widthMenu = isOpenMenu ? "10rem" : "3.5rem"

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisibleLinks(isOpenMenu)
        }, 200)

        return () => {
            clearTimeout(timer)
        }
    }, [isOpenMenu])


    return <header
            className={'header'}
            style={{
                width: widthMenu,
                alignItems: isOpenMenu ? "start" : "center"}}>

        <div
            className={'container-icons'}
            style={{margin: isOpenMenu ? "0 0 3rem 1.6rem" : "0 0 3rem 0"}}>
            <Image
                src="/assets/logo.svg"
                alt="logo"
                width={30}
                height={30}
                onClick={() => setIsOpenMenu(v => !v)}/>
            {isVisibleLinks && isOpenMenu ? <p>Accueil</p> : ''}
        </div>


        <div
            className={'container-icons'}
            style={{
                margin: isOpenMenu ? "0 0 2rem 1.9rem" : "0 0 2rem 0"}}>
            <Image
                src="/assets/icon-nav-home.svg"
                alt="logo"
                width={20}
                height={20}
                onClick={() => setIsOpenMenu(v => !v)} />
            {isVisibleLinks && isOpenMenu ? <p>Catégories</p> : ''}
        </div>


        <div
            className={'container-icons'}
            style={{margin: isOpenMenu ? "0 0 2rem 1.9rem" : "0 0 2rem 0"}}>
            <Image
                src="/assets/icon-category-movie.svg"
                alt="logo"
                width={20}
                height={20}
                onClick={() => setIsOpenMenu(v => !v)}/>
            {isVisibleLinks && isOpenMenu ? <p>Movies</p> : ''}
        </div>


        <div
            className={'container-icons'}
            style={{margin: isOpenMenu ? "0 0 2rem 1.9rem" : "0 0 2rem 0"}}>
            <Image
                src="/assets/icon-category-tv.svg"
                alt="logo"
                width={20}
                height={20}
                onClick={() => setIsOpenMenu(v => !v)}/>
            {isVisibleLinks && isOpenMenu ? <p>Autres</p> : ''}
        </div>


        <div
            className={'container-icons'}
            style={{margin: isOpenMenu ? "0 0 2rem 1.9rem" : "0 0 2rem 0"}}>
            <Image
                src="/assets/icon-bookmark-full.svg"
                alt="logo"
                width={20}
                height={20}
                onClick={() => setIsOpenMenu(v => !v)}/>
            {isVisibleLinks && isOpenMenu ? <p>Favoris</p> : ''}
        </div>


        <div
            className={'profil-icon'}
            style={{
                margin: isOpenMenu ? 'auto 0 0 1.5rem' : 'auto 0 0 0',
                alignItems: isOpenMenu ? 'start' : "center"}}>

        {session && <>
           <div className="flex mb-8 items-center">
              <Image
                src={session.user?.image ?? '/assets/icon-smiley.svg'}
                width={30}
                height={30}
                alt={'icon-profil'}
                style={{marginLeft: isOpenMenu ? '.1rem' : 0}} />
               {isOpenMenu && isVisibleLinks && <p>Profil</p>}
           </div>
           <div
              className="flex"
              style={{marginLeft: isOpenMenu ? '.3rem' : 0}}>
              <LogoutButton />
                {isOpenMenu && isVisibleLinks && <p>Déconnexion</p>}

           </div></>}

        {!session && <div
           className={'flex items-center'}
           style={{marginLeft: isOpenMenu ? '.3rem' : 0}}>
           <LoginButton />
            {isOpenMenu && isVisibleLinks && <p>Connexion</p>}
        </div>}
        </div>

    </header>
}