"use client"

import Image from "next/image";
import {useEffect, useRef, useState} from "react";
import {ArrowMenu} from "/assets/svg/ArrowMenu"
import Link from 'next/link'
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { IconLogin } from "../svg/IconLogin";
import { IconLogout } from "../svg/IconLogout";
import { ConfirmModal } from "./ConfirmModal";

export function Header ({session}) {
    const [isOpenMenu, setIsOpenMenu] = useState(false)
    const [confirmModal, setConfirmModal] = useState(false)
    const router = useRouter()
    const ref = useRef(null)

    useEffect(() => {
        document.addEventListener('click', handleMenu)

        return () => {
            document.removeEventListener('click', handleMenu)
        }
    }, [])

    const handleMenu = (e) => {
        if (ref && !ref.current.contains(e.target)) {
            setIsOpenMenu(false)
        }
    }
    const navigateFavoris = (e) => {
        e.preventDefault()
        if (session) router.push('/favoris')
        else toast.error('Veuillez vous connecter pour accéder a cette page')
    }
    const navigatePartager = (e) => {
        e.preventDefault()
        if (session) router.push('/partager')
        else toast.error('Veuillez vous connecter pour accéder a cette page')
    }


    return <header
            ref={ref}
            className={'header'}
            data-isopen={isOpenMenu}>


        {confirmModal && <ConfirmModal setConfirmModal={setConfirmModal} />}

        <Link
            href={'#'}
            onClick={(e) => {
                e.preventDefault()
                setIsOpenMenu(v => !v)
            }}>
            <ArrowMenu className={'arrow-menu'} /></Link>

        <Link href={'/'} className={'links'}>
            <Image
                src="/assets/logo.svg"
                alt="logo"
                width={30}
                height={30} />
            {isOpenMenu && <p>Nouveautés</p>}
        </Link>


        <Link href={'/categories'} className={'links'}>
            <Image
                src="/assets/icon-nav-home.svg"
                alt="categories"
                width={20}
                height={20} />
            {isOpenMenu && <p>Catégories</p>}
        </Link>


        <Link href={'/favoris'} className={'links'} onClick={navigateFavoris}>
            <Image
                src="/assets/icon-like.svg"
                alt="favoris"
                width={20}
                height={20} />
            {isOpenMenu && <p>Favoris</p>}
        </Link>

        <Link href={'/partager'} className={'links'} onClick={navigatePartager}>
            <Image
                src="/assets/icon-add.svg"
                alt="partager"
                width={20}
                height={20} />
            {isOpenMenu && <p>Partager</p>}
        </Link>


        <section className={'profil'}>
        {session ? <>
           <Link href="/profil" className={'links'}>
              <Image
                src={session.user?.image ?? '/assets/icon-smiley.svg'}
                width={30}
                height={30}
                alt={'icon-profil'} />
               {isOpenMenu && <p>Profil</p>}
           </Link>
           <Link href={'#'} className={'links'}
                 onClick={e => {
                        e.preventDefault()
                        setConfirmModal(true)
                     }}>
               <IconLogout />
                {isOpenMenu && <p
                   style={{marginLeft: '.5rem'}}>Déconnexion</p>}
           </Link></> :

            <Link href={'/auth/signin'} className={"links"}>
                <IconLogin />
                {isOpenMenu && <p>Connexion</p>}
            </Link>}
        </section>

    </header>
}