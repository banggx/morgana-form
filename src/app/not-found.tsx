import '@/assets/style/notfound.css'

export default function NotFound() {
  
  return (<div className='bg-purple'>
      <div className="stars">
      <div className="custom-navbar">
        <div className="brand-logo">
          <img src="https://media.mxchensir.com/morgana-form/logo.svg" width="32px" />
          MORGana FORM
        </div>
        <div className="navbar-links">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/dashboard/list">Dashboard</a></li>
            <li><a href="https://github.com/banggx/morgana-form" target="_blank">Github</a></li>
            <li><a href="/" className="btn-request" target="_blank">Concat and Contribution</a></li>
          </ul>
        </div>
      </div>
      <div className="central-body">
        <img className="image-404" src="http://salehriaz.com/404Page/img/404.svg" width="300px" />
        <a href="/" className="btn-go-home">GO BACK HOME</a>
      </div>
      <div className="objects">
        <img className="object_rocket" src="http://salehriaz.com/404Page/img/rocket.svg" width="40px" />
        <div className="earth-moon">
          <img className="object_earth" src="http://salehriaz.com/404Page/img/earth.svg" width="100px" />
          <img className="object_moon" src="http://salehriaz.com/404Page/img/moon.svg" width="80px" />
        </div>
        <div className="box_astronaut">
          <img className="object_astronaut" src="http://salehriaz.com/404Page/img/astronaut.svg" width="140px" />
        </div>
      </div>
      <div className="glowing_stars">
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
      </div>
    </div>
  </div>)
}