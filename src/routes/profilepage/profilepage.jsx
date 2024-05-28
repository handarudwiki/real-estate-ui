import React from 'react'
import "./profilepage.scss"
import List from '../../components/list/List'
import Chat from '../../components/chat/chat'

export default function profilepage() {
  return (
    <div className="profilePage">
        <div className="details">
            <div className="wrapper">
                <div className="title">
                    <h1>User Information</h1>
                    <button>Update Profile</button>
                </div>
                <div className="info">
                    <span>
                        Avatar : <img src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
                    </span>
                    <span>
                        Username : <b>Handaru</b>
                    </span>
                    <span>
                        E-mail : <b>Handaru@gmail.com</b>
                    </span>
                </div>
                <div className="title">
                    <h1>My Lisr</h1>
                    <button>Create New Post</button>
                </div>
                <List/>
                <div className="title">
                    <h1>Saved List</h1>
                </div>
                <List/>
            </div>
        </div>
        <div className="chatContainer">
            <div className="wrapper">
                <Chat/>
            </div>
        </div>
    </div>
  )
}
