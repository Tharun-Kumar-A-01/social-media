import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Signup() {
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const submit = async e => {
    e.preventDefault()
    setError("")

    const res = await fetch("http://localhost:5000/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: e.target.u.value,
        password: e.target.p.value
      })
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.msg)
      return
    }

    localStorage.setItem("token", data.token)
    navigate("/")
  }

  return (
    <div className="max-w-sm mx-auto mt-10 bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl mb-4">Sign up</h2>

      <form onSubmit={submit} className="space-y-3">
        <input name="u" placeholder="Username" className="w-full border p-2 rounded" />
        <input name="p" type="password" placeholder="Password" className="w-full border p-2 rounded" />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button className="w-full bg-zinc-700 text-white py-2 rounded">
          Create account
        </button>
      </form>
    </div>
  )
}
