import Homepage from './pages/Homepage.jsx'
import Aboutus from './pages/Aboutus.jsx'

function App() {
  const isAboutusPage = window.location.pathname.replace(/\/+$/, "").toLowerCase() === "/about-us";

  if (isAboutusPage) {
    return <Aboutus />;
  }

  return <Homepage />
}

export default App;
