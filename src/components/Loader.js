import { Spin } from 'antd'
import React from 'react'

const Loader = () => {
    return (
        <div className='loader'><Spin tip="Loading..." /></div>
    )
}

export default Loader