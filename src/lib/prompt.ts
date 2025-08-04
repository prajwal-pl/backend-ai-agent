export const calculatorPrompt = (input: string) => {
  return `Calculate the following: ${input}. If the input is not a valid calculation, respond with "Invalid calculation." The input can also be a generic mathematical question or a request for calculation, handle it accordingly. If it is neither, respond with "I can only perform calculations."`;
};

export const weatherPrompt = () => {
  return `Check the weather for a mock location. Provide a mock current temperature, weather condition, and location. If the location is not valid or cannot be found, respond with "Location not found." If anything else is requested, respond with "I can only check the weather."`;
};
