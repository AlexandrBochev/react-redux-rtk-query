import { Link } from "react-router-dom"
import { InfoBlock } from "../../components/InfoBlock/InfoBlock"
import { useDeleteDataMutation, useFetchDataQuery } from "../../store/dataApi"
import { Bin } from "../../components/Icons/Bin"

const Comments = () => {
  const { data, isLoading, isError, error } = useFetchDataQuery('comments?_limit=10')
  const [deleteItem] = useDeleteDataMutation()

  return (
    <>
      <h1 className="mb-4 font-semibold text-lg">Comments</h1>
      {isError && <h4>{ error.toString() }</h4>}
      {isLoading ? <h4>Loading...</h4> : <ul>
        {data?.map(comment =>
          <li key={comment.id} className="relative">
            <Link to={`/comments/${ comment.id }`}>
              <InfoBlock title={ comment.name } />
            </Link>
            <div
              onClick={ async () => await deleteItem({ path: 'comments', id: comment.id.toString() }).unwrap() }
              className="absolute top-4 right-4 ml-4 text-red-600 cursor-pointer z-10"
            >
              <Bin />
            </div>
          </li>
        )}
      </ul>}
    </>
  )
}

export { Comments }