import HomeLayout from 'layouts/HomeLayout'
import type { NextPage } from 'next'
import React from 'react'

const Home: NextPage = () => (
  <HomeLayout availableDays={[9, 10, 11, 12, 13, 14, 15, 16]} />
)
export default Home
