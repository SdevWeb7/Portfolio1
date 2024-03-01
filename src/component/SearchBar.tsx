"use client"

import Image from "next/image";
import {useState} from "react";

export function SearchBar () {
    const [search, setSearch] = useState('')


    return <section className={'search-bar'}>

        <Image
            src={'/assets/icon-search.svg'}
            alt={'search-icon'}
            width={40}
            height={40} />


        <input
            type="text"
            placeholder={'Search for a movie'}
            value={search}
            onChange={e => setSearch(e.target.value)}/>


    </section>
}