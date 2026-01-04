import { useEffect, useState } from "react"
import CreatePost from "./CreatePost"

export default function Home() {
  const [posts, setPosts] = useState([])
  const token = localStorage.getItem("token")

  useEffect(() => {
    fetch("http://localhost:5000/posts")
      .then(res => res.json())
      .then(setPosts)
  }, [])

  return (
    <div className="max-w-2xl mx-auto p-4">
      {token && (
        <div className="bg-white rounded-xl p-4 shadow mb-6">
          <CreatePost onPost={p => setPosts([p, ...posts])} />
        </div>
      )}

      <div className="space-y-4">
        {posts.map(p => (
          <div key={p._id} className="bg-white p-4 rounded-xl shadow-sm">
            {p.text}
          </div>
        ))}
      </div>
    </div>
  )
}
