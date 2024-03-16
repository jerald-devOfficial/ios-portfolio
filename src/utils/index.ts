import { format, isToday, isThisYear, differenceInHours } from 'date-fns';

export const arrGenerator = (val: number): number[] =>
  Array.from({ length: val }, (_, i) => i + 1)

export const getInitials = (fullName: string) => {
  // Split the full name into an array of words
  const words = fullName.split(' ')

  // Initialize an empty string to store initials
  let initials = ''

  // Iterate over each word
  words.forEach((word) => {
    // Get the first character of each word and add it to the initials string
    initials += word.charAt(0)
  })

  // Return the initials string in uppercase
  return initials.toUpperCase()
}

 
export const getRandomHexColor =() => {
  // Generate a random hexadecimal color code
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  // Ensure the color code has 6 digits by padding with zeros if necessary
  return randomColor.padStart(6, '0');
}

export const generatePlaceholderURL = (width: string, height: string, initials: string) => {
  // Generate two random hex colors
  const color1 = getRandomHexColor();
  const color2 = getRandomHexColor();
  
  // Construct the placeholder URL with the generated colors and encoded initials
  const placeholderURL = `https://placehold.co/${(width)}x${(height)}/${(color1)}/${(color2)}?text=${(initials)}`
  
  return placeholderURL;
}

export const hoursAgo = (time: Date) => differenceInHours(new Date(), new Date(time));


export const formatDate = (createdAt: Date) => {
  const parsedDate = new Date(createdAt);
  
  if (isToday(parsedDate)) {
    // Format time for today's mails
    return format(parsedDate, 'h:mm a');
  } else if (isThisYear(parsedDate)) {
    // Format date for mails within the current year
    return format(parsedDate, 'MMM d');
  } else {
    // Format date for mails outside the current year
    return format(parsedDate, 'MM/d/yy');
  }
};