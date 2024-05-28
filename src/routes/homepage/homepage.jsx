// import React from 'react'
import "./homepage.scss"
import SearchBar from "../../components/serachbar/searchbar"

export default function HomePage() {
  return (
    <div className="homePage">
        <div className="textContainer">
            <div className="wrapper">
                <h1 className="title">Find Real Estate and Get Your Dream Place</h1>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis, doloribus a! Esse aspernatur, sunt delectus vero eos in amet voluptatibus, ipsum, debitis laborum nostrum alias est tenetur quibusdam architecto unde.</p>
                <SearchBar/>
                <div className="boxes">
                    <div className="box">
                        <h1>16+</h1>
                        <h2>Years of experience</h2>
                    </div>
                    <div className="box">
                        <h1>200</h1>
                        <h2>Award Gained</h2>
                    </div>
                    <div className="box">
                        <h1>2000+</h1>
                        <h2>Property Ready</h2>
                    </div>
                </div>
            </div>
        </div>
        <div className="imgContainer">
            <img src="/bg.png" alt="" />
        </div>
    </div>
  )
}
