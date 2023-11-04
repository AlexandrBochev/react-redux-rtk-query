import { useParams } from "react-router-dom"
import { InfoBlock } from "../../components/InfoBlock/InfoBlock"
import { Button } from "../../components/Button/Button"
import { DataType } from "../../models/models"
import { useSelector } from "react-redux"
import { useFetchDataQuery } from "../../store/dataApi"

const PostDetails = () => {
  const { postId } = useParams()
  const { data, isLoading, isError, error } = useFetchDataQuery('posts?_limit=10')
  const post = data?.find(post => post.id === Number(postId))

  return (
    <>
      {isError && <h4>{ error.toString() }</h4>}
      {isLoading ? <h4>Loading...</h4> : post && <div>
        <h1 className="mb-4 font-semibold text-lg">{ post.title }</h1>
        <InfoBlock body={ post.body } />
        <Button linck="/posts">Go back</Button>
      </div>}
    </>
  )
}

export { PostDetails }