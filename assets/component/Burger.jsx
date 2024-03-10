"use client"

import {IconBurger} from "/assets/svg/IconBurger";
import {useState} from "react";
import {IconClose} from "/assets/svg/IconClose";

export function Burger () {
    const [isOpen, setIsOpen] = useState(false)
    const burgerVariant = {
        rotate: isOpen ? 90 : 0,
        opacity: isOpen ? 0 : 1
    }
    const closeVariant = {
        rotate: !isOpen ? 90 : 0,
        opacity: !isOpen ? 0 : 1
    }


    const handleBurger = () => {
        setIsOpen(v => !v)
    }

    return <section className={'burger-container'}>
        <IconBurger
            onClick={handleBurger}
            className={'burger'}
            style={{transform: `rotate(${burgerVariant.rotate}deg)`, opacity: burgerVariant.opacity}} />

        <IconClose
            onClick={handleBurger}
            className={'close-burger'}
            style={{transform: `rotate(${closeVariant.rotate}deg)`, opacity: closeVariant.opacity}} />
    </section>
}