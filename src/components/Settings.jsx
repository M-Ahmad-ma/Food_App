import React, { useState, useEffect } from 'react';
import SideNav from './common/SideNav';
import Header from './common/Header';

const Settings = ({ dishes, addDish }) => {
    const [newDish, setNewDish] = useState({ name: '', price: '', bowls: '', image: '', category: '' });
    const [showForm, setShowForm] = useState(false);
    const [editDish, setEditDish] = useState(null); // Track the dish being edited
    const [activeCategory, setActiveCategory] = useState('Hot dishes');
    const [dishesList, setDishesList] = useState(dishes);

    useEffect(() => {
        const savedDishes = JSON.parse(localStorage.getItem('dishes')) || [];
        setDishesList(savedDishes);
    }, []);

    const dishesType = [
        { id: 1, name: 'hot dishes', active: true },
        { id: 2, name: 'cold dishes', active: false },
        { id: 3, name: 'soup', active: false },
        { id: 4, name: 'grill', active: false },
        { id: 5, name: 'appetizer', active: false },
        { id: 5, name: 'dessert', active: false },

    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewDish((prevDish) => ({ ...prevDish, [name]: value }));
    };

    const handleAddDish = () => {
        if (newDish.name && newDish.price && newDish.bowls && newDish.image && newDish.category) {
            const existingDishes = JSON.parse(localStorage.getItem('dishes')) || [];
            const updatedDishes = editDish
                ? existingDishes.map((dish) =>
                      dish.id === editDish.id ? { ...newDish, id: dish.id } : dish
                  )
                : [...existingDishes, { ...newDish, id: Date.now() }];

            localStorage.setItem('dishes', JSON.stringify(updatedDishes));
            setDishesList(updatedDishes);
            addDish(newDish);
            setNewDish({ name: '', price: '', bowls: '', image: '', category: '' });
            setShowForm(false);
            setEditDish(null);
        } else {
            alert('Please fill out all fields');
        }
    };

    const handleEditDish = (dish) => {
        setNewDish(dish);
        setEditDish(dish);
        setShowForm(true);
    };

    const handleCategoryChange = (name) => {
        setActiveCategory(name);
    };

    return (
        <div className="flex lg:gap-9 w-full min-h-screen">
            <SideNav />
            <main className="flex gap-9 w-full">
                <div className="w-full">
                    <div className="py-5">
                        <Header name="Settings" setinput="false" />
                    </div>
                    <div className="flex w-[98%] flex-col lg:flex-row gap-10">  
                        {/* Sidebar */}
                        <div className="lg:min-h-[88vh] lg:w-[30%] flex-shrink-0 overflow-x-auto  rounded-lg bg-dark-bg-2 flex flex-row lg:flex-col items-start gap-2 pt-10">
                            {/* Sidebar Items */}
                            <div className='py-5 w-full lg:pl-16 px-10 bg-primary bg-opacity-15 border-b-4 border-primary  lg:border-r-4 lg:border-primary'>
                                <img src="" alt="" />
                                <div>
                                    <p className='font-semibold text-primary'>Product Management</p>
                                    <p className='text-light-text'>Manage your product pricing etc</p>
                                </div>
                            </div>
                            <div className='py-5  w-full pl-16'>
                                <img src="" alt="" />
                                <div>
                                    <p className='font-semibold text-white'>Appearance</p>
                                    <p className='text-light-text'>Light and dark mode and fontsize</p>
                                </div>
                            </div>
                            <div className='py-5  w-full pl-16'>
                                <img src="" alt="" />
                                <div>
                                    <p className='font-semibold text-white'>Your Restaurant</p>
                                    <p className='text-light-text'>Light and dark mode and fontsize</p>
                                </div>
                            </div>
                            
                            <div className='py-5  w-full pl-16'>
                                <img src="" alt="" />
                                <div>
                                    <p className='font-semibold text-white'>Notifications</p>
                                    <p className='text-light-text'>Customize your notifications</p>
                                </div>
                            </div>
                            <div className='py-5 w-full pl-16'>
                                <img src="" alt="" />
                                <div>
                                    <p className='font-semibold text-white'>Security</p>
                                    <p className='text-light-text'>Configure passwords etc</p>
                                </div>
                            </div>
                            <div className='py-5  w-full pl-16'>
                                <img src="" alt="" />
                                <div>
                                    <p className='font-semibold text-white'>About Us</p>
                                    <p className='text-light-text'>Find more about us</p>
                                </div>
                            </div>
                           
                        </div>

                        {/* Product Management */}
                        <div className="lg:w-[80%] min-h-[88vh] bg-dark-bg-2 rounded-lg">
                            <div className="w-full py-5 flex items-center justify-between px-6">
                                <h2 className="text-xl text-white">Product Management</h2>
                                <button className="border-2 border-dark-border rounded-lg p-3 text-white">
                                    Manage Categories
                                </button>
                            </div>
                            <div className="flex items-center gap-16 ml-6 border-b-2 overflow-x-auto no-scrollbar border-dark-border py-3">
                                {dishesType.map((type) => (
                                    <span
                                        key={type.id}
                                        onClick={() => handleCategoryChange(type.name)}
                                        className={`hover:text-primary cursor-pointer ${activeCategory === type.name ? 'border-b-2 border-primary text-primary' : 'text-white'}`}
                                    >
                                        {type.name}
                                    </span>
                                ))}
                            </div>

                            {/* Dish Cards */}
                            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-y-3 place-items-center py-5 px-4 overflow-y-auto no-scrollbar h-[59vh]">
                                <div
                                    className="w-[95%] h-[22rem] border-2 border-dashed rounded-xl cursor-pointer border-primary flex flex-col items-center justify-center"
                                    onClick={() => setShowForm(true)}
                                >
                                    <button className="text-8xl font-thin text-primary">+</button>
                                    <p className="text-lg text-primary">Add new Dish</p>
                                </div>
                                {dishesList
                                    .filter((dish) => (dish.category || '').toLowerCase().includes(activeCategory.toLowerCase()))
                                    .map((dish) => (
                                        <div
                                            key={dish.id} 
                                            className="relative overflow-hidden w-[95%] pt-10 rounded-xl h-[23rem] border-2 border-dark-border flex flex-col items-center text-center justify-start gap-5"
                                        >
                                            <img src={dish.image} alt={dish.name} className="w-1/2 rounded-3xl" />
                                            <div className="items-center">
                                                <p className="text-2xl text-white">{dish.name}</p>
                                                <div className="flex items-center gap-3 flex-row justify-center text-light-text text-center">
                                                    <p>${dish.price}</p>
                                                    <p>{dish.bowls} servings</p>
                                                </div>
                                            </div>
                                            <div className="cursor-pointer bg-primary bg-opacity-10 w-full absolute bottom-0 py-3 flex items-center justify-center">
                                                <button
                                                    onClick={() => handleEditDish(dish)}
                                                    className="text-primary text-xl font-normal"
                                                >
                                                    Edit Dish
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                            </div>

                            {/* Add/Edit Dish Form */}
                            {showForm && (
                                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                    <div className="bg-dark-bg p-6 rounded-lg lg:w-[30%]">
                                        <h3 className="text-xl text-white mb-4 text-center">
                                            {editDish ? 'Edit Dish' : 'Add New Dish'}
                                        </h3>
                                        <div className="flex flex-col gap-3">
                                            <input
                                                type="text"
                                                name="name"
                                                value={newDish.name}
                                                placeholder="Dish Name"
                                                onChange={handleInputChange}
                                                className="p-2 rounded bg-dark-bg border border-light-text text-white"
                                            />
                                            <input
                                                type="number"
                                                name="price"
                                                value={newDish.price}
                                                placeholder="Price"
                                                onChange={handleInputChange}
                                                className="p-2 rounded bg-dark-bg border border-light-text text-white"
                                            />
                                            <input
                                                type="number"
                                                name="bowls"
                                                value={newDish.bowls}
                                                placeholder="Bowls Available"
                                                onChange={handleInputChange}
                                                className="p-2 rounded bg-dark-bg border border-light-text text-white"
                                            />
                                            <input
                                                type="text"
                                                name="image"
                                                value={newDish.image}
                                                placeholder="Image URL"
                                                onChange={handleInputChange}
                                                className="p-2 rounded bg-dark-bg border border-light-text text-white"
                                            />
                                            <input
                                                type="text"
                                                name="category"
                                                value={newDish.category}
                                                placeholder="Category (e.g. Hot dishes)"
                                                onChange={handleInputChange}
                                                className="p-2 rounded bg-dark-bg border border-light-text text-white"
                                            />
                                            <div className="flex gap-3 mt-4">
                                                <button
                                                    onClick={() => {
                                                        setShowForm(false);
                                                        setEditDish(null);
                                                    }}
                                                    className="w-1/2 text-primary border-2 border-primary p-2 rounded"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    onClick={handleAddDish}
                                                    className="w-1/2 text-white bg-primary p-2 rounded"
                                                >
                                                    {editDish ? 'Save Changes' : 'Add Dish'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Settings;
