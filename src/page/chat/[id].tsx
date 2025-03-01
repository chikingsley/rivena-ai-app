import { useParams } from '@solidjs/router';

export default function ChatDetail() {
  const params = useParams(); // Get the :id from URL
  return <h1>Chat with ID: {params.id}</h1>;
}
