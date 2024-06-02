import React, { createContext, useContext, useState } from 'react'
import "./profileupdatepage.scss"
import { AuthContext } from '../../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import apiRequest from '../../lib/api_request'
export default function ProfileUpdatePage ()  {
    const {currentUser, updateUser} = useContext(AuthContext)
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async(e)=>{
        e.preventDefault()
        const formData = new FormData(e.target)

        const {username, email, password} = Object.fromEntries(formData.entries())

        try {
            const res = await apiRequest.put("/users",{
                username,
                password,
                email
            })

            updateUser(res.data.data)

            navigate("/profile",{state:{
                messaage : "update profiel successfully"
            }})
        } catch (error) {
            setError(error.response.data.messaage)
        }
    }
  return (
    <div className="profileUpdatePage">
        <div className="formContainer">
            <form onSubmit={handleSubmit}>
            <div className="item">
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" placeholder='input username' required defaultValue={currentUser.username}/>
            </div>
            <div className="item">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" placeholder='input email'required defaultValue={currentUser.email}/>
            </div>
            <div className="item">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" placeholder='input password'/>
            </div>
            <button >update</button>
            {error && <span>{error}</span>}
            </form>
        </div>
        <div className="sideContainer">
        <img src="" alt="" className="avatar" />
        </div>
    </div>
  )
}
