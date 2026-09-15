// DOM Elements
const userForm = document.getElementById('userForm');
const userNameInput = document.getElementById('userName');
const userEmailInput = document.getElementById('userEmail');
const userPasswordInput = document.getElementById('userPassword');
const togglePasswordBtn = document.getElementById('togglePasswordBtn');
const toggleIcon = document.getElementById('toggleIcon');
const submitBtn = document.getElementById('submitBtn');
const btnSpinner = document.getElementById('btnSpinner');

const recordsList = document.getElementById('recordsList');
const recordCounter = document.getElementById('recordCounter');
const loadingState = document.getElementById('loadingState');
const emptyState = document.getElementById('emptyState');
const refreshBtn = document.getElementById('refreshBtn');
const refreshIcon = document.getElementById('refreshIcon');
const toastContainer = document.getElementById('toastContainer');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    fetchAndRenderUsers();
});

// Toggle Password Visibility
togglePasswordBtn.addEventListener('click', () => {
    const isPassword = userPasswordInput.type === 'password';
    userPasswordInput.type = isPassword ? 'text' : 'password';
    toggleIcon.className = isPassword ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye';
});

// Refresh Button Event
refreshBtn.addEventListener('click', () => {
    refreshIcon.classList.add('fa-spin');
    fetchAndRenderUsers().finally(() => {
        setTimeout(() => refreshIcon.classList.remove('fa-spin'), 600);
    });
});

// Handle Form Submission
userForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = userNameInput.value.trim();
    const email = userEmailInput.value.trim();
    const password = userPasswordInput.value;

    if (!name || !email || !password) {
        showToast('Please fill in all fields', 'error');
        return;
    }

    // Set Loading state on button
    setFormLoading(true);

    try {
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });

        const result = await response.json();

        if (response.ok && result.success) {
            showToast(result.message || 'User saved and hashed securely!', 'success');
            userForm.reset();
            userPasswordInput.type = 'password';
            toggleIcon.className = 'fa-regular fa-eye';
            
            // Refresh list to immediately render new record on the same page
            await fetchAndRenderUsers();
        } else {
            showToast(result.message || 'Failed to save user', 'error');
        }
    } catch (error) {
        console.error('Error saving user:', error);
        showToast('Network or server error occurred', 'error');
    } finally {
        setFormLoading(false);
    }
});

// Fetch & Render Users from MongoDB
async function fetchAndRenderUsers() {
    try {
        const response = await fetch('/api/users');
        const result = await response.json();

        loadingState.classList.add('hidden');

        if (response.ok && result.success) {
            const users = result.data || [];
            updateRecordCounter(users.length);

            if (users.length === 0) {
                recordsList.innerHTML = '';
                emptyState.classList.remove('hidden');
            } else {
                emptyState.classList.add('hidden');
                renderUserList(users);
            }
        } else {
            showToast('Failed to load records from MongoDB', 'error');
        }
    } catch (error) {
        loadingState.classList.add('hidden');
        console.error('Error fetching users:', error);
        showToast('Could not connect to server', 'error');
    }
}

// Render User Cards
function renderUserList(users) {
    recordsList.innerHTML = '';

    users.forEach((user) => {
        const item = document.createElement('div');
        item.className = 'record-item';

        const initial = (user.name || 'U').charAt(0).toUpperCase();
        const formattedDate = user.createdAt 
            ? new Date(user.createdAt).toLocaleString(undefined, {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })
            : 'Just now';

        item.innerHTML = `
            <div class="record-top">
                <div class="user-identity">
                    <div class="user-avatar">${escapeHtml(initial)}</div>
                    <div class="user-names">
                        <h4>${escapeHtml(user.name)}</h4>
                        <span class="email">${escapeHtml(user.email)}</span>
                    </div>
                </div>
                <div class="record-actions">
                    <button class="btn-delete" title="Delete Record" onclick="deleteUser('${user._id}')">
                        <i class="fa-regular fa-trash-can"></i>
                    </button>
                </div>
            </div>

            <div class="hash-container">
                <div class="hash-label-row">
                    <span class="hash-badge">
                        <i class="fa-solid fa-lock"></i> Bcrypt Hash (Stored in DB)
                    </span>
                    <button class="copy-hash-btn" onclick="copyToClipboard('${escapeHtml(user.password)}', this)">
                        <i class="fa-regular fa-copy"></i> Copy Hash
                    </button>
                </div>
                <div class="hash-value">${escapeHtml(user.password)}</div>
            </div>

            <div class="record-footer">
                <span><i class="fa-regular fa-clock"></i> ${formattedDate}</span>
            </div>
        `;

        recordsList.appendChild(item);
    });
}

// Delete User Record
window.deleteUser = async function(id) {
    if (!confirm('Are you sure you want to delete this record from MongoDB?')) return;

    try {
        const response = await fetch(`/api/users/${id}`, {
            method: 'DELETE'
        });
        const result = await response.json();

        if (response.ok && result.success) {
            showToast('Record deleted successfully', 'success');
            await fetchAndRenderUsers();
        } else {
            showToast(result.message || 'Failed to delete record', 'error');
        }
    } catch (error) {
        console.error('Error deleting record:', error);
        showToast('Error deleting record', 'error');
    }
};

// Copy Hash to Clipboard
window.copyToClipboard = function(text, buttonElement) {
    navigator.clipboard.writeText(text).then(() => {
        const originalHTML = buttonElement.innerHTML;
        buttonElement.innerHTML = '<i class="fa-solid fa-check" style="color: #10b981;"></i> Copied!';
        setTimeout(() => {
            buttonElement.innerHTML = originalHTML;
        }, 1800);
    }).catch(err => {
        console.error('Copy failed:', err);
    });
};

// Update counter pill
function updateRecordCounter(count) {
    recordCounter.textContent = `${count} Record${count === 1 ? '' : 's'}`;
}

// Set form loading state
function setFormLoading(isLoading) {
    if (isLoading) {
        submitBtn.disabled = true;
        btnSpinner.classList.remove('hidden');
        submitBtn.querySelector('.btn-text').style.opacity = '0.5';
    } else {
        submitBtn.disabled = false;
        btnSpinner.classList.add('hidden');
        submitBtn.querySelector('.btn-text').style.opacity = '1';
    }
}

// Show Toast notification
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    const icon = type === 'success' 
        ? '<i class="fa-solid fa-circle-check"></i>' 
        : '<i class="fa-solid fa-circle-exclamation"></i>';

    toast.innerHTML = `${icon} <span>${escapeHtml(message)}</span>`;

    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

// Utility: Escape HTML to avoid XSS
function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
