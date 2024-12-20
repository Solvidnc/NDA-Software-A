export const isValidPhoneNumber = (phone: string) => {
    const regex = /^(1-?)?(\(\d{3}\)|\d{3})-?\d{3}-?\d{4}$/; // Basic US phone number check
    return regex.test(phone);
  };
  
export function formatPhoneNumber(phone: string): string | null {
    // Remove non-digit characters
    const digits = phone.replace(/\D/g, '');
  
    // Check if the number is valid (10 digits)
    if (digits.length === 10) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    } else if (digits.length === 11 && digits[0] === '1') {
      // Format the number if it starts with country code '1'
      return `(${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
    }
  
    return null; // Invalid number
  }