import { useRouter } from 'next/router'
import { doc, getDoc } from 'firebase/firestore'
import { firestore } from '../../lib/firebase'

import { isCommunityExist, getCommunityUsers } from '../../lib/fetchCommunity'
//TODO

const CommunityPage = (props) => {
  const router = useRouter()
  const { name } = router.query

  const { isValid, users } = props

  return (
      <p>Community Name: {name}, this is a {props.isValid}<button onClick={() => console.log(props.users)}>1244</button></p>
    )
}

export async function getServerSideProps(context) {

  const { name } = context.query;

  const isValid = await isCommunityExist(name);
  const users = await getCommunityUsers(name);

  return {
      props: { 
        isValid: isValid,
        users: JSON.stringify(users),
    }, // will be passed to the page component as props
  };
}

export default CommunityPage