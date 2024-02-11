const { z } = require("zod");

const is18YearsOrOlder = (value) => {
  const currentDate = new Date();
  const userBirthDate = new Date(value);
  const age = currentDate.getFullYear() - userBirthDate.getFullYear();

  return age >= 18;
};
const isValidPhoneNumber = (value) => {
  // Add your custom validation logic for phone number here
  return /^[1-9]\d{9}$/.test(value);
};

const userSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().refine(isValidPhoneNumber, {
    message: "Invalid phone number.",
  }),
  dateOfBirth: z.string().refine(is18YearsOrOlder, {
    message: "User must be at least 18 years old.",
  }),
});



module.exports = userSchema;
