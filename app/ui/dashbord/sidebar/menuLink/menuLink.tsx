"use client"
import React from 'react'
import { useState, useTransition } from 'react'
import styles from './menuLink.module.css'
import { usePathname } from 'next/navigation'
import PendingSide from '../../../loadings/PendingSide'
import Loading from '../../../../loading'
import { useRouter } from 'next/navigation'

type TItem ={icon: React.ReactElement, title: string, path: string}

const MenuLink = ({item}: {item: TItem}) => {
  const [clicked, setClicked] = useState(false)
  const pathname = usePathname()
  const [isPanding, startTransition] = useTransition()
  const router = useRouter()

  const handleClick = (path: string)=>{
    startTransition(()=>{router.push(`${path}`)})
  }
  
  return (
       <div className={
      `${styles.container}  ${clicked && styles.clicked} ${pathname === item.path && styles.active}`
    }
      onClick={()=>handleClick(item.path)}
      >
      {item.icon}
      {item.title}
       {isPanding && <PendingSide/>}
     </div>
  )
}

export default MenuLink;