const API_URL = process.env.API_URL || 'http://localhost:3000/api';

// Charger les utilisateurs au démarrage
document.addEventListener('DOMContentLoaded', () => {
    loadUsers();
    
    // Gestionnaire du formulaire
    document.getElementById('userForm').addEventListener('submit', handleSubmit);
});

// Charger tous les utilisateurs
async function loadUsers() {
    try {
        const response = await fetch(`${API_URL}/users`);
        const users = await response.json();
        displayUsers(users);
    } catch (error) {
        console.error('Erreur lors du chargement des utilisateurs:', error);
    }
}

// Afficher les utilisateurs
function displayUsers(users) {
    const usersList = document.getElementById('usersList');
    
    if (users.length === 0) {
        usersList.innerHTML = '<p>Aucun utilisateur trouvé</p>';
        return;
    }
    
    usersList.innerHTML = users.map(user => `
        <div class="user-card" data-id="${user.id}">
            <h3>${user.name}</h3>
            <p>${user.email}</p>
            <div class="actions">
                <button class="edit-btn" onclick="editUser(${user.id})">Modifier</button>
                <button class="delete-btn" onclick="deleteUser(${user.id})">Supprimer</button>
            </div>
        </div>
    `).join('');
}

// Gérer la soumission du formulaire
async function handleSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    
    try {
        const response = await fetch(`${API_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email })
        });
        
        if (response.ok) {
            document.getElementById('userForm').reset();
            loadUsers();
        } else {
            const error = await response.json();
            alert(`Erreur: ${error.error}`);
        }
    } catch (error) {
        console.error('Erreur lors de l\'ajout:', error);
        alert('Erreur lors de l\'ajout de l\'utilisateur');
    }
}

// Supprimer un utilisateur
async function deleteUser(id) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/users/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            loadUsers();
        } else {
            alert('Erreur lors de la suppression');
        }
    } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        alert('Erreur lors de la suppression');
    }
}

// Modifier un utilisateur
async function editUser(id) {
    const newName = prompt('Nouveau nom:');
    if (!newName) return;
    
    const newEmail = prompt('Nouvel email:');
    if (!newEmail) return;
    
    try {
        const response = await fetch(`${API_URL}/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: newName, email: newEmail })
        });
        
        if (response.ok) {
            loadUsers();
        } else {
            alert('Erreur lors de la modification');
        }
    } catch (error) {
        console.error('Erreur lors de la modification:', error);
        alert('Erreur lors de la modification');
    }
}