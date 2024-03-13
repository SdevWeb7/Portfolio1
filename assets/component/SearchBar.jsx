"use client"

import {useEffect, useRef, useState} from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import {IconClose} from "/assets/svg/IconClose";
import {searchVideo} from "/actions/searchAction";
import { IconSearch } from "../svg/IconSearch";


export function SearchBar () {
    const [search, setSearch] = useState('')
    const [videos, setVideos] = useState([])
    const ref = useRef(null)
    const inputRef = useRef(null)

    useEffect(() => {
        document.addEventListener('click', handleResult)

        return () => {
            document.removeEventListener('click', handleResult)
        }
    }, [])

    useEffect(() => {
        if (search.length > 0) {
            const searchAction = async () => {
                const result = await searchVideo({
                    searchKey: search})

                if (result.serverError) {
                    toast.error(result.serverError)
                } else {
                    setVideos(result.data)
                }
            }
            searchAction()
        }
    }, [search])


    const handleResult = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
            resetSearch()
        }
    }
    const resetSearch = () => {
        setVideos([])
        setSearch('')
    }

    return <section className={'search-bar'}>
        <IconSearch
           onClick={() => inputRef.current.focus()} />

        <input
           ref={inputRef}
            type="text"
            placeholder={'Chercher une vidéo'}
            value={search}
            onChange={e => setSearch(e.target.value)}/>


        {videos.length > 0 && <article ref={ref} className={'search-results'}>
            <IconClose
               className={'close'}
               onClick={resetSearch} />

            {videos.map(video =>
                <Link
                    key={video.id}
                    href={video.url}
                    target={'_blank'}>{video.name} - {video.category.name}</Link>)}
        </article>}
    </section>
}