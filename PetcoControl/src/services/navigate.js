import { useNavigate } from 'react-router-dom'
const navigate = (url)=>{
    var ira=useNavigate()
    return ira(url)
}

export {navigate}