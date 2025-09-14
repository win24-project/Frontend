
const Layout = ({ children }) => {
  return (
    <div className="layout">
      <header className="header">
        <div className="container">
          <h1 className="logo">Core Gym Club</h1>
            <nav className="nav">
              <a href="/">Home</a>
              <a href="/contact">Contact</a>
            </nav>
        </div>
      </header>

      <main className="main">
        {children}
      </main>

      <footer className="footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Core Gym Club. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Layout