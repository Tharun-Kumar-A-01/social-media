import { useState } from "react"

export default function CreatePost({ onPost }) {
  const [text, setText] = useState("")

  const words = text.trim() ? text.trim().split(/\s+/).length : 0

  const submit = async e => {
    e.preventDefault()
    if (words > 40) return

    const res = await fetch("https://social-media-3uzk.onrender.com:5000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      },
      body: JSON.stringify({ text })
    })

    const data = await res.json()
    onPost(data)
    setText("")
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Write something meaningful in 40 words…"
        className="w-full min-h-[100px] resize-none rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
      />

      <div className="flex items-center justify-between text-sm">
        <span className={words > 40 ? "text-red-500" : "text-zinc-500"}>
          {words}/40 words
        </span>

        <button
          disabled={words === 0 || words > 40}
          className="rounded-lg bg-black text-white px-4 py-1.5 disabled:opacity-40 hover:bg-zinc-800 transition"
        >
          Post
        </button>
      </div>
    </form>
  )
}
