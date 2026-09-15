// DOM Elements
const memberForm = document.getElementById('memberForm');
const fullNameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const cityInput = document.getElementById('city');
const countryInput = document.getElementById('country');
const roleInput = document.getElementById('role');
const organizationInput = document.getElementById('organization');
const experienceInput = document.getElementById('experience');
const skillsInput = document.getElementById('skills');
const bioInput = document.getElementById('bio');
const passwordInput = document.getElementById('password');

const togglePasswordBtn = document.getElementById('togglePasswordBtn');
const toggleIcon = document.getElementById('toggleIcon');
const submitBtn = document.getElementById('submitBtn');
const btnSpinner = document.getElementById('btnSpinner');

const profilesGrid = document.getElementById('profilesGrid');
const memberCountBadge = document.getElementById('memberCountBadge');
const loadingState = document.getElementById('loadingState');
const emptyState = document.getElementById('emptyState');
const refreshBtn = document.getElementById('refreshBtn');
const refreshIcon = document.getElementById('refreshIcon');
const toastContainer = document.getElementById('toastContainer');

// On Page Load
document.addEventListener('DOMContentLoaded', () => {
    fetchAndRenderMembers();
});

// Toggle Password Visibility
togglePasswordBtn.addEventListener('click', () => {
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';
    toggleIcon.className = isPassword ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye';
});

// Refresh Directory
refreshBtn.addEventListener('click', () => {
    refreshIcon.classList.add('fa-spin');
    fetchAndRenderMembers().finally(() => {
        setTimeout(() => refreshIcon.classList.remove('fa-spin'), 600);
    });
});

// Handle Form Submission
memberForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const payload = {
        fullName: fullNameInput.value.trim(),
        email: emailInput.value.trim(),
        phone: phoneInput.value.trim(),
        city: cityInput.value.trim(),
        country: countryInput.value.trim() || 'Pakistan',
        role: roleInput.value.trim(),
        organization: organizationInput.value.trim(),
        experience: experienceInput.value,
        skills: skillsInput.value.trim(),
        bio: bioInput.value.trim(),
        password: passwordInput.value
    };

    // Client-side quick check
    if (!payload.fullName || !payload.email || !payload.phone || !payload.city || !payload.role || !payload.organization || !payload.password) {
        showToast('Please fill in all required fields marked with *', 'error');
        return;
    }

    setFormLoading(true);

    try {
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (response.ok && result.success) {
            showToast('Member registered successfully and stored in MongoDB!', 'success');
            memberForm.reset();
            countryInput.value = 'Pakistan';
            passwordInput.type = 'password';
            toggleIcon.className = 'fa-regular fa-eye';

            // Refresh directory immediately on same page
            await fetchAndRenderMembers();

            // Smooth scroll down to profiles directory
            const profilesSection = document.getElementById('profilesSection');
            if (profilesSection) {
                profilesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        } else {
            showToast(result.message || 'Failed to register member', 'error');
        }
    } catch (error) {
        console.error('Registration error:', error);
        showToast('Network or server connection error', 'error');
    } finally {
        setFormLoading(false);
    }
});

// Fetch all members from MongoDB
async function fetchAndRenderMembers() {
    try {
        const response = await fetch('/api/users');
        const result = await response.json();

        loadingState.classList.add('hidden');

        if (response.ok && result.success) {
            const members = result.data || [];
            updateCountBadge(members.length);

            if (members.length === 0) {
                profilesGrid.innerHTML = '';
                emptyState.classList.remove('hidden');
            } else {
                emptyState.classList.add('hidden');
                renderMemberList(members);
            }
        } else {
            showToast('Failed to load member records', 'error');
        }
    } catch (error) {
        loadingState.classList.add('hidden');
        console.error('Fetch error:', error);
        showToast('Unable to load directory from server', 'error');
    }
}

// Render Member Cards in the Grid
function renderMemberList(members) {
    profilesGrid.innerHTML = '';

    members.forEach((member) => {
        const card = document.createElement('div');
        card.className = 'member-card';

        const name = member.fullName || 'Anonymous Member';
        const initials = getInitials(name);
        
        // Skills formatting
        let skillsHtml = '';
        if (member.skills && member.skills.length > 0) {
            const skillChips = member.skills
                .map(skill => `<span class="skill-chip">${escapeHtml(skill)}</span>`)
                .join('');
            skillsHtml = `
                <div class="skills-wrap">
                    <div class="skills-label">Skills & Tech Stack</div>
                    <div class="skills-chips">${skillChips}</div>
                </div>
            `;
        }

        // Bio formatting
        let bioHtml = '';
        if (member.bio && member.bio.trim() !== '') {
            bioHtml = `<div class="bio-box">"${escapeHtml(member.bio)}"</div>`;
        }

        const formattedDate = member.createdAt
            ? new Date(member.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })
            : 'Recent';

        card.innerHTML = `
            <div>
                <div class="member-card-header">
                    <div class="avatar">${escapeHtml(initials)}</div>
                    <div class="member-title-box">
                        <h3>${escapeHtml(name)}</h3>
                        <div class="member-role">${escapeHtml(member.role || 'Member')}</div>
                        <span class="verified-pill">
                            <i class="fa-solid fa-circle-check"></i> Verified Member
                        </span>
                    </div>
                </div>

                <div class="member-details">
                    <div class="detail-row">
                        <i class="fa-regular fa-building"></i>
                        <span class="highlight-text">${escapeHtml(member.organization || 'Not Specified')}</span>
                    </div>
                    <div class="detail-row">
                        <i class="fa-solid fa-location-dot"></i>
                        <span>${escapeHtml(member.city || '')}${member.country ? ', ' + escapeHtml(member.country) : ''}</span>
                    </div>
                    <div class="detail-row">
                        <i class="fa-solid fa-chart-line"></i>
                        <span class="exp-tag">${escapeHtml(member.experience || 'Junior')}</span>
                    </div>
                    <div class="detail-row">
                        <i class="fa-regular fa-envelope"></i>
                        <span>${escapeHtml(member.email)}</span>
                    </div>
                    ${member.phone ? `
                    <div class="detail-row">
                        <i class="fa-solid fa-phone"></i>
                        <span>${escapeHtml(member.phone)}</span>
                    </div>` : ''}
                </div>

                ${skillsHtml}
                ${bioHtml}
            </div>

            <div class="card-footer">
                <span><i class="fa-regular fa-calendar"></i> Joined ${formattedDate}</span>
                <button class="btn-card-delete" onclick="deleteMember('${member._id}')" title="Delete profile">
                    <i class="fa-regular fa-trash-can"></i> Delete
                </button>
            </div>
        `;

        profilesGrid.appendChild(card);
    });
}

// Delete Member
window.deleteMember = async function(id) {
    if (!confirm('Are you sure you want to delete this member profile from MongoDB?')) return;

    try {
        const response = await fetch(`/api/users/${id}`, {
            method: 'DELETE'
        });
        const result = await response.json();

        if (response.ok && result.success) {
            showToast('Member profile removed from MongoDB', 'success');
            await fetchAndRenderMembers();
        } else {
            showToast(result.message || 'Failed to delete record', 'error');
        }
    } catch (error) {
        console.error('Delete error:', error);
        showToast('Error removing record', 'error');
    }
};

// Helper to extract initials
function getInitials(name) {
    const parts = name.trim().split(' ').filter(p => p.length > 0);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// Update count badge
function updateCountBadge(count) {
    memberCountBadge.textContent = `${count} Registered Member${count === 1 ? '' : 's'}`;
}

// Form loading state toggle
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

// Toast notification display
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
    }, 4000);
}

// Escape HTML for XSS prevention
function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
