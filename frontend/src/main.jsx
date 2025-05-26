import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import './index.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {App} from './App.jsx'

createRoot(document.getElementById('root')).render(
    <App />
)
