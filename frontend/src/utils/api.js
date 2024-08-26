export async function getUserPlan(userId) {
    // Implement the logic to fetch the user's weekly plan from the backend
    // and return the data
  }
  
  var LOCAL = true;
  var server = ""

  export async function getUserPossibilities(userId) {
//     // Implement the logic to fetch the user's weekly options from the backend
//     // and return the data
//   }

//   async function fetchDataById(id) {
    try {
        if (LOCAL){
            server="http://127.0.0.1:5000"
        }
        const response = await fetch(`${server}/api/users/${userId}/possibilities`);
                // Check if the response is OK and is JSON
                if (response.ok && response.headers.get('content-type').includes('application/json')) {
                    const data = await response.json();
                    return data;
                } else {
                    const other_text = await response.text()
                    console.warn(other_text)
                    console.error('Received non-JSON response:', response);
                    return null;
                }

        //REGULAR CODE
        // if (!response.ok) {
        //     throw new Error(`HTTP error! status: ${response.status}`);
        // }
        // const data = await response.json();
        // return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

  
export async function addMealToUserPlan(userId, meal) {
const data = {
    meal_id:meal.id
    };

    try {
    const response = await fetch(`${server}/api/users/${userId}/plan`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Success:', result);
    } catch (error) {
    console.error('Error:', error);
    }
};

  