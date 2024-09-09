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
        return null;  // Return null for non-JSON responses
        }
    } else {
        const errorText = await response.text();
        switch (response.status) {
        case 404:
            console.warn('Resource not found (404). Returning empty response.');
            return {};  // Return an empty object for 404 Not Found
        case 403:
        case 401:
            showAuthPopup();  // Handle authentication errors by showing a popup
            break;
        default:
            console.error(`HTTP error! status: ${response.status}`, errorText);
        }
        return null;  // Return null for errors
    }
}

function showAuthPopup() {
    alert('Authentication error. Please log in again.');  // Placeholder for better UI handling
}

export async function getUserPlan(userId) {
  try {
    const response = await fetch(`${SERVER}/api/users/${userId}/plan`);
    return await handleResponse(response);
  } catch (error) {
    console.error('Error fetching user plan:', error);
    return {};
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

export async function addMealToUserPlan(userId, meal,day,mealtime) {
const data = {
    meal_id:meal.id,
    day
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