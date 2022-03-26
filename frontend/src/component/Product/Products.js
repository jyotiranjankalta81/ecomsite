import React, { Fragment, useEffect, useState } from 'react'
import "./Products.css"
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux"
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import Product from '../Home/Product';
import Typography from "@material-ui/core"
import Slider from "@material-ui/core"
import Pagination from "react-js-pagination"


const categories = [
    "laptop",
    "Footware",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
]

const Products = () => {

    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([0, 25000])
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState(0)
    const { keyword } = useParams();
    const { products, loading, error, productsCount, resultPerPage, filteredProductsCount } = useSelector((state) => state.products);
    const setCurrentPageNo = (e) => {
        setCurrentPage(e)

    }
    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    };
    useEffect(() => {
        dispatch(getProduct(keyword, resultPerPage, price, category));
    }, [dispatch, keyword, currentPage, price, category]);

    let count = filteredProductsCount;
    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <h2 className='productsHeading'>
                        Products
                    </h2>
                    <div className='products'>
                        {products &&
                            products.map((product) => (
                                <Product key={product._id} product={product} />
                            ))
                        }

                    </div>
                    <div className='filterBox'>
                        <Typography>
                            Price
                        </Typography>
                        <Slider
                            value={price}
                            onChange={priceHandler}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                            min={0}
                            max={25000}
                        />


                    </div>
                    <Typography>
                        Categories
                    </Typography>
                    <ul className='categoryBox'>
                        {categories.map((category) => (
                            <li className='category-link'
                                key={category}
                                onClick={() => setCategory(category)}
                            >{category}
                            </li>
                        ))}

                    </ul>
                    <fieldset>
                        <Typography component="legend">
                            Ratings Above
                        </Typography>
                        <Slider
                            value={ratings}
                            onChange={(e, newRating) => {
                                setRating(newRating);
                            }}
                            aria-labelledby="continuous-slider"
                            min={0}
                            max={5}
                        />
                    </fieldset>
                    {resultPerPage < count && (
                        <div className="paginationBox">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resultPerPage}
                                totalItemsCount={productsCount}
                                onChange={setCurrentPageNo}
                                nextPageText="Next"
                                prevPageText="Prev"
                                firstPageText="1st"
                                lastPageText="Last"
                                itemClass="page-item"
                                linkClass="page-link"
                                activeClass="pageItemActive"
                                activeLinkClass="pageLinkActive"
                            />

                        </div>)}

                </Fragment>)}
        </Fragment>


    )
}

export default Products