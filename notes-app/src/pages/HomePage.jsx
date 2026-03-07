import Navbar from './components/Navbar'
import DisplayNotes from './DisplayNotes'

const HomePage = () => {
  return (
    <div>
      <Navbar/>
      <div>
        <img src="xyz.jpg" alt="This is a demo image" />
        <p>All your notes in one place...</p>
      </div>
      <div>Let's get started!</div>
    </div>
  )
}

export default HomePage