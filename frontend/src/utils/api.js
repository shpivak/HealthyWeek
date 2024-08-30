const LOCAL = true;
const SERVER = LOCAL ? "http://127.0.0.1:5000" : ""; // Consider using an environment variable for the production server

async function handleResponse(response) {
  if (response.ok) {
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    } else {
      const text = await response.text();
      console.warn('Received non-JSON response:', text);
      return null;
    }
  } else {
    const errorText = await response.text();
    console.error(`HTTP error! status: ${response.status}`, errorText);
    return null;
  }
}

export async function getUserPlan(userId) {
  try {
    const response = await fetch(`${SERVER}/api/users/${userId}/plan`);
    return await handleResponse(response);
  } catch (error) {
    console.error('Error fetching user plan:', error);
    return null;
  }
}

export async function getUserPossibilities(userId) {
  try {
    const response = await fetch(`${SERVER}/api/users/${userId}/possibilities`);
    return await handleResponse(response);
  } catch (error) {
    console.error('Error fetching user possibilities:', error);
    return null;
  }
}

export async function addMealToUserPlan(userId, meal) {
const data = {
    meal_id:meal.id
    };

    try {
    const response = await fetch(`${SERVER}/api/users/${userId}/plan`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    return await handleResponse(response);
  } catch (error) {
    console.error('Error adding meal to user plan:', error);
    return null;
  }
}