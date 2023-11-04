import { useParams } from "react-router"
import { Button } from "../../components/Button/Button"
import { InfoBlock } from "../../components/InfoBlock/InfoBlock"
import { useFetchDataQuery } from "../../store/dataApi"

const PhotoDetails = () => {
  const { photoId } = useParams()
  const { data, isLoading, isError, error } = useFetchDataQuery('photos?_limit=10')
  const photo = data?.find(photo => photo.id === Number(photoId))

  return (
    <>
      {isError && <h4>{ error.toString() }</h4>}
      {isLoading ? <h4>Loading...</h4> : photo && <div>
        <h1 className="mb-4 font-semibold text-lg">{photo.title}</h1>
        <InfoBlock url={ photo.url } />
        <Button linck="/">Go back</Button>
      </div>}
    </>
  )
}

export { PhotoDetails }