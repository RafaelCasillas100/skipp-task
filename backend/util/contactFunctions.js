const Contact = require("../models/Contact");
const { throwError } = require('./errorFunctions');

const validateContactInfo = async (contact) => {
  const { firstName, lastName, phoneNumber } = contact;
  if (!firstName || !lastName)
    throwError('The name or last name information is not complete!', 400);

  if (phoneNumber.toString().length !== 10)
    throwError('The phone number must be 10 digits long!', 400);

  const contactAlreadyExists = await contactWithThisPhoneAlreadyExists(phoneNumber);
  if (contactAlreadyExists)
    throwError('A contact with this phone number already exists in your contacts!', 401);
}

const contactWithThisPhoneAlreadyExists = async (phoneNumber) => {
  try {
    const contacts = await Contact.find({ phoneNumber });
    if (contacts.length === 1 && contacts[0].phoneNumber === phoneNumber)
      return false;
    return contacts.length > 0;
  } catch (error) {
    throwError('An unespected error ocurred, please try again!', 500, error);
  }
}

module.exports = { validateContactInfo }
