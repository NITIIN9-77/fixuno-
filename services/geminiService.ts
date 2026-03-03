
export const getChatResponse = async (message: string): Promise<string> => {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });
    
    if (!response.ok) throw new Error('Network response was not ok');
    
    const data = await response.json();
    return data.text;
  } catch (error) {
    console.error("Uno AI Connection Error:", error);
    return "I'm currently focusing on optimizing our home solutions. For the fastest booking or immediate help, please call our priority line at 8423979371 or click the 'Book Now' button.";
  }
};

export const getServiceExplanation = async (serviceName: string, subServiceName: string, price: number): Promise<string> => {
  try {
    const response = await fetch('/api/explain', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ serviceName, subServiceName, price }),
    });
    
    if (!response.ok) throw new Error('Network response was not ok');
    
    const data = await response.json();
    return data.text;
  } catch (error) {
    console.error("Explanation Error:", error);
    return "This professional service ensures your home systems operate at peak efficiency and safety levels.";
  }
};
