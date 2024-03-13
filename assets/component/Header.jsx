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
import { IconNews } from "../svg/IconNews";
import { IconCategories } from "../svg/IconCategories";
import { IconLike } from "../svg/IconLike";
import { IconAdd } from "../svg/IconAdd";

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
            <IconNews className={'icons'} />
            {isOpenMenu && <p>Nouveautés</p>}
        </Link>


        <Link href={'/categories'} className={'links'}>
            <IconCategories className={'icons'} />
            {isOpenMenu && <p>Catégories</p>}
        </Link>


        <Link href={'/favoris'} className={'links'} onClick={navigateFavoris}>
            <IconLike className={'icons'} />

            {isOpenMenu && <p>Favoris</p>}
        </Link>

        <Link href={'/partager'} className={'links'} onClick={navigatePartager}>
            <IconAdd className={'icons'} />

            {isOpenMenu && <p>Partager</p>}
        </Link>


        <section className={'profil'}>
        {session ? <>
           <Link href="/profil" className={'links'}>
              <div
                 className="img-profil"
                 style={{backgroundImage: `url(${session?.user?.image ?? '/assets/icon-smiley.svg'})`}}></div>

               {isOpenMenu && <p>Profil</p>}
           </Link>
           <Link href={'#'} className={'links'}
                 onClick={e => {
                        e.preventDefault()
                        setConfirmModal(true)
                     }}>
               <IconLogout className={'icons'} />
                {isOpenMenu && <p
                   style={{marginLeft: '.5rem'}}>Déconnexion</p>}
           </Link></> :

            <Link href={'/auth/signin'} className={"links"}>
                <IconLogin className={"icons"} />
                {isOpenMenu && <p>Connexion</p>}
            </Link>}
        </section>

    </header>
}