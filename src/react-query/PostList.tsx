import { useState } from "react";
import usePosts from "./usePosts";
const PostList = () => {
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const { data: posts, error, isLoading } = usePosts({ page, pageSize });

  if (error) return <p>{error.message}</p>;
  if (isLoading) return <p>Loading....</p>;

  return (
    <>
      <select className="form-select mb-3">
        <option value=""></option>
        <option value="1">User 1</option>
        <option value="2">User 2</option>
        <option value="3">user 3</option>
      </select>

      <ul className="list-group">
        {posts?.map((post) => (
          <li key={post.id} className="list-group-item">
            {post.title}
          </li>
        ))}
      </ul>

      <button
        disabled={page === 1}
        className="btn btn-primary my-3"
        onClick={() => setPage(page - 1)}
      >
        Previous
      </button>
      <button className="btn btn-primary my-3 ms-2" onClick={() => setPage(page + 1)}>
        Next
      </button>
    </>
  );
};

export default PostList;
