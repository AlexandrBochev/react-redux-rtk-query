import { Bin } from "../../components/Icons/Bin"
import { Link } from "react-router-dom"
import { useDeleteDataMutation, useFetchDataQuery } from "../../store/dataApi"

const Photos = () => {
  const { data, isLoading, isError, error } = useFetchDataQuery('photos?_limit=10')
  const [deleteItem] = useDeleteDataMutation()

  return (
    <>
      <h1 className="mb-4 font-semibold text-lg">Photos</h1>
      {isError && <h4>{ error.toString() }</h4>}
      {isLoading ? <h4>Loading...</h4> : <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {data?.map(photo => (
          <li key={photo.id} className="relative flex flex-col items-center">
            <Link to={`/photos/${ photo.id }`}>
              <img src={ photo.url } width={300} height={300} alt={ photo.title } />
              <div title={ photo.title } className="absolute left-0 bottom-0 w-full h-9">
                <div className="w-full h-full bg-black opacity-50" />
                <p className="absolute left-0 bottom-0 text-white text-sm p-2">{ photo.title && photo.title.slice(0, 20) + '...' }</p>
              </div>
            </Link>
            <div
              onClick={ async () => await deleteItem({ path: 'photos', id: photo.id.toString() }).unwrap() }  
              className="absolute top-4 right-4 ml-4 text-red-600 cursor-pointer z-10"
            >
              <Bin />
            </div>
          </li>
        ))}
      </ul>}
    </>
  )
}

export { Photos }