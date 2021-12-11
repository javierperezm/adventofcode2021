import HomeLayout from 'layouts/HomeLayout'
import type { NextPage } from 'next'
import React from 'react'

const Home: NextPage = () => <HomeLayout availableDays={[9, 10, 11]} />
export default Home
