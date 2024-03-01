import {useQuery} from "react-query";
import Image from "next/image";
import { v4 as uuidv4 } from 'uuid';

export function QueryComponent () {
    const {data, isLoading} = useQuery(['data'], async() => fetch('/data.json').then(r => r.json()))



    return <div className={'movies-container'}>
            {data && data.map(movie => {
                return <div key={uuidv4()} className="movie">
                    <Image
                        src={movie.thumbnail.regular.small}
                        alt={"image-movie"}
                        width={300}
                        height={100} />
                </div>
            })}

            {isLoading && <h1>Loading...</h1>}
        </div>
}