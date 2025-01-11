// app/utils/api.ts
export async function fetchCalorieData(): Promise<number> {
  // Simulate an API call with a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockCalories = 800; // Example calorie count
      resolve(mockCalories);
    }, 1000);
  });
}
