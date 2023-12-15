import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ChatPage from './components/ChatPage';
import { io } from 'socket.io-client';
import Signup from './components/Signup';
import { Oval } from 'react-loader-spinner';
import { useSelector } from 'react-redux';

function App() {
  const loading = useSelector((state) => state.loading);
  return (
    <BrowserRouter>
      <div>
        {loading && (
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '45%',
            }}
          >
            <Oval
              height={100}
              width={100}
              color="#4fa94d"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="#4fa94d"
              strokeWidth={6}
              strokeWidthSecondary={6}
            />
          </div>
        )}

        <div>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/chat" element={<ChatPage />}></Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
