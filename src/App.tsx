import { Link, Outlet } from "react-router-dom";

function App() {
  return (
    <div className="easy-tool">
      <nav className="flex justify-center">
        <Link to="/" className="mx-1">
          OCR
        </Link>
        <Link to="/media_device" className="mx-1">
          MediaDevice
        </Link>
        <Link to="/webview" className="mx-1">
          WebView
        </Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
