export const validateInput = (fieldName: string, value: string): string => {
  if (fieldName === "username") {
    if (value.length < 1 || value.length > 150) {
      return "Username should contain 1-150 characters";
    }
  }

  if (fieldName === "password") {
    if (value.length < 1 || value.length > 128) {
      return "Password should contain 1-128 characters";
    }
  }

  if (fieldName === "name") {
    if (value.length < 1 || value.length > 255) {
      return "Name should contain 1-255 characters";
    }
  }

  if (fieldName === "email") {
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    if (!emailPattern.test(value)) {
      return "Invalid email format";
    }
    if (value.length < 1 || value.length > 254) {
      return "Email should contain 1-254 characters";
    }
  }

  if (fieldName === "birthday_date") {
    const datePattern = /^(?:\d{2}|\d{4})-\d{2}-\d{2}$/;
    if (!datePattern.test(value)) {
      return "Invalid date format. Use YYYY-MM-DD";
    }
  }

  if (fieldName === "phone_number") {
    // Basic US phone number pattern (10 digits)
    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(value)) {
      return "Invalid phone number format (e.g., 1234567890)";
    }
  }

  if (fieldName === "address") {
    value.length < 1 && "Address should contain more than 1 character";
  }

  return "";
};
