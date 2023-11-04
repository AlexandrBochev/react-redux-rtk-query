import { Link } from "react-router-dom"
import { InfoBlock } from "../../components/InfoBlock/InfoBlock"
import { Bin } from "../../components/Icons/Bin"
import { useDeleteDataMutation, useFetchDataQuery } from "../../store/dataApi"

const Users = () => {
  const { data, isLoading, isError, error } = useFetchDataQuery('users?_limit=10')
  const [deleteItem] = useDeleteDataMutation()

  return (
    <>
      <h1 className="mb-4 font-semibold text-lg">Users</h1>
      {isError && <h4>{ error.toString() }</h4>}
      {isLoading ? <h4>Loading...</h4> : <ul>
        {data?.map(user =>
          <li key={user.id} className="relative">
            <Link to={`/users/${ user.id }`}>
              <InfoBlock title={ user.name } email={ user.email } />
            </Link>
            <div
              onClick={ async () => await deleteItem({ path: 'users', id: user.id.toString() }).unwrap() } 
              className="absolute top-4 right-4 ml-4 text-red-600 cursor-pointer z-10"
            >
              <Bin />
            </div>
          </li>)}
      </ul>}
    </>
  )
}

export { Users }