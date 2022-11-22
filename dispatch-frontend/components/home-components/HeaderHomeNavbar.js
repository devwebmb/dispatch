import React from 'react'
import Image from "next/image"
import PhotoHeaderAccueil from "../../public/images/design-page-accueil/photo-header-accueil.jpg"

export default function HeaderHomeNavbar() {
  return (
      <div className='header-home-navbar'>
          <div >
              <Image src={PhotoHeaderAccueil} />
          </div>
    </div>
  )
}
