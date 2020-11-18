import React from 'react';
import {
    Button,
    Select,
    BSTheme
} from 'bs-ui-components';
import { Link } from 'react-router-dom';

import Star from '../../components/Star/Star'
import Image from '../../assets/jpg/Image.jpg'

import './RestaurantList.css'

const RestaurantList = ({
    history,
    ...props
}) => {

    const [restaurants, setRestaurants] = React.useState([112,2,1233,4,53123,6,7,8])

    const handleNavigateRestaurantDetail = (restaurant) => () => {
        history.push(`/restaurants/${restaurant}`)
    }

    return (
        <React.Fragment>
            <div>
                <div className="px-16 py-6">
                    <h1 className="text-4xl">Restaurants</h1>
                    <h4 className="text-gray-600">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam lobortis enim quis maximus consequat. Donec ut nunc sit amet nulla sollicitudin porta. Suspendisse id arcu et nunc rutrum dapibus et eget velit. Quisque commodo erat a dolor ornare pulvinar. Aliquam pellentesque semper vestibulum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed id arcu mi. Donec at consectetur urna, eget venenatis ligula. Nullam malesuada rutrum nulla, at fermentum quam cursus a.
                    </h4>
                </div>
                <div className="px-16 py-4 flex justify-between border-t border-b border-gray-400">
                    <div className="flex">
                        <span>Filter By:</span>
                        <Select
                            className="mx-2"
                            value={'a'}
                            onChange={(e) => setValue(e.target.value)}
                            options={[{
                                label: 'A',
                                value: 'a',
                            }, {
                                label: 'B',
                                value: 'b',
                            }]}
                        />
                        <Select
                            className="mx-2"
                            value={'a'}
                            onChange={(e) => setValue(e.target.value)}
                            options={[{
                                label: 'A',
                                value: 'a',
                            }, {
                                label: 'B',
                                value: 'b',
                            }]}
                        />
                        <Select
                            className="mx-2"
                            value={'a'}
                            onChange={(e) => setValue(e.target.value)}
                            options={[{
                                label: 'A',
                                value: 'a',
                            }, {
                                label: 'B',
                                value: 'b',
                            }]}
                        />
                    </div>
                    <Button>Clear All</Button>
                </div>
            </div>
            
            <div className="px-16 py-6 overflow-auto">
                <h4 className="text-2xl">
                    All Restaurants
                </h4>
                {restaurants && restaurants.length > 0 && restaurants.map(restaurant => (
                    <div className="w-1/5 float-left p-4">
                        <img src={Image} />
                        <div style={{height: 130}}>
                            <h6 className="text-md mt-2">
                                {restaurant}
                            </h6>
                            <Star className="mt-2" rank={restaurant} />
                            <div className="flex justify-between mt-2">
                                <span className="text-xs text-gray-600">
                                    Thai - $$$$
                                </span>
                                <div className="text-xs text-gray-600">
                                    laksşdkaşsd
                                </div>
                            </div>
                        </div>
                        <Link to={`/restaurants/${restaurant}`}>
                            <Button
                                className="w-full"
                                theme={BSTheme.SECONDARY}
                            >
                                Learn More
                            </Button>
                        </Link>
                        
                    </div>
                ))}
                <div className="w-full flex justify-center py-8">
                    <Button theme={BSTheme.ALTERNATIVE}>
                        Load More
                    </Button>
                </div>
                
            </div>
        </React.Fragment>
    )
}

export default RestaurantList;