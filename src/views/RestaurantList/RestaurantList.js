import React from 'react';
import {
    Button,
    Select,
    Message,
    EMessageTypes,
    BSTheme,
} from 'bs-ui-components';
import { Link } from 'react-router-dom';

import Axios from '../../utils/axios'
import Star from '../../components/Star/Star'
import Checkbox from '../../components/Checkbox/Checkbox'
import Image from '../../assets/jpg/Image.jpg'
import Gears from '../../assets/svg/gears.svg'

import './RestaurantList.css'

const RestaurantList = ({
    ...props
}) => {

    const messageRef = React.useRef();
    const [isLoading, setIsLoading] = React.useState(true);
    const [filterObj, setFilterObj] = React.useState({
        openNow: true,
        price: '',
        categories: 'all'
    })
    const [restaurants, setRestaurants] = React.useState([])
    const [categories, setCategories] = React.useState([{
        label: 'All',
        value: 'all'
    }])

    const handleFetchCategories = () => {
        setIsLoading(true)
        Axios.get(`/categories`)
            .then(result => {
                setCategories([...categories, ...result.data.categories.map(category => ({
                    label: category.title,
                    value: category.alias
                }))])
            })
            .catch(() => {
                messageRef.current.fire({
                    type: EMessageTypes.ERROR,
                    timeout: 5000,
                    message: 'Error occured on categories',
                })
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const handleQuerying = (category) => {
        setIsLoading(true)
        Axios.get(`/businesses/search?location=Las%20Vegas&categories=${category}`)
            .then(result => {
                setRestaurants(result.data.businesses)
            })
            .catch(() => {
                messageRef.current.fire({
                    type: EMessageTypes.ERROR,
                    timeout: 5000,
                    message: 'Error occured on businesses',
                })
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const handleChangeFilter = (field) => (e) => {
        setFilterObj({
            ...filterObj,
            [field]: e.target.value
        })
    }

    const handleChangeCategory = (e) => {
        handleChangeFilter('categories')(e)
        handleQuerying(e.target.value)
    }

    const handleResetFilter = () => {
        setFilterObj({
            openNow: true,
            price: '',
            categories: 'all'
        })
        handleQuerying('all')
    }

    React.useEffect(() => {
        handleFetchCategories()
        handleQuerying(filterObj.categories)
    }, [])

    return (
        <React.Fragment>
            <div>
                <div className="px-16 py-6">
                    <h1 className="text-4xl">
                        Restaurants
                    </h1>
                    <h4 className="text-gray-600">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam lobortis enim quis maximus consequat. Donec ut nunc sit amet nulla sollicitudin porta. Suspendisse id arcu et nunc rutrum dapibus et eget velit. Quisque commodo erat a dolor ornare pulvinar. Aliquam pellentesque semper vestibulum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed id arcu mi. Donec at consectetur urna, eget venenatis ligula. Nullam malesuada rutrum nulla, at fermentum quam cursus a.
                    </h4>
                </div>
                <div className="px-16 py-4 flex justify-between border-t border-b border-gray-400">
                    <div className="flex items-center">
                        <span>Filter By:</span>
                        <Checkbox
                            checked={filterObj.openNow}
                            label="Open Now"
                            onClick={handleChangeFilter('openNow')}
                        />
                        <Select
                            className="mx-2 selectors"
                            value={filterObj.price}
                            onChange={handleChangeFilter('price')}
                            options={[{
                                label: 'All',
                                value: '',
                            }, {
                                label: '$',
                                value: '$',
                            }, {
                                label: '$$',
                                value: '$$',
                            }, {
                                label: '$$$',
                                value: '$$$',
                            }, {
                                label: '$$$$',
                                value: '$$$$'
                            }]}
                        />
                        <Select
                            className="mx-2 selectors"
                            value={filterObj.categories}
                            onChange={handleChangeCategory}
                            options={categories}
                        />
                    </div>
                    <Button onClick={handleResetFilter}>
                        Clear All
                    </Button>
                </div>
            </div>
            
            <div className={`px-16 py-6 overflow-auto h-full ${isLoading ? 'flex flex-col' : ''}`}>
                <h4 className="text-2xl">
                    All Restaurants
                </h4>
                {isLoading ?
                    <div className="flex-1 flex">
                        <img
                            className="loading m-auto"
                            src={Gears}
                        />
                    </div> : 
                    <ul className="restaurant-list">
                        {restaurants && 
                            restaurants.length > 0 ?
                            restaurants
                                .filter(restaurant => restaurant.is_closed === !filterObj.openNow)
                                .filter(restaurant => filterObj.price ? restaurant.price === filterObj.price : restaurant)
                                .map(restaurant => (
                                    <li key={restaurant.id} className="w-1/5 float-left p-4 restaurant">
                                        <div className="flex bg-gray-200">
                                            <img
                                                className="m-auto h-40"
                                                src={restaurant.image_url || Image}
                                            />
                                        </div>
                                        <div className="h-32">
                                            <h6 className="text-md mt-2">
                                                {restaurant.name}
                                            </h6>
                                            <Star className="mt-2" rank={Math.floor(restaurant.rating)} />
                                            <div className="flex justify-between mt-2">
                                                <span className="text-xs text-gray-600">
                                                    {restaurant.categories[0].title} - {restaurant.price || 'N/A'}
                                                </span>
                                                <div className="text-xs text-gray-600">
                                                    {restaurant.is_closed ?
                                                        <span className="text-red-500">Close</span> :
                                                        <span className="text-green-500">Open</span>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <Link to={`/restaurants/${restaurant.id}`}>
                                            <Button
                                                className="w-full"
                                                theme={BSTheme.SECONDARY}
                                            >
                                                Learn More
                                            </Button>
                                        </Link>
                                        
                                    </li>
                            )) : (
                            <li className="no-data flex">
                                <div className="m-auto">
                                    <div className="text-center text-6xl text-gray-400">:(</div>
                                    <div className="text-center text-gray-400">No data to display!</div>
                                </div>
                            </li>
                        )}
                    </ul>
                }
            </div>
            <Message
                ref={messageRef}
            />
        </React.Fragment>
    )
}

export default RestaurantList;