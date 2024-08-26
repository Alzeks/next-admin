'use client'
import { useFormStatus } from "react-dom";
import styles from './pending.module.css'
import { BsAsterisk } from "react-icons/bs";
import { BiAlbum } from "react-icons/bi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";


export default function Pending() {
    const { pending,data,action,method } = useFormStatus()

    return (
        <div className={styles.pending} aria-disabled={pending}>
            {pending ? <AiOutlineLoading3Quarters className={styles.loader} size={15} /> : ''}
        </div>);
}