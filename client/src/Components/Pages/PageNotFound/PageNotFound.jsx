import React from 'react'
import "./PageNotFound.scss"
import pageImg from "../../../Assets/Images/PageNotFound.svg"

const PageNotFound = () => {
  const componentClass = 'page-not-found-container'
  return (
    <div className={componentClass}>
      <img src={pageImg} alt="Page Not Found" />
    </div>   
  )
}

export default PageNotFound