"use client"

import { createPortal } from "react-dom";
import Link from "next/link";
import { useEffect, useRef } from "react";

export function ConfirmModal ({setConfirmModal}) {

   const ref = useRef(null)

   useEffect(() => {
      document.addEventListener('click', handleModal)

      return () => {
         document.removeEventListener('click', handleModal)
      }
   }, [])

   const handleModal = (e) => {
      if (ref && !ref.current?.contains(e.target)) {
         setConfirmModal(false)
      }
   }

   return createPortal(
      <section className={'confirm-modal'}>

         <article ref={ref}>
            <h2>Êtes-vous sur de vouloir vous déconnecter ?</h2>

            <Link href={'auth/signout'}>
               Déconnexion</Link>

            <button
               onClick={() => setConfirmModal(false)}>Annuler</button>
         </article>
      </section>,
      document.body
      )
}
