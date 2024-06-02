import { useState } from "react";
import "./newpostpage.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import apiRequest from "../../lib/api_request";
import { useNavigate } from "react-router-dom";

function NewPostPage() {
   const [value, setValue] =useState()
   const [error, setError] = useState("")
   const navigate = useNavigate()

   const handleSubmit = async(e)=>{
    e.preventDefault()
    const formData = new FormData(e.target)
    const inputs = Object.fromEntries(formData)
    try {
      const res = await apiRequest.post("/posts",{
        postData :{
          title : inputs.title,
          price : parseInt(inputs.price),
          address : inputs.address,
          city : inputs.city,
          bedroom : parseInt(inputs.bedroom),
          bathroom :parseInt(inputs.bathroom),
          type : inputs.type,
          property : inputs.property,
          latitude : inputs.latitude,
          longitude :inputs.longitude,
          images : [
            "https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "https://images.pexels.com/photos/1428348/pexels-photo-1428348.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "https://images.pexels.com/photos/2467285/pexels-photo-2467285.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          ]
        },
        postDetail :{
          description : value,
          utilities : inputs.utilities,
          pet : inputs.pet,
          income : inputs.income,
          size : parseInt(inputs.size),
          school : parseInt(inputs.school),
          bus : parseInt (inputs.bus),
          restaurant : parseInt(inputs.restaurant)

        }
      })

      navigate("/"+res.data.data.id)
    } catch (error) {
      console.log(error.response.data.message)
      setError(error.response.data.message)
    }
   }
  return (
    <div className="newPostPage">
      <div className="formContainer">
        <h1>Add New Post</h1>
        <div className="wrapper">
          <form onSubmit={handleSubmit}> 
            <div className="item">
              <label htmlFor="title">Title</label>
              <input id="title" name="title" type="text" required/>
            </div>
            <div className="item">
              <label htmlFor="price">Price</label>
              <input id="price" name="price" type="number" required/>
            </div>
            <div className="item">
              <label htmlFor="address">Address</label>
              <input id="address" name="address" type="text" required/>
            </div>
            <div className="item description">
              <label htmlFor="description">Description</label>
              <ReactQuill theme="snow" onChange={setValue} value={value} ></ReactQuill>
            </div>
            <div className="item">
              <label htmlFor="city">City</label>
              <input id="city" name="city" type="text" required/>
            </div>
            <div className="item">
              <label htmlFor="bedroom">Bedroom Number</label>
              <input min={1} id="bedroom" name="bedroom" type="number"required />
            </div>
            <div className="item">
              <label htmlFor="bathroom">Bathroom Number</label>
              <input min={1} id="bathroom" name="bathroom" type="number" required/>
            </div>
            <div className="item">
              <label htmlFor="latitude">Latitude</label>
              <input id="latitude" name="latitude" type="text" required/>
            </div>
            <div className="item">
              <label htmlFor="longitude">Longitude</label>
              <input id="longitude" name="longitude" type="text" required/>
            </div>
            <div className="item">
              <label htmlFor="type">Type</label>
              <select name="type" required>
                <option value="rent" defaultChecked>
                  Rent
                </option>
                <option value="buy">Buy</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="type">Property</label>
              <select name="property" required>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="condo">Condo</option>
                <option value="land">Land</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="utilities">Utilities Policy</label>
              <select name="utilities" required>
                <option value="owner">Owner is responsible</option>
                <option value="tenant">Tenant is responsible</option>
                <option value="shared">Shared</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="pet">Pet Policy</label>
              <select name="pet" required>
                <option value="allowed">Allowed</option>
                <option value="not-allowed">Not Allowed</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="income">Income Policy</label>
              <input
                id="income"
                name="income"
                type="text"
                placeholder="Income Policy"
                required
              />
            </div>
            <div className="item">
              <label htmlFor="size">Total Size (sqft)</label>
              <input min={0} id="size" name="size" type="number" required/>
            </div>
            <div className="item">
              <label htmlFor="school">School</label>
              <input min={0} id="school" name="school" type="number" required/>
            </div>
            <div className="item">
              <label htmlFor="bus">bus</label>
              <input min={0} id="bus" name="bus" type="number" required/>
            </div>
            <div className="item">
              <label htmlFor="restaurant">Restaurant</label>
              <input min={0} id="restaurant" name="restaurant" type="number" required/>
            </div>
            <button className="sendButton">Add</button>
            {error && <span>{error}</span>}
          </form>
        </div>
      </div>
      <div className="sideContainer"></div>
    </div>
  );
}

export default NewPostPage;
