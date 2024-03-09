"use client"

import Image from "next/image";
import {useEffect, useRef, useState} from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import {IconClose} from "../svg/IconClose";
import {searchVideo} from "../serverActions/searchAction";


export function SearchBar () {
    const [search, setSearch] = useState('')
    const [videos, setVideos] = useState([])
    const ref = useRef(null)

    useEffect(() => {
        document.addEventListener('click', handleResult)

        return () => {
            document.removeEventListener('click', handleResult)
        }
    }, [])

    useEffect(() => {
        if (search.length > 0) {
            const searchAction = async () => {
                const result = await searchVideo({searchKey: search})

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


        {videos.length > 0 && <article ref={ref} className={'search-results'}>
            <IconClose className={'close'} onClick={resetSearch} />
            {videos.map(video =>
                <Link
                    key={video.id}
                    href={video.url}
                    target={'_blank'}>{video.name} - {video.category.name}</Link>)}
        </article>}
    </section>
}