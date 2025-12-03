/**
 * WarkAI Knowledge Crawler
 * Automatically crawl and update knowledge base from web sources
 * Based on Crawl4AI principles
 */

class KnowledgeCrawler {
    constructor() {
        this.crawlHistory = JSON.parse(localStorage.getItem('crawl_history') || '[]');
        this.knowledgeCache = JSON.parse(localStorage.getItem('knowledge_cache') || '{}');
        this.sources = [
            {
                name: 'WarkAI Official',
                url: 'https://warkai.com',
                category: 'official',
                updateInterval: 86400000 // 24 hours
            },
            {
                name: 'Tech News',
                url: 'https://techcrunch.com',
                category: 'news',
                updateInterval: 3600000 // 1 hour
            },
            {
                name: 'AI Research',
                url: 'https://arxiv.org',
                category: 'research',
                updateInterval: 604800000 // 7 days
            }
        ];
    }

    /**
     * Crawl a single source
     */
    async crawlSource(source) {
        try {
            const response = await fetch(source.url, {
                method: 'GET',
                headers: {
                    'User-Agent': 'WarkAI-KnowledgeCrawler/1.0'
                }
            });

            if (!response.ok) {
                console.error(`Failed to crawl ${source.name}: ${response.status}`);
                return null;
            }

            const html = await response.text();
            const content = this.extractContent(html, source.category);

            return {
                source: source.name,
                url: source.url,
                category: source.category,
                content: content,
                crawledAt: new Date().toISOString(),
                status: 'success'
            };
        } catch (error) {
            console.error(`Error crawling ${source.name}:`, error);
            return {
                source: source.name,
                url: source.url,
                category: source.category,
                error: error.message,
                crawledAt: new Date().toISOString(),
                status: 'error'
            };
        }
    }

    /**
     * Extract relevant content based on category
     */
    extractContent(html, category) {
        // Remove scripts and styles
        let content = html
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
            .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');

        // Extract text content
        const parser = new DOMParser();
        let doc;
        try {
            doc = parser.parseFromString(content, 'text/html');
        } catch (e) {
            // Fallback: simple regex extraction
            return this.extractTextRegex(content);
        }

        // Extract main content
        let mainContent = '';
        
        // Try common content containers
        const contentSelectors = [
            'article',
            'main',
            '[role="main"]',
            '.content',
            '.post-content',
            '.entry-content'
        ];

        for (const selector of contentSelectors) {
            const element = doc.querySelector(selector);
            if (element) {
                mainContent = element.innerText;
                break;
            }
        }

        // Fallback to body if no main content found
        if (!mainContent) {
            const body = doc.querySelector('body');
            mainContent = body ? body.innerText : '';
        }

        // Extract key information based on category
        const extracted = {
            text: mainContent.substring(0, 5000), // Limit to 5000 chars
            title: doc.querySelector('title')?.innerText || '',
            headings: Array.from(doc.querySelectorAll('h1, h2, h3'))
                .map(h => h.innerText)
                .slice(0, 10),
            links: Array.from(doc.querySelectorAll('a[href]'))
                .map(a => ({
                    text: a.innerText,
                    href: a.href
                }))
                .slice(0, 20)
        };

        return extracted;
    }

    /**
     * Fallback text extraction using regex
     */
    extractTextRegex(html) {
        // Remove HTML tags
        let text = html.replace(/<[^>]*>/g, '');
        // Decode HTML entities
        text = text
            .replace(/&nbsp;/g, ' ')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&amp;/g, '&');
        // Clean up whitespace
        text = text.replace(/\s+/g, ' ').trim();
        
        return {
            text: text.substring(0, 5000),
            title: '',
            headings: [],
            links: []
        };
    }

    /**
     * Process crawled content and update knowledge base
     */
    processContent(crawlResult) {
        if (crawlResult.status === 'error') {
            return null;
        }

        const processed = {
            source: crawlResult.source,
            category: crawlResult.category,
            title: crawlResult.content.title,
            summary: this.generateSummary(crawlResult.content.text),
            keywords: this.extractKeywords(crawlResult.content.text),
            crawledAt: crawlResult.crawledAt,
            links: crawlResult.content.links
        };

        return processed;
    }

    /**
     * Generate summary from text
     */
    generateSummary(text) {
        // Split into sentences
        const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
        
        // Take first 3 sentences as summary
        return sentences
            .slice(0, 3)
            .join(' ')
            .trim()
            .substring(0, 500);
    }

    /**
     * Extract keywords from text
     */
    extractKeywords(text) {
        // Simple keyword extraction: split by spaces and filter common words
        const commonWords = new Set([
            'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
            'of', 'with', 'by', 'from', 'up', 'about', 'into', 'through', 'during',
            '是', '的', '在', '和', '了', '有', '一', '这', '不', '人', '中',
            'が', 'を', 'に', 'は', 'の', 'で', 'と', 'も', 'から', 'まで'
        ]);

        const words = text
            .toLowerCase()
            .split(/\s+/)
            .filter(word => {
                return word.length > 3 && !commonWords.has(word);
            });

        // Count word frequency
        const frequency = {};
        words.forEach(word => {
            frequency[word] = (frequency[word] || 0) + 1;
        });

        // Get top 10 keywords
        return Object.entries(frequency)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .map(([word]) => word);
    }

    /**
     * Check if source needs update
     */
    needsUpdate(source) {
        const lastCrawl = this.crawlHistory.find(h => h.source === source.name);
        if (!lastCrawl) return true;

        const lastCrawlTime = new Date(lastCrawl.crawledAt).getTime();
        const now = new Date().getTime();
        
        return (now - lastCrawlTime) > source.updateInterval;
    }

    /**
     * Crawl all sources
     */
    async crawlAll() {
        const results = [];
        
        for (const source of this.sources) {
            if (this.needsUpdate(source)) {
                const crawlResult = await this.crawlSource(source);
                if (crawlResult) {
                    const processed = this.processContent(crawlResult);
                    if (processed) {
                        results.push(processed);
                        this.cacheKnowledge(processed);
                    }
                    this.crawlHistory.push(crawlResult);
                }
            }
        }

        // Save history
        localStorage.setItem('crawl_history', JSON.stringify(this.crawlHistory));
        
        return results;
    }

    /**
     * Cache knowledge for quick access
     */
    cacheKnowledge(knowledge) {
        const key = `${knowledge.source}_${knowledge.category}`;
        this.knowledgeCache[key] = knowledge;
        localStorage.setItem('knowledge_cache', JSON.stringify(this.knowledgeCache));
    }

    /**
     * Get cached knowledge
     */
    getCachedKnowledge(source = null, category = null) {
        if (source && category) {
            const key = `${source}_${category}`;
            return this.knowledgeCache[key] || null;
        }

        return Object.values(this.knowledgeCache);
    }

    /**
     * Search knowledge base
     */
    search(query) {
        const results = [];
        const lowerQuery = query.toLowerCase();

        for (const [key, knowledge] of Object.entries(this.knowledgeCache)) {
            let score = 0;

            // Check title
            if (knowledge.title.toLowerCase().includes(lowerQuery)) {
                score += 10;
            }

            // Check summary
            if (knowledge.summary.toLowerCase().includes(lowerQuery)) {
                score += 5;
            }

            // Check keywords
            if (knowledge.keywords.some(k => k.includes(lowerQuery))) {
                score += 3;
            }

            if (score > 0) {
                results.push({
                    ...knowledge,
                    relevance: score
                });
            }
        }

        // Sort by relevance
        return results.sort((a, b) => b.relevance - a.relevance);
    }

    /**
     * Get crawler status
     */
    getStatus() {
        return {
            totalSources: this.sources.length,
            cachedItems: Object.keys(this.knowledgeCache).length,
            lastCrawlTime: this.crawlHistory.length > 0 
                ? this.crawlHistory[this.crawlHistory.length - 1].crawledAt 
                : null,
            crawlHistory: this.crawlHistory.slice(-10) // Last 10 crawls
        };
    }

    /**
     * Clear cache
     */
    clearCache() {
        this.knowledgeCache = {};
        localStorage.setItem('knowledge_cache', JSON.stringify(this.knowledgeCache));
    }

    /**
     * Export knowledge base
     */
    exportKnowledge() {
        return {
            cache: this.knowledgeCache,
            history: this.crawlHistory,
            exportedAt: new Date().toISOString()
        };
    }
}

// Initialize globally
window.knowledgeCrawler = new KnowledgeCrawler();

// Auto-crawl on page load (non-blocking)
window.addEventListener('load', () => {
    setTimeout(() => {
        window.knowledgeCrawler.crawlAll().catch(err => {
            console.error('Auto-crawl failed:', err);
        });
    }, 5000); // Wait 5 seconds after page load
});
