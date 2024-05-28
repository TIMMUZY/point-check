import styles from './PostItemSecurity.module.css'
import PostType from '../../common/postType/PostType'
import { Archway } from '../../../utilits/icon/archway'

export default function PostItemSecurity({ post, setSelectPost, setIsShowModal, ...props }) {

  const handleChoicePost = () => {
    setSelectPost(post)
    setIsShowModal(false)
    sessionStorage.setItem('post', JSON.stringify(post))
  }

  return (
    <li className={styles.securityItem}
      onClick={handleChoicePost}
      {...props}>
      <div className={styles.imageWrapper}>
        <Archway />
      </div>
      <p className={styles.name}>{post.name}</p>
      <p className={styles.note}>{post.note}</p>
      <PostType className={styles.type} colorThemeSecurity>
        {post.type}
      </PostType>
    </li>
  )
}
