import { listData } from "../../lib/dummydata";
import "./listpage.scss";
import Filter from "../../components/filter/filter";
import Card from "../../components/card/card";
import Map from "../../components/map/Map";
import { Await, useLoaderData } from "react-router-dom";
import { Suspense } from "react";

function ListPage() {
  const data = useLoaderData(); // Corrected here: useLoaderData should be called as a function

  return (
    <div className="listPage">
      <div className="listContainer">
        <div className="wrapper">
          <Suspense fallback={<p>Loading ...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) => (
                postResponse.data.data.map(post => (
                  <Card item={post} key={post.id} />
                ))
              )}
            </Await>
          </Suspense>
        </div>
      </div>
      <div className="mapContainer">
        <Suspense fallback={<p>Loading...</p>}>
          <Await
            resolve={data.postResponse}
            errorElement={<p>Error loading posts!</p>}
          >
            {(postResponse) => <Map items={postResponse.data.data} />}
          </Await>
        </Suspense>
      </div>
    </div>
  );
}

export default ListPage;
