import { useState } from "react";
import { useNavigate } from "react-router";

function ResendEmailConfirmationButton() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const authUrl = "https://group-project-authservice-ebbpd0c8g2fabqdr.swedencentral-01.azurewebsites.net";
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    try {
      const res = await fetch(`${authUrl}/resend-email-confirmation?email=${email}`);
      if (!res.ok) {
        setError("Failed to resend email, please try again")
        return
      }
      setEmail("");
      navigate('/')
    } catch (err) {
      setError("error");
      console.log(err)
    }
  }
  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4">
      <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="you@example.com"
      />
      <button type="submit">
        Resend Email Confirmation
      </button>
      {error && <p>{error}</p>}
    </form>
  )
}

export default ResendEmailConfirmationButton