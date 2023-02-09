const Contact = require("../models/Contact")
const { throwError, responseError } = require("../util/errorFunctions");
const { validateContactInfo } = require("../util/contactFunctions");

const getContact = async (req, res) => {
  try {
    const { id: contactId } = req.params;
    const contact = await Contact.findById(contactId);
    if (!contact) throwError('This contact is not in the database!', 404);
    return res.status(200).send(contact);

  } catch (error) { return responseError(res, error) }
}

const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    if (!contacts.length) throwError('There are no contacts yet, create the first one!', 404);
    return res.status(200).send(contacts);

  } catch (error) { return responseError(res, error) }
}

const createContact = async (req, res) => {
  try {
    const { contact: contactInfo } = req.body;
    await validateContactInfo(contactInfo);

    const contact = new Contact(contactInfo);
    contact.save((error, contact) => {
      if (contact) return res.status(200).send(contact);
      throwError('Error trying to store the contact, please try again!', 500, error);
    });

  } catch (error) { return responseError(res, error) }
}

const updateContact = async (req, res) => {
  try {
    const { contact: updatedContact } = req.body;
    await validateContactInfo(updatedContact);

    const contact = await Contact.findByIdAndUpdate(updatedContact._id, updatedContact, { new: true });
    if (!contact) throwError('The contact was not updated, please try again!', 400);
    return res.status(200).send(contact);

  } catch (error) { return responseError(res, error) }
}

const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedContact = await Contact.deleteOne({ _id: id });
    if (deletedContact.deletedCount === 0)
      throwError('The contact was not deleted, please try again!', 400);
    return res.status(200).send({ message: 'Contact deleted successfully from database!' });

  } catch (error) { return responseError(res, error) }
}


module.exports = {
  getContact,
  getContacts,
  createContact,
  updateContact,
  deleteContact
}
