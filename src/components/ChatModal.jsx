import { useChat } from '../context/ChatContext.jsx';
import './ChatModal.css';

export default function ChatModal() {
  const { isOpen, close } = useChat();
  if (!isOpen) return null;

  return (
    <div className="chat-modal-backdrop" onClick={close}>
      <div className="dialog elev-lg chat-modal" onClick={(e) => e.stopPropagation()}>
        <span className="card-kicker">WhatsApp</span>
        <h3 className="chat-modal-title">Opens a chat with the counter</h3>
        <p className="chat-modal-body">
          In the live site this jumps straight to WhatsApp with the restaurant's
          number pre-filled. Send the real number and it wires up.
        </p>
        <button type="button" className="btn btn-primary btn-block" onClick={close}>Got it</button>
      </div>
    </div>
  );
}
