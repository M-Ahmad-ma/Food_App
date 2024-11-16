import React, { useState } from 'react'
import SideNav from './common/SideNav'
import Header from './common/Header'
import icon from '../assets/Icon/Icon.svg'
import icon1 from '../assets/Icon/Icon-1.svg'
import icon2 from '../assets/Icon/Icon-2.svg'
import image from '../assets/Content/Image 2.png'
import image2 from '../assets/Content/Image 3.png'
import image3 from '../assets/Content/Image 5-1.png'
import image4 from '../assets/Content/Image 5.png'
import image5 from '../assets/Content/Image 6.png'
import { PieChart } from '@mui/x-charts/PieChart';


const Dashboard = ({ dishes }) => {
  const [Total, setTotal] = useState([
    {
      id: 1,
      icon: icon,
      figure: '$10,234.00',
      text: 'Total Revenue',
      rate: '+32.40%'
    },
    {
      id: 2,
      icon: icon1,
      figure: '$24,000',
      text: 'Total Dish Order',
      rate: '-12.40%',
      down: true
    },
    {
      id: 3,
      icon: icon2,
      figure: '2000',
      text: 'Total Customer',
      rate: '+2.40%'
    }
  ])

  const orders = [
    {
      customer: { name: "Eren Jaegar", initials: "EJ" },
      menu: "Spicy seasoned seafood noodles",
      payment: 125,
      status: "completed"
    },
    {
      customer: { name: "Reiner Braunn", initials: "RB" },
      menu: "Salted Pasta with mushroom sauce",
      payment: 145,
      status: "preparing"
    },
    {
      customer: { name: "Levi Ackerman", initials: "LA" },
      menu: "Beef dumpling in hot and sour soup",
      payment: 105,
      status: "pending"
    },
    {
      customer: { name: "Historia Reiss", initials: "HR" },
      menu: "Hot spicy fried rice with omelet",
      payment: 45,
      status: "completed"
    },
    {
      customer: { name: "Hanji Zoe", initials: "HZ" },
      menu: "Hot spicy fried rice with omelet",
      payment: 245,
      status: "completed"
    },
    {
      customer: { name: "Armin Arlert", initials: "AA" },
      menu: "Hot spicy fried rice with omelet",
      payment: 435,
      status: "completed"
    }
  ]

  const mostOrderedDishes = [
    {
      name: "Margherita Pizza",
      image: image,
      figure: 120
    },
    {
      name: "Cheeseburger",
      image: image2,
      figure: 98
    },
    {
      name: "Sushi Platter",
      image: image3,
      figure: 75
    },
    {
      name: "Spaghetti Carbonara",
      image: image5,
      figure: 85
    },
    {
      name: "Caesar Salad",
      image: image,
      figure: 60
    },
    {
      name: "Chicken Tikka",
      image: image2,
      figure: 105
    },
    {
      name: "Sushi Platter",
      image: image3,
      figure: 175
    },
    {
      name: "Spaghetti Carbonara",
      image: image5,
      figure: 585
    },
    {
      name: "Caesar Salad",
      image: image,
      figure: 60
    },
    {
      name: "Chicken Tikka",
      image: image2,
      figure: 105
    }
  ];

  const orderData = [
    { id: 1, type: 'Dine In', count: 1000, color: 'rgb(255, 99, 132)' },
    { id: 2, type: 'To Go', count: 122, color: 'rgb(255, 159, 64)' },
    { id: 3, type: 'Delivery', count: 264, color: 'rgb(75, 192, 255)' },
    { id: 4, type: 'Delivery', count: 164, color: 'rgb(75, 192, 255)' }

  ];

  return (
    <div className='flex min-h-screen w-full overflow-hidden'>
      <SideNav />
      <main className='w-full lg:mx-6 px-3 lg:px-0 mt-3 flex-col lg:flex-row flex items-start gap-9'>
        <div className='w-[100%]'>
          <div className='border-b-2 border-dark-border py-4'>
            <Header name='Dashboard' date='Tuesday, 2 FEB 2021' setinput='false' />
          </div>
          <div className='flex items-center flex-shrink-0 gap-5 overflow-x-scroll lg:overflow-hidden  justify-between py-3 '>
            {Total.map(total => {
              return (
                <div key={total.id} className='bg-dark-bg-2 w-[80%] lg:w-[30%]  px-6 py-7 rounded-xl flex flex-col gap-3 items-start'>
                  <div className='flex items-center gap-3'>
                    <img src={total.icon} alt="" />
                    <p className={`${total.down ? 'text-red-400' : 'text-green-400'}`}>{total.rate}</p>
                  </div>
                  <h2 className='text-4xl font-semibold text-white'>{total.figure}</h2>
                  <p className='text-light-text'>{total.text}</p>
                </div>
              )
            })}
          </div>
          <div className=" bg-dark-bg-2 text-white p-2 rounded-lg shadow-lg">
            <div className="w-full  bg-dark-bg-2 text-white p-3 rounded-lg shadow-lg h-[430px] flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h1 className=" text-2xl font-bold">Order Report</h1>
                <button className="px-4 py-2 border-2 border-dark-border text-light-text rounded-lg hover:bg-zinc-800 transition-colors flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                  </svg>
                  Filter Order
                </button>
              </div>
              <div className=" overflow-hidden no-scrollbar">
                <div className="w-full">
                  <div className="text-left text-zinc-400 text-lg font-semibold flex items-center justify-between border-b-2 py-2 border-dark-border">
                    <div>Customer</div>
                    <div>Menu</div>
                    <div>Total Payment</div>
                    <div>Status</div>
                  </div>
                  <div className="block h-[50vh]  overflow-y-auto no-scrollbar" style={{ maxHeight: "calc(100% - 3rem)" }}>
                    {orders.map((order, index) => (
                      <div key={index} className="border-b border-zinc-800 last:border-b-0 w-full flex items-center justify-between py-2">
                        <div className="py-2 pl-4 flex items-center">
                          <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center text-sm font-medium mr-3">
                            {order.customer.initials}
                          </div>
                          <span>{order.customer.name}</span>
                        </div>
                        <div className="py-4 pl-4">{order.menu}</div>
                        <div className="py-4 pl-4">${order.payment}</div>
                        <div className="py-4 pl-4">
                          <span
                            className={`px-5 py-2 rounded-full text-xs ${order.status === "completed"
                              ? "bg-emerald-500/20 text-emerald-500"
                              : order.status === "preparing"
                                ? "bg-violet-500/20 text-violet-500"
                                : "bg-orange-500/20 text-orange-500"
                              }`}
                          >
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-5 lg:w-1/2 w-full'>
          <div className='flex flex-col py-6 bg-dark-bg-2 rounded-xl'>
            <div className='flex items-center justify-between px-4'>
              <h2 className='text-2xl text-white'>most ordered</h2>
              <div>
                <select name="" id="" className='bg-transparent border-2 border-dark-border text-light-text p-1 rounded-xl'>
                  <option>today</option>
                  <option>weekly</option>
                  <option>yearly</option>
                </select>
              </div>
            </div>
            <div className='w-full h-[35vh] overflow-y-auto no-scrollbar flex flex-col gap-5 py-5'>
              {mostOrderedDishes.map((dish, index) => (
                <div key={index} className='flex items-center gap-8 ml-10'>
                  <img src={dish.image} alt={dish.name} className='w-16 h-16 rounded-full' />
                  <div>
                    <h3 className='text-white text-lg font-semibold'>{dish.name}</h3>
                    <p className='text-light-text'>{dish.figure} orders</p>
                  </div>
                </div>
              ))}
            </div>
            <div className='flex items-center justify-center mt-3 text-white'>
              <button className='border-2 border-primary p-3 w-52 rounded-xl text-primary'>See All</button>
            </div>
          </div>

          <div className="h-[40vh] rounded-xl bg-dark-bg-2">
            <div className='flex items-center justify-between mt-3 px-3 py-4'>
              <h1 className='text-xl text-white'>Most Type Of orders</h1>
              <select name="" id="" className='px-3 py-1 bg-transparent border-2 border-dark-border text-light-text rounded-lg'>
                <option value="">Dine in</option>
                <option value="">To Go</option>
                <option value="">Delivery</option>
              </select>
            </div>
            <PieChart
              series={[
                {
                  data: orderData.map(item => ({ id: item.id, value: item.count, label: item.type })),
                  innerRadius: 50,
                  outerRadius: 100,
                  paddingAngle: 5,
                  cornerRadius: 5,
                  startAngle: -45,
                  endAngle: 225,
                  cx: 150,
                  cy: 100,
                }
              ]}
            />

          </div>

        </div>
      </main>
    </div>
  )
}

export default Dashboard