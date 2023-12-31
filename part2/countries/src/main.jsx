import ReactDOM from 'react-dom/client'

import App from './App'


const api_key = import.meta.env.WEATHER_KEY

ReactDOM.createRoot(document.getElementById('root')).render(<App />)