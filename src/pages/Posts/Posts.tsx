import { InfoBlock } from "../../components/InfoBlock/InfoBlock"
import { Link } from "react-router-dom"
import { useDeleteDataMutation, useFetchDataQuery } from "../../store/dataApi"
import { Bin } from "../../components/Icons/Bin"

const Posts = () => {
  const { data, isLoading, isError, error } = useFetchDataQuery('posts?_limit=10')
  const [deleteItem] = useDeleteDataMutation()

  return (
    <>
      <h1 className="mb-4 font-semibold text-lg">Posts</h1>
      {isError && <h4>{ error.toString() }</h4>}
      {isLoading ? <h4>Loading...</h4> : <ul>
        {data?.map(post => (
          <li key={post.id} className="relative">
            <Link to={`/posts/${ post.id }`}>
              <InfoBlock title={ post.title } />
            </Link>
            <div
              onClick={ async () => await deleteItem({ path: 'posts', id: post.id.toString() }).unwrap() }  
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

export { Posts }