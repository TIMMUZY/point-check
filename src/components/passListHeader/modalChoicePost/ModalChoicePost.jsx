import styles from './ModalChoicePost.module.css'
import PostItemSecurity from '../postItemSecurity/PostItemSecurity'

export default function ModalChoicePost({
  postList,
  setSelectPost,
  setIsShowModal,
  ...props
}) {
  return (
    <div className={styles.wrapper} {...props}>
      <div className={styles.header}>
        <h2 className={styles.title}>Выберите пост охраны</h2>
      </div>
      <div className={styles.list}>
        {postList?.length > 0 &&
          postList?.map((post) => (
            <PostItemSecurity
              key={post.id}
              post={post}
              setSelectPost={setSelectPost}
              setIsShowModal={setIsShowModal}
            />
          ))}
      </div>
    </div>
  )
}
