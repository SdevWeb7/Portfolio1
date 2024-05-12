"use client"

import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export function ConfirmModal ({setConfirmModal}) {
   const router = useRouter()
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

            <button
               className={"disconnect"}
               onClick={() => router.push('/auth/signout')}>
               Oui
            </button>

            <button
               onClick={() => setConfirmModal(false)}>Annuler</button>
         </article>
      </section>,
      document.body
      )
}
