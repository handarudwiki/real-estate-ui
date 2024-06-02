import "./singlepage.scss";
import Slider from "../../components/slider/Slider";
import Map from "../../components/map/Map";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { userData } from "../../lib/dummydata";
import DOMPurify from "dompurify";
import apiRequest from "../../lib/api_request";

function SinglePage() {
  const post = useLoaderData();
  const { currentUser } = useContext(AuthContext);
  const [saved, setSaved] = useState(post.isSaved)
  const navigate = useNavigate()

  const handleSave = async()=>{
    if(!currentUser){
      navigate("/login")
    }

    try {
      setSaved((prev)=>!prev)
      await apiRequest.post("/users/save",{
        postId : post.id,
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={post.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.title}</h1>
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{post.address}</span>
                </div>
                <div className="price">$ {post.price}</div>
              </div>
              <div className="user">
                <img src={userData.img} alt="" />
                <span>{currentUser.name}</span>
              </div>
            </div>
            <div
              className="bottom"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.postDetail.desc),
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
              <img src="/utility.png" alt="" />
              <div className="featureText">
                <span>Utilities</span>
                <p>
                  {post.postDetail.utilities === "owner" ? (
                    <p>Owner is responsible</p>
                  ) : (
                    <p>Tenant is responsible</p>
                  )}
                </p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Pet Policy</span>
                <p>{post.postDetail.allowed}</p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Property Fees</span>
                <p>Must have 3x the rent in total household income</p>
              </div>
            </div>
          </div>
          <p className="title">Sizes</p>
          <div className="sizes">
            <div className="size">
              <img src="/size.png" alt="" />
              <span>{post.postDetail.size}</span>
            </div>
            <div className="size">
              <img src="/bed.png" alt="" />
              <span>{post.bedroom}</span>
            </div>
            <div className="size">
              <img src="/bath.png" alt="" />
              <span>{post.bathroom}</span>
            </div>
          </div>
          <p className="title">Nearby Places</p>
          <div className="listHorizontal">
            <div className="feature">
              <img src="/school.png" alt="" />
              <div className="featureText">
                <span>School</span>
                <p>
                  {post.postDetail.school > 1000
                    ? post.postDetail.school / 100 + "km"
                    : post.postDetail.school + "m "}{" "}
                  away
                </p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Bus Stop</span>
                <p>{post.postDetail.bus}m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Restaurant</span>
                <p>{post.postDetail.restaurant}m away</p>
              </div>
            </div>
          </div>
          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[post]} />
          </div>
          <div className="buttons">
            <button>
              <img src="/chat.png" alt="" />
              Send a Message
            </button>
            <button onClick={handleSave}
              style={{ 
                backgroundColor : saved ?  "#fece51": "white" 
               }}
            >
              <img src="/save.png" alt="" />
              {saved ? "place saved" : "save place"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePage;
