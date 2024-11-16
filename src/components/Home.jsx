import React, { useState, useEffect } from "react";
import SideNav from "./common/SideNav";
import Header from "./common/Header";
import Cart from "../assets/Icon/cart.svg";
import deleteIcon from "../assets/Icon/Trash.svg";
import CloseIcon from "../assets/Content/close.png";
import card from '../assets/Icon/Card.svg'
import paypal from '../assets/Icon/Paypal.svg'
import Wallet from '../assets/Icon/Wallet.svg'
import { X } from 'lucide-react';

const Home = ({ dishes }) => {
  const [selectedPayment, setSelectedPayment] = useState("card");
  const [payment, setPayment] = useState(false);
  const [activeType, setActiveType] = useState("all");
  const [orderSection, setOrderSection] = useState(false); 
  const [orderItems, setOrderItems] = useState(() => {
    const savedOrders = localStorage.getItem("orderItems");
    return savedOrders ? JSON.parse(savedOrders) : [];
  });
  

  const dishType = [
    "all",
    "hot dishes",
    "cold dishes",
    "soup ",
    "grill",
    "appetizer",
    "dessert",
  ];
  const subtotal = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  useEffect(() => {
    localStorage.setItem("orderItems", JSON.stringify(orderItems));
  }, [orderItems]);

  const filterDishes = (dishes) =>
    activeType === "all"
      ? dishes
      : dishes.filter((dish) => dish.category === activeType);

  const togglePayment = () => setPayment((prev) => !prev);
  const toggleOrderSection = () => setOrderSection((prev) => !prev);

  const handleAddToOrder = (dish) => {
    setOrderItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === dish.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...dish, quantity: 1 }];
    });
    setOrderSection(true); 
  };

  const handleQuantityChange = (id, value) => {
    setOrderItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(parseInt(value, 10) || 1, 1) } : item
      )
    );
  };

  const handleDeleteOrderItem = (id) =>
    setOrderItems((prevItems) => prevItems.filter((item) => item.id !== id));

  return (
    <div className="flex min-h-screen"> 
      <SideNav />
      <main className="w-full lg:w-full min-h-screen mt-3">
        <div className="flex justify-between gap-2 w-full">
          <div className="w-[100%] lg:w-[60%] lg:mx-5">
            <Header name="Jaeger Rae" date="Tuesday, 12 FEB 2024" />
            <div className="flex justify-between px-3 gap-16 items-center text-white mt-8 border-b-2 border-light-gray overflow-x-auto">
              {dishType.map((type) => (
                <span
                  key={type}
                  className={`text-lg cursor-pointer ${
                    activeType === type
                      ? "text-primary border-primary"
                      : "hover:text-primary"
                  } transition-all duration-300 pb-2 border-b-2`}
                  onClick={() => setActiveType(type)}
                >
                  {type === "all" ? "All" : type}
                </span>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-8 mt-5 overflow-y-auto h-[calc(100vh-140px)] no-scrollbar px-3">
              {filterDishes(dishes).map((dish) => (
                <div
                  key={dish.id}
                  onClick={() => handleAddToOrder(dish)}
                  className="bg-dark-bg-2 h-62 rounded-2xl h-64 cursor-pointer p-4 mt-5 flex flex-col gap-12 relative"
                >
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="absolute -top-5 left-1/2 -translate-x-1/2 w-36 h-36 object-cover rounded-3xl"
                  />
                  <div className="text-center mt-36">
                    <h1 className="text-white">{dish.name}</h1>
                    <p className="text-white">
                      ${Number(dish.price || 0).toFixed(2)}
                    </p>
                    <p className="text-light-text">
                      {dish.bowls} servings available
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <img
            src={Cart}
            alt="Cart"
            className="absolute top-3 right-5 w-10 text-primary cursor-pointer lg:hidden"
            onClick={toggleOrderSection}
          />
          <div
            className={`fixed top-0 right-0 w-full lg:w-[40%] bg-dark-bg-2 p-5 rounded-xl h-full transform ${
              orderSection ? "translate-x-0" : "translate-x-full"
            } transition-transform duration-300 lg:static lg:block lg:translate-x-0`}
          >
            {/* Close Button for smaller screens */}
            <button
              onClick={toggleOrderSection}
              className="lg:hidden absolute top-5 right-5 bg-red-500 text-white p-2 rounded-full"
            >
              <img src={CloseIcon} alt="Close" className="w-5 h-5" />
            </button>

            <h1 className="text-white text-2xl font-semibold mb-6">
              Orders #34562
            </h1>
            <div className="h-[calc(100vh-250px)] overflow-y-auto no-scrollbar mb-6">
              {orderItems.length === 0 ? (
                <div className="text-white text-center">
                  No items in your order.
                </div>
              ) : (
                orderItems.map((item) => (
                  <div className="flex items-center gap-4 mb-4 w-full">
                  <div className="flex items-center justify-around w-full">
                    <div className="w-[80%]">
                      <div className="flex mr-4">
                        <div className="w-full flex flex-col gap-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 rounded-full"
                            />
                            <div>
                              <h3 className="text-white">{item.name}</h3>
                              <p className="text-white">
                                ${(parseFloat(item.price) || 0).toFixed(2)}
                              </p>
                            </div>
                          </div>
                          <div>
                            <input
                              type="text"
                              placeholder="order note.."
                              className="w-[95%] p-3 rounded-xl bg-Form-bg border-2 border-dark-border"
                            />
                          </div>
                        </div>
                        <div>
                          {/* Updated Quantity Control */}
                          <div className="flex items-center gap-2 flex-col lg:flex-row bg-Form-bg p-2 rounded-xl w-fit">
                            <button
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity - 1)
                              }
                              className="text-primary text-3xl rounded-full"
                            >
                              -
                            </button>
                            <div className="text-white px-4">{item.quantity}</div>
                            <button
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity + 1)
                              }
                              className=" text-2xl text-primary rounded-full"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-white">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => handleDeleteOrderItem(item.id)}
                        className="text-red-500 border-2 border-primary p-3 rounded-xl"
                      >
                        <img src={deleteIcon} alt="Delete" className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                </div>
                
                ))
              )}
            </div>
            <div className="border-t border-light-gray pt-4">
              <div className="flex justify-between text-light-text mb-4">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <button
                onClick={togglePayment}
                className="w-full bg-primary text-white py-3 rounded-xl"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
          {/* payment methods */}
          {payment && (
            <div className="absolute lg:right-0 lg:w-[50%] w-[100%] bg-dark-bg-2 h-screen  p-7 overflow-y-auto no-scrollbar rounded-lg">
              <button onClick={togglePayment} className="text-xl text-white">
                ←
              </button>
              <div className="border-b-2 border-dark-border py-1">
                <h2 className="text-white text-2xl">Payment</h2>
                <p className="text-light-text">3 payment methods available</p>
              </div>
              <div className="py-5 p-2">
                <h2 className="text-white mb-1">Payment Methods</h2>
                <div className="flex items-center gap-4">
                  <div className="border-2 border-dark-border p-5 rounded-xl">
                    <img src={card} alt="" />
                    <p className="text-white">Credit Card</p>
                  </div>
                  <div className="border-2 border-dark-border p-5 rounded-xl">
                    <img src={paypal} alt="" />
                    <p className="text-white">PayPal</p>
                  </div>
                  <div className="border-2 border-dark-border p-5 rounded-xl">
                    <img src={Wallet} alt="" />
                    <p className="text-white">Cash</p>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex flex-col text-white gap-2">
                  <label htmlFor="">Cardholder Name</label>
                  <input
                    type="text"
                    className="p-3 border-2 border-dark-border rounded-xl bg-Form-bg"
                  />
                  <label htmlFor="">Card Number</label>
                  <input
                    type="text"
                    className="p-3 border-2 border-dark-border rounded-xl bg-Form-bg"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-5 text-white py-3">
                    <div className="flex flex-col w-1/2">
                      <label htmlFor="expirationDate">Expiration Date</label>
                      <input
                        id="expirationDate"
                        type="text"
                        className="p-4 border-2 border-dark-border rounded-xl bg-Form-bg"
                        placeholder="MM/YY"
                      />
                    </div>

                    <div className="flex flex-col w-1/2">
                      <label htmlFor="cvc">CVC</label>
                      <input
                        id="cvc"
                        type="text"
                        className="p-4 border-2 border-dark-border rounded-xl bg-Form-bg"
                        placeholder="CVC"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-5 text-white py-3">
                    <div className="flex flex-col w-1/2">
                      <label htmlFor="expirationDate">Dine</label>
                      <input
                        id="expirationDate"
                        type="text"
                        className="p-4 border-2 border-dark-border rounded-xl bg-Form-bg"
                        placeholder="MM/YY"
                      />
                    </div>

                    <div className="flex flex-col w-1/2">
                      <label>Table Number</label>
                      <input
                        id="cvc"
                        type="text"
                        className="p-4 border-2 border-dark-border rounded-xl bg-Form-bg"
                        placeholder="Table Number"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-t-2 border-dark-border flex justify-between items-center py-4">
                <span className="text-white">Total</span>
                <span className="text-white">${subtotal.toFixed(2)}</span>
              </div>
              <div>
                <button className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90">
                  Place Order
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
