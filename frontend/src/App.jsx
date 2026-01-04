import { Routes, Route, Link } from "react-router-dom"
import Home from "./Home"
import Login from "./Login"
import Signup from "./Signup"

export default function App() {
  const token = localStorage.getItem("token")

  return (
    <div className="min-h-screen bg-zinc-100">
      {/* NAV */}
      <nav className="bg-white border-b">
        <div className="max-w-2xl mx-auto px-4 py-3 flex justify-between">
          <Link to="/" className="font-semibold">social-media</Link>

          <div className="space-x-4 text-sm">
            {!token && (
              <>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
              </>
            )}
            {token && (
              <button
                onClick={() => {
                  localStorage.removeItem("token")
                  location.reload()
                }}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  )
}
