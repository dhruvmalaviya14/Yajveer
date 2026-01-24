import { Contact, allowedSubjects } from "../models/contact.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/Apierror.js";

const submitContactForm = async (req, res, next) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !phone || !subject || !message) {
      throw new ApiError(400, "All fields are required.");
    }

    if (!allowedSubjects.includes(subject)) {
      throw new ApiError(400, "Invalid subject selected.");
    }

    const contactData = { name, email, phone, subject, message };
    if (req.user) contactData.user = req.user._id;

    const contact = await Contact.create(contactData);

    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          contact,
          "Your message has been sent. We'll get back to you soon!"
        )
      );
  } catch (error) {
    next(error);
  }
};

const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          contacts,
          "All contact submissions fetched successfully."
        )
      );
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  console.log("Hello  Rishi Kukadiya  Here!!!");
  try {
    const { id } = req.params;
    console.log(id);
    const contact = await Contact.findById(id);
    if (!contact) {
      throw new ApiError(404, "Contact submission not found.");
    }

    await Contact.findByIdAndDelete(id);

    return res
      .status(200)
      .json(
        new ApiResponse(200, null, "Contact submission deleted successfully.")
      );
  } catch (error) {
    next(error);
  }
};

export { submitContactForm, getAllContacts, deleteContact};
