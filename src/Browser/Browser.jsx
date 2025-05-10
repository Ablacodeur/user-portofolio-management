import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Browser() {
    const navigate = useNavigate()
  return (
    <div>
        Browser
        <p>
        <Link to={"/signin"}> Sign in</Link>
        </p>
        <p>
        <Link to={"/signup"}> Register</Link>
        </p>


    </div>
  )
}
