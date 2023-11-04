import { useParams } from "react-router-dom"
import { InfoBlock } from "../../components/InfoBlock/InfoBlock"
import { Button } from "../../components/Button/Button"
import { DataType } from "../../models/models"
import { useSelector } from "react-redux"
import { useFetchDataQuery } from "../../store/dataApi"

const UserDetails = () => {
  const { userId } = useParams()
  const { data, isLoading, isError, error } = useFetchDataQuery('users?_limit=10')
  const user = data?.find(user => user.id === Number(userId))

  return (
    <>
      {isError && <h4>{ error.toString() }</h4>}
      {isLoading ? <h4>Loading...</h4> : user && <div>
        <h1 className="mb-4 font-semibold text-lg">{user.name}</h1>
        <InfoBlock email={ user.email } phone={ user.phone } website={ user.website } />
        <Button linck="/users">Go back</Button>
      </div>}
    </>
  )
}

export { UserDetails }
