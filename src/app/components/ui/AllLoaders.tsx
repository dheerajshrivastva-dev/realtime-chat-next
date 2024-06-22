import { FC } from 'react'
import styles from "./Loader.module.css"

interface AllLoadersProps {
  
}

export const WaveLoader: FC<AllLoadersProps> = ({}) => {
  return (
    <svg className={styles.WaveLoader} width="auto" height="auto" viewBox="0 0 100 100">
      <path id="wave" d="M0 50 C 25 75 50 25 75 50 S 100 75 100 50" fill="none" stroke="blue" strokeWidth="2" />
    </svg>
  )
}
