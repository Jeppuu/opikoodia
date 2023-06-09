import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Toolbar() {
  return (
    <div className="toolbar">
      <input type="text" name="tag-input" id="tag-input" placeholder="Filter posts by #tag" />
      <div className="trending-tags">

      </div>
      <button className="make-new-post-btn" type="button"><FontAwesomeIcon icon={faPenToSquare} className="fa-pen-to-square" />New post</button>
    </div>
  )
}
