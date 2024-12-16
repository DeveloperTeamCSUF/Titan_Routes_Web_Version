// favorites.js
// This file handles favorites logic only, assuming:
// - `auth` for authentication
// - `db` for Firestore
// - `directions` for Mapbox Directions
// are defined globally in main.html.

// Helper function to remove a favorite

window.favoritesMap = {};

async function removeFavorite(userFavoritesRef, title) {
    try {
        await userFavoritesRef.doc(title).delete();
        delete window.favoritesMap[title];
        displayFavorites(); // Refresh after removal
    } catch (error) {
        console.error('Error removing favorite:', error.message);
        alert('Failed to remove favorite. Please try again.');
    }
}

// Helper function to create a favorite list item
function createFavoriteListItem(location, userFavoritesRef) {
    const li = document.createElement('li');
    li.textContent = location.title;

    // Navigate button
    const navigateBtn = document.createElement('button');
    navigateBtn.textContent = 'Navigate';
    navigateBtn.onclick = () => {
        const coords = [location.lon, location.lat];
        directions.setDestination(coords);
    };

    // Remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.onclick = () => removeFavorite(userFavoritesRef, location.title);

    li.appendChild(navigateBtn);
    li.appendChild(removeBtn);
    return li;
}

async function saveToFavorites(location) {
    const user = auth.currentUser;
    if (!user || user.isAnonymous) {
        alert('You must be signed in to save favorites.');
        return;
    }

    const userDocRef = db.collection('users').doc(user.uid);
    try {
        // Set the location title field to true in the favorites map
        await userDocRef.set({
            favorites: {
                [location.title]: true
            }
        }, { merge: true });

        alert(`${location.title} has been added to your favorites.`);
    } catch (error) {
        console.error('Error saving favorite to Firebase:', error.message);
        alert('Failed to save favorite. Check Firestore rules and authentication.');
    }
}


async function displayFavorites() {
    const favoritesList = document.getElementById('favoritesList');
    favoritesList.innerHTML = '';

    const user = auth.currentUser;
    if (!user || user.isAnonymous) {
        favoritesList.innerHTML = '<li>You must be signed in to view favorites.</li>';
        document.getElementById('favoritesModal').style.display = 'block';
        return;
    }

    const userDocRef = db.collection('users').doc(user.uid);
    try {
        const userDoc = await userDocRef.get();
        if (!userDoc.exists || !userDoc.data().favorites) {
            favoritesList.innerHTML = '<li>No favorites saved yet.</li>';
        } else {
            const favoritesMap = userDoc.data().favorites;
            window.favoritesMap = favoritesMap; 
            const favoriteLocations = Object.keys(favoritesMap).filter(title => favoritesMap[title]);

            if (favoriteLocations.length === 0) {
                favoritesList.innerHTML = '<li>No favorites saved yet.</li>';
            } else {
                favoriteLocations.forEach((title) => {
                    const li = document.createElement('li');
                    li.textContent = title;

                    // Navigate button
                    const navigateBtn = document.createElement('button');
                    navigateBtn.textContent = 'Navigate';
                    navigateBtn.onclick = () => {
                        // You must have location data (lat/lon) stored somewhere accessible
                        // For this approach, consider storing allLocations or retrieving lat/lon from another source
                        const locationData = allLocations.find(loc => loc.title === title);
                        if (locationData) {
                            const coords = [locationData.lon, locationData.lat];
                            directions.setDestination(coords);
                        } else {
                            alert('Location details not found.');
                        }
                    };

                    // Remove button sets the field to false or deletes it
                    const removeBtn = document.createElement('button');
                    removeBtn.textContent = 'Remove';
                    removeBtn.onclick = async () => {
                        try {
                            // Set the favorite to false or remove the field entirely
                            await userDocRef.set({
                                favorites: {
                                    [title]: firebase.firestore.FieldValue.delete()
                                }
                            }, { merge: true });
                            displayFavorites();
                        } catch (error) {
                            console.error('Error removing favorite:', error.message);
                            alert('Failed to remove favorite. Please try again.');
                        }
                    };

                    li.appendChild(navigateBtn);
                    li.appendChild(removeBtn);
                    favoritesList.appendChild(li);
                });
            }
        }
    } catch (error) {
        console.error('Error fetching favorites:', error.message);
        favoritesList.innerHTML = '<li>Error loading favorites. Please try again later.</li>';
    }

    document.getElementById('favoritesModal').style.display = 'block';
}


// Close Favorites Modal
document.getElementById('closeFavorites').addEventListener('click', () => {
    document.getElementById('favoritesModal').style.display = 'none';
});
