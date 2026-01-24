import "../CSS/Contactus.css";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import LoadingAnimation from "./LoadingAnimation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { deleteContact } from "../Redux/Contactus";
import ConfirmDialog from "./ConfirmDialog";

export default function Contactus() {
  const { data: Contacts = [] } = useSelector((state) => state.contactus);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmingContact, setConfirmingContact] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setMessages(Contacts);
  }, [Contacts]);

  const openEmailWindow = (contact) => {
    const { name, email, subject, message } = contact;
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
      "Regarding your query: " + subject
    )}&body=${encodeURIComponent(
      `Hello ${name},\n\nRegarding your query: "${message}"\n\n[Type your response here]\n\nRegards,\nYajveer Team`
    )}`;
    window.open(mailtoLink, "_blank");
  };

  const handleResolveConfirmed = async (contact) => {
    const { _id } = contact;
    setIsLoading(true);
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_SERVER}/api/v1/users/contacts/${_id}`
      );

      if (response.data.success) {
        toast.success("Query Solved Successfully!!");
        setMessages((prev) => prev.filter((msg) => msg._id !== _id));
        dispatch(deleteContact(_id));
      } else {
        toast.error("Server responded but failed to delete.");
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Server is Down or Unreachable!");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <LoadingAnimation />
      ) : (
        <div className="contactus-container">
          <div className="table-wrapper">
            <table className="contactus-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Subject</th>
                  <th>Message</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {messages.length > 0 ? (
                  messages.map((contact, index) => (
                    <tr key={contact._id || index}>
                      <td className="wrap-text">{contact.name}</td>
                      <td className="wrap-text">{contact.email}</td>
                      <td className="wrap-text">{contact.phone}</td>
                      <td className="wrap-text">{contact.subject}</td>
                      <td className="message-column">{contact.message}</td>
                      <td className="button-cell">
                        <button
                          className="resolve-btn"
                          onClick={() => {
                            openEmailWindow(contact);
                            setConfirmingContact(contact);
                          }}
                        >
                          Resolve
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="no-data">
                      No messages yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {confirmingContact && (
        <ConfirmDialog
          message="Did you send the email? Click Yes to mark this query as resolved."
          onConfirm={() => {
            handleResolveConfirmed(confirmingContact);
            setConfirmingContact(null);
          }}
          onCancel={() => setConfirmingContact(null)}
        />
      )}
    </>
  );
}
