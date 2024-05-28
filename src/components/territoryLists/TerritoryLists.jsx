import styles from './TerritoryList.module.css'
import { useState, useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import Modal from '../common/modal/Modal'
import ModalAddUser from './modalAddUser/ModalAddUser'
import ModalAddPost from './modalAddPost/ModalAddPost'
import Pagination from '../common/pagination/Pagination'
import PersonItem from '../common/personItem/PersonItem'
import PostItem from '../common/postItem/PostItem'
import Loader from '../UI/loader/Loader'
import BtnText from '../UI/btnText/BtnText'
import stylesBtnText from '../../components/UI/btnText/BtnText.module.css'
import { Plus } from '../../utilits/icon/plus'
import { getUsersTerritory } from '../API/TerritoryApi'
import { getPostsTerritory } from '../API/PostApi'

export default function TerritoryLists() {
  const [error, setError] = useState(null)
  const [isShowModalUser, setIsShowModalUser] = useState(false)
  const [isShowModalPost, setIsShowModalPost] = useState(false)
  const [isShowModalEditPost, setIsShowModalEditPost] = useState(false)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('Пользователи')
  const [posts, setPosts] = useState([])
  const [allPersonList, setAllPersonList] = useState([])
  const [responsePages, setResponsePages] = useState(null)
  const [responseElements, setResponseElements] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [needFetchUsers, setNeedFetchUsers] = useState(0)
  const [newSessionStoragePost, setNewSessionStoragePost] = useState(0)
  const [currentModalUserId, setCurrentModalUserId] = useState('')
  const [currentModalPostId, setCurrentModalPostId] = useState('')

  const { id } = useParams()
  const user = useMemo(() => {
    return JSON.parse(sessionStorage?.getItem('user'))
  }, [])

  useEffect(() => {
    if (user.role === 'SECURITY') {
      setActiveTab('Посты охраны')
      fetchPosts(id)
    }
  }, [])


  const handleAddUser = () => {
    setIsShowModalUser(true)
  }

  const handleAddPost = () => {
    setIsShowModalPost(true)
  }

  const handleEditPost = () => {
    setIsShowModalEditPost(true)
  }

  async function fetchUsers(id, pageNumber, pageSize) {
    try {
      setLoading(true)
      if (user.role === 'MANAGER' || user.role === 'ADMIN') {
        const response = await getUsersTerritory(id, pageNumber, pageSize)
        setAllPersonList(response.content)
        setResponsePages(response.totalPages)
        setResponseElements(response.totalElements)
      }
      setError(null)
    } catch (currentError) {
      setError(currentError.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user.role === 'ADMIN' || user.role === 'MANAGER') {
      fetchUsers(id, pageNumber - 1, pageSize)
    }
  }, [pageNumber, pageSize, needFetchUsers])

  async function fetchPosts(id) {
    try {
      setLoading(true)
      const response = await getPostsTerritory(id)
      setPosts(response, 'posts')
      setError(null)
    } catch (currentError) {
      setError(currentError.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const handleDocumentClick = (event) => {
      // Проверяем, был ли клик выполнен внутри модалок
      if (!event.target.closest('.modal')) {
        setCurrentModalUserId('')
        setCurrentModalPostId('')
      }
    }
    document.addEventListener('click', handleDocumentClick)
    return () => {
      document.removeEventListener('click', handleDocumentClick)
    }
  }, [])

  return (
    <>
      {(user.role === 'ADMIN' || user.role === 'MANAGER') &&
        <>
          <Modal isShowModal={isShowModalUser} setIsShowModal={setIsShowModalUser}>
            <ModalAddUser
              setIsShowModal={setIsShowModalUser}
              isShowModal={isShowModalUser}
              territoryId={id}
              setNeedFetchUsers={setNeedFetchUsers}
              allPersonList={allPersonList}
            />
          </Modal>
          {user.role === 'ADMIN' &&
            <>
              <Modal isShowModal={isShowModalPost} setIsShowModal={setIsShowModalPost}>
                <ModalAddPost
                  setIsShowModal={setIsShowModalPost}
                  isShowModal={isShowModalPost}
                  territoryId={id}
                  fetchPosts={fetchPosts}
                />
              </Modal>
              <Modal
                isShowModal={isShowModalEditPost}
                setIsShowModal={setIsShowModalEditPost}
              >
                <ModalAddPost
                  setIsShowModal={setIsShowModalEditPost}
                  territoryId={id}
                  fetchPosts={fetchPosts}
                  newSessionStoragePost={newSessionStoragePost}
                  edit
                />
              </Modal>
            </>}
        </>}
      <div className={styles.actionWrapper}>
        <div className={styles.type}>
          {(user.role === 'ADMIN' || user.role === 'MANAGER') && (
            <BtnText
              classes={[
                stylesBtnText.btnTextBig,
                activeTab === 'Пользователи'
                  ? stylesBtnText.colorActive
                  : stylesBtnText.colorSecondary,
              ]}
              onClick={() => setActiveTab('Пользователи')}
            >
              Пользователи
            </BtnText>
          )}
          <BtnText
            classes={[
              stylesBtnText.btnTextBig,
              activeTab === 'Посты охраны'
                ? stylesBtnText.colorActive
                : stylesBtnText.colorSecondary,
            ]}
            onClick={() => {
              setActiveTab('Посты охраны')
              fetchPosts(id)
            }}
          >
            Посты охраны
          </BtnText>
        </div>
        {(user.role === 'ADMIN' || user.role === 'MANAGER') &&
          (activeTab === 'Пользователи' ? (
            <BtnText
              classes={[
                stylesBtnText.btnTextBig,
                stylesBtnText.colorPrimary,
              ]}
              icon={<Plus />}
              onClick={handleAddUser}
            >
              Добавить пользователя
            </BtnText>
          ) : (
            user.role === 'ADMIN' && (
              <BtnText
                classes={[
                  stylesBtnText.btnTextBig,
                  stylesBtnText.colorPrimary,
                ]}
                icon={<Plus />}
                onClick={handleAddPost}
              >
                Добавить пост охраны
              </BtnText>
            )
          ))}
      </div>
      <ul className={styles.table}>
        {activeTab === 'Пользователи' ? (
          loading ? (
            <Loader />
          ) : allPersonList?.length ? (
            allPersonList.map((person) => {
              return (
                <PersonItem
                  key={person.id}
                  person={person}
                  setNeedFetchUsers={setNeedFetchUsers}
                  currentModalUserId={currentModalUserId}
                  setCurrentModalUserId={setCurrentModalUserId}
                  territoryId={id}
                />
              )
            })
          ) : (
            <h3>Пользователей нет</h3>
          )
        ) : loading ? (
          <Loader />
        ) : posts?.length ? (
          posts.map((post) => {
            return (
              <PostItem
                key={post.id}
                post={post}
                fetchPosts={fetchPosts}
                currentModalPostId={currentModalPostId}
                setCurrentModalPostId={setCurrentModalPostId}
                handleEditPost={handleEditPost}
                territoryId={id}
                setNewSessionStoragePost={setNewSessionStoragePost}
              />
            )
          })
        ) : (
          <h3>Постов охраны нет</h3>
        )}
      </ul>
      {error && <div className="error">{error}</div>}
      {activeTab === 'Пользователи' && (
        <Pagination
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          pageSize={pageSize}
          setPageSize={setPageSize}
          responsePages={responsePages}
          responseElements={responseElements}
          fetchData={fetchUsers}
        />
      )}
    </>
  )
}
