import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.js'
import Footer from '../components/Footer.js'
import Card from '../components/Card.js'

const Home = () => {
    const [search, setSearch] = useState("");
    const [coffeeCategory, setCoffeeCategory] = useState([]);
    const [coffeeItems, setCoffeeItems] = useState([]);
    const loadData = async () => {
        let response = await fetch("http://localhost:5000/api/coffeedata", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        })    
        response = await response.json();
        setCoffeeItems(response[0]);
        setCoffeeCategory(response[1]);

        //console.log(response[0], response[1]);
    }

    useEffect(() => {
        loadData();
    }, [])

    return (
        <>
            <div><Navbar /></div>
            <div>
            <div id="carouselExampleCaptions" className="carousel slide m-2" data-bs-theme="grey">
                <div className="carousel-inner">
                    <div style={{ height: "600px", border: "2px solid black", position: "relative", overflowY: 'hidden', objectFit: 'contain' }}>
                        <div className="carousel-item active">
                                <img src="https://w0.peakpx.com/wallpaper/122/280/HD-wallpaper-coffee-beans-cup-coffee-mill-morning-coffee.jpg" className="d-flex w-100" alt="NOT FOUND" />
                        </div>

                        <div className="carousel-item">
                                <img src="https://c1.peakpx.com/wallpaper/434/264/996/cheese-crackers-snack-food-wallpaper-preview.jpg" className="d-flex w-100" alt="NOT FOUND" />
                        </div>

                        <div className="carousel-item">
                                <img src="https://c1.peakpx.com/wallpaper/226/1007/741/office-work-desk-table-wallpaper-preview.jpg" className="d-flex w-100" alt="NOT FOUND" />
                        </div>
                    </div>
                    <nav className="navbar navbar-light bg-light">
                            <div className="form-inline" style={{ position: "absolute", bottom: "70px", right: "460px", zIndex: "10" }} >
                                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} style={{ width: "600px", height: "60px", borderRadius: "8px" }} />
                            <button className="btn btn-outline-success my-3" type="submit" style={{ marginLeft: "260px" }}>Search</button>
                        </div>
                    </nav>
                </div>

                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>

                </div>
            </div>
            <div className="container">
                {
                    coffeeCategory !== []
                        ? coffeeCategory.map((data) => {
                            return (<div className="row mb-3">
                                <div key={data._id} className="fs-3 m-3">
                                {data.CategoryName}
                                </div>
                                <hr />
                                {coffeeItems !== []
                                    ? coffeeItems.filter((item) => item.CategoryName === data.CategoryName && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                                        .map(filterItems => {
                                            return (
                                                <div key={filterItems._id} className="col-12 col-md-6 col-lg-3" >
                                                    <Card coffeeItems={filterItems} 
                                                        //coffeeName={filterItems.name}
                                                        options={filterItems.options[0]}
                                                        imgSrc={filterItems.img}
                                                        desc={filterItems.description}></Card>
                                                </div>
                                            )
                                        }
                            ): <div>No such Data found</div>}
                                </div>
                            )
                        })
                        : <div>Yes</div>
                }
            </div>
            <div><Footer/></div>
        </>
    )
};

export default Home;