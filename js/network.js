// ===================================
// Network Page JavaScript
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('teamSearch');
    const universityFilter = document.getElementById('universityFilter');
    const skillFilter = document.getElementById('skillFilter');
    const teamCards = document.querySelectorAll('.team-card');
    
    // Search Functionality
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            filterTeams();
        });
    }
    
    // University Filter
    if (universityFilter) {
        universityFilter.addEventListener('change', function() {
            filterTeams();
        });
    }
    
    // Skill Filter
    if (skillFilter) {
        skillFilter.addEventListener('change', function() {
            filterTeams();
        });
    }
    
    // Filter Teams Function
    function filterTeams() {
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        const selectedUniversity = universityFilter ? universityFilter.value : 'all';
        const selectedSkill = skillFilter ? skillFilter.value : 'all';
        
        let visibleCount = 0;
        
        teamCards.forEach(card => {
            const teamName = card.querySelector('.team-info h3').textContent.toLowerCase();
            const teamDescription = card.querySelector('.team-description').textContent.toLowerCase();
            const teamUniversity = card.getAttribute('data-university');
            const teamSkills = card.getAttribute('data-skills');
            
            // Check search term
            const matchesSearch = searchTerm === '' || 
                teamName.includes(searchTerm) || 
                teamDescription.includes(searchTerm);
            
            // Check university filter
            const matchesUniversity = selectedUniversity === 'all' || 
                teamUniversity === selectedUniversity;
            
            // Check skill filter
            const matchesSkill = selectedSkill === 'all' || 
                teamSkills.includes(selectedSkill);
            
            // Show or hide card
            if (matchesSearch && matchesUniversity && matchesSkill) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
                visibleCount++;
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
        
        // Show no results message if needed
        setTimeout(() => {
            if (visibleCount === 0) {
                showNoResultsMessage();
            } else {
                removeNoResultsMessage();
            }
        }, 350);
    }
    
    // Show No Results Message
    function showNoResultsMessage() {
        removeNoResultsMessage();
        
        const teamsGrid = document.getElementById('teamsGrid');
        const noResults = document.createElement('div');
        noResults.className = 'no-results';
        noResults.innerHTML = `
            <i class="fas fa-users-slash" style="font-size: 4rem; color: var(--primary-color); margin-bottom: 1rem;"></i>
            <h3>No Teams Found</h3>
            <p>Try adjusting your search or filters</p>
        `;
        noResults.style.cssText = `
            grid-column: 1 / -1;
            text-align: center;
            padding: 4rem 2rem;
            color: var(--gray-text);
        `;
        
        teamsGrid.appendChild(noResults);
    }
    
    // Remove No Results Message
    function removeNoResultsMessage() {
        const noResults = document.querySelector('.no-results');
        if (noResults) {
            noResults.remove();
        }
    }
});
