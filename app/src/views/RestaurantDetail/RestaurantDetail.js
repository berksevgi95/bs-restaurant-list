import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import L from 'leaflet';

import Star from '../../components/Star/Star'
import Gears from '../../assets/svg/Gears.svg'
import Image from '../../assets/jpg/Image.jpg'
import ErrorIcon from '../../assets/png/Error.png'
import Axios from '../../utils/axios';

import 'leaflet/dist/leaflet.css'
import './RestaurantDetail.css'

const RestaurantDetail = ({
    history,
    match,
    ...props
}) => {

    const [restaurant, setRestaurant] = React.useState(null)
    const [reviews, setReviews] = React.useState([])
    const [errorOccured, setErrorOccured] = React.useState(null)

    React.useEffect(() => {
        Axios.get(`/businesses/${match.params.id}`)
            .then((result) => {
                Promise.resolve(
                    setRestaurant(result.data)
                ).then(() => {
                    const map = L.map('map').setView([51.505, -0.09], 13)
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    }).addTo(map);
                    L.marker([result.data.coordinates.latitude, result.data.coordinates.longitude])
                        .addTo(map)
                        .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
                        .openPopup();
                })
            })
            .catch((error) => {
                setErrorOccured(error.message)
            })
        
        Axios.get(`/businesses/${match.params.id}/reviews`)
            .then((result) => {
                setReviews(result.data.reviews)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    return errorOccured ? (
        <div className="w-full h-full flex">
            <div className="m-auto ">
                <img
                    className="error-icon m-auto mb-8"
                    src={ErrorIcon}
                />
                <h2 className="text-3xl whitespace-no-wrap text-center">
                    {errorOccured}
                </h2>
                <div className="flex">
                    <Link
                        to="/restaurants"
                        className="text-gray-600 hover:underline text-center m-auto"
                    >
                        Go back                    
                    </Link>
                </div>
            </div>
        </div>
    ) : !restaurant ? (
        <div className="flex-1 flex">
            <img
                className="loading m-auto"
                src={Gears}
            />
        </div>
    ) : (
        <React.Fragment>
            <div>
                <div className="px-16 py-6">
                    <h1 className="text-4xl">
                        {restaurant.name}
                    </h1>
                    <Star 
                        className="mt-2"
                        rank={Math.floor(restaurant.rating)}
                    />
                    <div className="flex justify-between mt-4">
                        <span className="text-xs text-gray-600">
                            {restaurant.categories[0].title} - {restaurant.price}
                        </span>
                        <div className="text-xs text-gray-600">
                            {restaurant.is_closed ?
                                <span className="text-red-500">Close</span> :
                                <span className="text-green-500">Open</span>
                            }
                        </div>
                    </div>
                </div>
                <div className="px-16 py-8 flex justify-between border-t border-b border-gray-400 overflow-auto">
                    <div className="map-container">
                        <div
                            id="map"
                            className="mr-8 height-250"
                        >
                        </div>
                        <span className="text-sm text-gray-600">
                            {restaurant.location.display_address.join(' ')}
                        </span>
                    </div>
                    
                    {restaurant.photos && 
                        restaurant.photos.length > 1 &&
                        restaurant.photos.map((photo, index) => (
                            <img
                                key={`${photo}-${index}`}
                                className="mr-8 height-250"
                                src={photo}
                            />
                        ))}
                </div>
            </div>
            
            <div className="px-16 py-6 overflow-auto">
                <h4 className="text-xl text-gray-600">
                    {restaurant.review_count || 0} Reviews
                </h4>
                <ul>
                    {reviews && reviews.length > 0 && reviews.map(review => (
                        <li key={review.id} className="flex flex-col sm:flex-row py-8">
                            <div className="w-full sm:w-1/4 flex">
                                <img 
                                    className="height-50"
                                    src={review.user.image_url || Image}
                                />
                                <div className="pl-4">
                                    <b>
                                        {review.user.name}
                                    </b>
                                    <p className="text-gray-600">
                                        {review.time_created}
                                    </p>
                                </div>
                            </div>
                            <div className="w-full sm:w-3/4">
                                <Star
                                    className="my-4 sm:mb-4"
                                    rank={Math.floor(restaurant.rating)}
                                />
                                <p>
                                    {review.text}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </React.Fragment>
    )
}

export default withRouter(RestaurantDetail);