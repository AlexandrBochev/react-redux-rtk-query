import { useParams } from "react-router-dom"
import { InfoBlock } from "../../components/InfoBlock/InfoBlock"
import { Button } from "../../components/Button/Button"
import { useFetchDataQuery } from "../../store/dataApi"

const CommentDetail = () => {
  const { commentId } = useParams()
  const { data, isLoading, isError, error } = useFetchDataQuery('comments?_limit=10')
  const comment = data?.find(comment => comment.id === Number(commentId))

  return (
    <>
      {isError && <h4>{ error.toString() }</h4>}
      {isLoading ? <h4>Loading...</h4> : comment && <div>
        <h1 className="mb-4 font-semibold text-lg">{ comment.name }</h1>
        <InfoBlock body={ comment.body } email={ comment.email } />
        <Button linck="/comments">Go back</Button>
      </div>}
    </>
  )
}

export { CommentDetail }