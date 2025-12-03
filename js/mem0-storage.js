/**
 * Mem0 Storage System - User Information Management
 * Provides persistent storage for user profiles and preferences
 */

class Mem0Storage {
    constructor() {
        this.storageKey = 'warkai_user_profile';
        this.memoryKey = 'warkai_memories';
        this.initializeStorage();
    }

    /**
     * Initialize storage with default structure
     */
    initializeStorage() {
        if (!localStorage.getItem(this.storageKey)) {
            const defaultProfile = {
                id: this.generateId(),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                personalInfo: {
                    name: '',
                    email: '',
                    phone: '',
                    company: '',
                    position: '',
                    industry: ''
                },
                preferences: {
                    language: localStorage.getItem('preferredLanguage') || 'zh',
                    theme: 'dark',
                    notifications: true,
                    newsletter: false
                },
                interests: [],
                savedItems: [],
                activityLog: []
            };
            localStorage.setItem(this.storageKey, JSON.stringify(defaultProfile));
        }

        if (!localStorage.getItem(this.memoryKey)) {
            localStorage.setItem(this.memoryKey, JSON.stringify([]));
        }
    }

    /**
     * Generate unique ID
     */
    generateId() {
        return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    /**
     * Get user profile
     */
    getProfile() {
        const profile = localStorage.getItem(this.storageKey);
        return profile ? JSON.parse(profile) : null;
    }

    /**
     * Update user profile
     */
    updateProfile(updates) {
        const profile = this.getProfile();
        if (profile) {
            Object.assign(profile, updates);
            profile.updatedAt = new Date().toISOString();
            localStorage.setItem(this.storageKey, JSON.stringify(profile));
            this.addMemory(`Updated profile: ${Object.keys(updates).join(', ')}`);
            return profile;
        }
        return null;
    }

    /**
     * Update personal information
     */
    updatePersonalInfo(info) {
        const profile = this.getProfile();
        if (profile) {
            profile.personalInfo = { ...profile.personalInfo, ...info };
            profile.updatedAt = new Date().toISOString();
            localStorage.setItem(this.storageKey, JSON.stringify(profile));
            this.addMemory(`Updated personal information: ${info.name || 'User'}`);
            return profile;
        }
        return null;
    }

    /**
     * Update preferences
     */
    updatePreferences(prefs) {
        const profile = this.getProfile();
        if (profile) {
            profile.preferences = { ...profile.preferences, ...prefs };
            profile.updatedAt = new Date().toISOString();
            localStorage.setItem(this.storageKey, JSON.stringify(profile));
            this.addMemory(`Updated preferences`);
            return profile;
        }
        return null;
    }

    /**
     * Add interest/tag
     */
    addInterest(interest) {
        const profile = this.getProfile();
        if (profile && !profile.interests.includes(interest)) {
            profile.interests.push(interest);
            profile.updatedAt = new Date().toISOString();
            localStorage.setItem(this.storageKey, JSON.stringify(profile));
            this.addMemory(`Added interest: ${interest}`);
            return profile;
        }
        return profile;
    }

    /**
     * Remove interest/tag
     */
    removeInterest(interest) {
        const profile = this.getProfile();
        if (profile) {
            profile.interests = profile.interests.filter(i => i !== interest);
            profile.updatedAt = new Date().toISOString();
            localStorage.setItem(this.storageKey, JSON.stringify(profile));
            this.addMemory(`Removed interest: ${interest}`);
            return profile;
        }
        return null;
    }

    /**
     * Save item to collection
     */
    saveItem(item) {
        const profile = this.getProfile();
        if (profile) {
            const savedItem = {
                id: this.generateId(),
                ...item,
                savedAt: new Date().toISOString()
            };
            profile.savedItems.push(savedItem);
            profile.updatedAt = new Date().toISOString();
            localStorage.setItem(this.storageKey, JSON.stringify(profile));
            this.addMemory(`Saved item: ${item.title || 'Unknown'}`);
            return savedItem;
        }
        return null;
    }

    /**
     * Get saved items
     */
    getSavedItems() {
        const profile = this.getProfile();
        return profile ? profile.savedItems : [];
    }

    /**
     * Remove saved item
     */
    removeSavedItem(itemId) {
        const profile = this.getProfile();
        if (profile) {
            profile.savedItems = profile.savedItems.filter(item => item.id !== itemId);
            profile.updatedAt = new Date().toISOString();
            localStorage.setItem(this.storageKey, JSON.stringify(profile));
            this.addMemory(`Removed saved item`);
            return profile;
        }
        return null;
    }

    /**
     * Add memory (activity log)
     */
    addMemory(memory) {
        const memories = this.getMemories();
        const newMemory = {
            id: this.generateId(),
            content: memory,
            timestamp: new Date().toISOString(),
            type: 'action'
        };
        memories.push(newMemory);
        
        // Keep only last 100 memories
        if (memories.length > 100) {
            memories.shift();
        }
        
        localStorage.setItem(this.memoryKey, JSON.stringify(memories));
        return newMemory;
    }

    /**
     * Get all memories
     */
    getMemories() {
        const memories = localStorage.getItem(this.memoryKey);
        return memories ? JSON.parse(memories) : [];
    }

    /**
     * Get activity log
     */
    getActivityLog() {
        const profile = this.getProfile();
        return profile ? profile.activityLog : [];
    }

    /**
     * Export user data
     */
    exportData() {
        const profile = this.getProfile();
        const memories = this.getMemories();
        return {
            profile,
            memories,
            exportedAt: new Date().toISOString()
        };
    }

    /**
     * Import user data
     */
    importData(data) {
        if (data.profile) {
            localStorage.setItem(this.storageKey, JSON.stringify(data.profile));
        }
        if (data.memories) {
            localStorage.setItem(this.memoryKey, JSON.stringify(data.memories));
        }
        this.addMemory('Imported user data');
        return this.getProfile();
    }

    /**
     * Clear all data
     */
    clearAllData() {
        localStorage.removeItem(this.storageKey);
        localStorage.removeItem(this.memoryKey);
        this.initializeStorage();
    }

    /**
     * Get user summary for AI context
     */
    getUserSummary() {
        const profile = this.getProfile();
        if (!profile) return '';

        const { personalInfo, interests, preferences } = profile;
        return `
User Profile:
- Name: ${personalInfo.name || 'Not provided'}
- Email: ${personalInfo.email || 'Not provided'}
- Company: ${personalInfo.company || 'Not provided'}
- Position: ${personalInfo.position || 'Not provided'}
- Industry: ${personalInfo.industry || 'Not provided'}
- Interests: ${interests.length > 0 ? interests.join(', ') : 'None'}
- Preferred Language: ${preferences.language}
- Saved Items: ${profile.savedItems.length}
        `.trim();
    }
}

// Initialize Mem0 Storage globally
window.mem0 = new Mem0Storage();

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Mem0Storage;
}
