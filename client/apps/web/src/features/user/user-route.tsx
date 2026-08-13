import { useParams } from 'react-router';

function UserRoute() {
  const params = useParams();

  return <div>User Route: {params.userId}</div>;
}

export default UserRoute;
