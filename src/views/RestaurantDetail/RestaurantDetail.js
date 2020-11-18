import React from 'react';
import {
    Button,
    Select,
    BSTheme
} from 'bs-ui-components';
import { withRouter } from 'react-router-dom';
import L from 'leaflet';

import Star from '../../components/Star/Star'
import Image from '../../assets/jpg/Image.jpg'

import 'leaflet/dist/leaflet.css'
import './RestaurantDetail.css'

const RestaurantDetail = ({
    history,
    ...props
}) => {

    const [reviews, setReviews] = React.useState([112,2,1233,4,53123,6,7,8])

    React.useEffect(() => {
        const map = L.map('map').setView([51.505, -0.09], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([51.5, -0.09]).addTo(map)
            .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
            .openPopup();
    }, [])

    return (
        <React.Fragment>
            <div>
                <div className="px-16 py-6">
                    <h1 className="text-4xl">Restaurant 3</h1>
                    <Star className="mt-2" rank={3} />
                    <div className="flex justify-between mt-4">
                        <span className="text-xs text-gray-600">
                            Thai - $$$$
                        </span>
                        <div className="text-xs text-gray-600">
                            laksşdkaşsd
                        </div>
                    </div>
                </div>
                <div className="px-16 py-8 flex justify-between border-t border-b border-gray-400">
                    <div id="map" style={{
                        height: 250,
                    }} className="w-1/2">

                    </div>
                </div>
            </div>
            
            <div className="px-16 py-6 overflow-auto">
                <h4 className="text-xl text-gray-600">
                    321 Reviews
                </h4>
                <ul>
                    {reviews && reviews.length > 0 && reviews.map(review => (
                        <li className="flex py-8">
                            <div className="w-1/4 flex">
                                <img style={{
                                    height: 50
                                }} src={Image}>

                                </img>
                                <div className="pl-4">
                                    <b>asdasd</b>
                                    <p className="text-gray-600">alaşksdşlak</p>
                                </div>
                            </div>
                            <div className="w-3/4">
                                <Star className="mb-4" rank={3} />
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam lobortis enim quis maximus consequat. Donec ut nunc sit amet nulla sollicitudin porta. Suspendisse id arcu et nunc rutrum dapibus et eget velit. Quisque commodo erat a dolor ornare pulvinar. Aliquam pellentesque semper vestibulum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed id arcu mi. Donec at consectetur urna, eget venenatis ligula. Nullam malesuada rutrum nulla, at fermentum quam cursus a.
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