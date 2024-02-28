import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Header from './Pages/Header/Header';
import Intro from './Pages/Intro/Intro';
import Quiz from './Pages/Quiz/Quiz';
import Result from './Pages/Result/Result';

function App() {
  
  // 
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });

  document.onkeydown = (e) => {
    if (e.keyCode === 123) {
      return false;
    } else if (e.ctrlKey && e.shiftKey && e.keyCode === 'I'.charCodeAt(0)) {
      return false
    } else if (e.ctrlKey && e.shiftKey && e.keyCode === 'C'.charCodeAt(0)) {
      return false
    } else if (e.ctrlKey && e.shiftKey && e.keyCode === 'J'.charCodeAt(0)) {
      return false
    } else if (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0)) {
      return false
    }
  };
  //

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Intro />} />
        <Route path='/quiz' element={<Quiz />} />
        <Route path='/result' element={<Result />} />
      </Routes>
    </div>
  );
}

export default App;