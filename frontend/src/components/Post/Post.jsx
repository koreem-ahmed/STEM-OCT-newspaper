import { useState } from 'react'
import { MdEdit, MdDelete, MdAddShoppingCart, MdCheck } from 'react-icons/md'
import { useNewspaperStore } from '../../store/Newspaper.js'
import { useCartStore } from '../../store/Cart.js'
import { toast } from 'sonner'
import './Post.scss'

const Post = ({ newspaper }) => {
  const { deleteNewspaper, updateNewspaper } = useNewspaperStore()
  const { addToCart } = useCartStore()
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    name: newspaper.name,
    price: newspaper.price,
    date: newspaper.date,
    image: newspaper.image
  })

  const handleDelete = async (nid) => {
    const { success, message } = await deleteNewspaper(nid)
    if (success) toast.success(message)
    else toast.error(message || 'Something went wrong')
  }

  const handleSave = async () => {
    const { success, message } = await updateNewspaper(newspaper._id, editData)
    if (success) {
      toast.success(message)
      setIsEditing(false)
    } else {
      toast.error(message)
    }
  }

  const handleAddToCart = () => {
    addToCart(newspaper)
    toast.success(`"${newspaper.name}" added to cart`)
  }

  if (isEditing) {
    return (
      <div className="Border_div">
        <input
          className="edit-input"
          value={editData.name}
          onChange={(e) => setEditData({ ...editData, name: e.target.value })}
          placeholder="Title"
        />
        <input
          className="edit-input"
          type="number"
          value={editData.price}
          onChange={(e) => setEditData({ ...editData, price: e.target.value })}
          placeholder="Price"
        />
        <input
          className="edit-input"
          value={editData.image}
          onChange={(e) => setEditData({ ...editData, image: e.target.value })}
          placeholder="Image URL"
        />
        <input
          className="edit-input"
          type="date"
          value={editData.date}
          onChange={(e) => setEditData({ ...editData, date: e.target.value })}
        />
        <div className="Buttons_div">
          <button className="edit save" onClick={handleSave}>
            <MdCheck />
          </button>
          <button className="delete" onClick={() => setIsEditing(false)}>
            ✕
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="Border_div">
      <h1>{newspaper.name}</h1>
      <img src={newspaper.image} alt={newspaper.name} />
      <div className="price">EGP {newspaper.price}</div>
      <div className="date">{newspaper.date}</div>

      <div className="Buttons_div">
        <button className="add-cart" onClick={handleAddToCart} title="Add to cart">
          <MdAddShoppingCart />
        </button>
        <button className="edit" onClick={() => setIsEditing(true)} title="Edit">
          <MdEdit />
        </button>
        <button className="delete" onClick={() => handleDelete(newspaper._id)} title="Delete">
          <MdDelete />
        </button>
      </div>
    </div>
  )
}

export default Post
