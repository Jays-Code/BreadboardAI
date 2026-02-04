import { html, css, LitElement } from 'lit';

export class BreadboardViewer extends LitElement {
    static properties = {
        board: { type: Object, state: true },
        loading: { type: Boolean, state: true },
        error: { type: String, state: true }
    };

    static styles = css`
        :host {
            display: block;
            width: 100%;
            height: 100vh;
            overflow-y: auto;
            background: #f5f5f5;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        .header {
            background: linear-gradient(90deg, #4f46e5 0%, #7c3aed 100%);
            color: white;
            padding: 20px 30px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        h1 {
            margin: 0 0 8px 0;
            font-size: 1.8em;
            font-weight: 600;
        }
        
        .description {
            opacity: 0.95;
            font-size: 0.95em;
        }
        
        .container {
            padding: 30px;
            max-width: 1400px;
            margin: 0 auto;
        }
        
        .board-info {
            background: white;
            border-radius: 12px;
            padding: 25px;
            margin-bottom: 25px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        
        .stat-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }
        
        .stat {
            background: #f8fafc;
            padding: 15px;
            border-radius: 8px;
            border-left: 4px solid #4f46e5;
        }
        
        .stat-label {
            font-size: 0.85em;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 5px;
        }
        
        .stat-value {
            font-size: 1.5em;
            font-weight: 600;
            color: #1e293b;
        }
        
        .nodes-list {
            background: white;
            border-radius: 12px;
            padding: 25px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        
        .nodes-list h2 {
            margin: 0 0 20px 0;
            color: #1e293b;
            font-size: 1.3em;
        }
        
        .node-card {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 12px;
            transition: all 0.2s;
        }
        
        .node-card:hover {
            border-color: #4f46e5;
            box-shadow: 0 2px 8px rgba(79, 70, 229, 0.15);
        }
        
        .node-header {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 8px;
        }
        
        .node-id {
            font-weight: 600;
            color: #1e293b;
            font-family: 'Monaco', 'Courier New', monospace;
            font-size: 0.95em;
        }
        
        .node-type {
            background: #4f46e5;
            color: white;
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 0.8em;
            font-weight: 500;
        }
        
        .node-metadata {
            color: #64748b;
            font-size: 0.9em;
            margin-top: 8px;
        }
        
        .empty-state {
            text-align: center;
            padding: 60px 20px;
            color: #94a3b8;
        }
        
        .empty-state h2 {
            color: #64748b;
            font-size: 1.5em;
            margin-bottom: 10px;
        }
        
        .loading {
            text-align: center;
            padding: 60px 20px;
        }
        
        .spinner {
            border: 4px solid #f3f4f6;
            border-top: 4px solid #4f46e5;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            animation: spin 1s linear infinite;
            margin: 0 auto 20px;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .error {
            background: #fef2f2;
            border: 1px solid #fecaca;
            border-radius: 12px;
            padding: 20px;
            margin: 20px 0;
            color: #991b1b;
        }
    `;

    constructor() {
        super();
        this.board = null;
        this.loading = false;
        this.error = null;
    }

    async connectedCallback() {
        super.connectedCallback();
        console.log('[BreadboardViewer] Connected!');

        const params = new URLSearchParams(window.location.search);
        const tab0 = params.get('tab0');

        if (tab0) {
            await this.loadBoard(tab0);
        } else {
            await this.loadBoard('/boards/prompt-to-post.bgl.json');
        }
    }

    async loadBoard(url) {
        this.loading = true;
        this.error = null;

        try {
            console.log('[BreadboardViewer] Loading board from:', url);
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Failed to load board: ' + response.statusText);
            }

            this.board = await response.json();
            console.log('[BreadboardViewer] Board loaded successfully:', this.board.title);
        } catch (e) {
            console.error('[BreadboardViewer] Error loading board:', e);
            this.error = e instanceof Error ? e.message : String(e);
        } finally {
            this.loading = false;
        }
    }

    render() {
        if (this.loading) {
            return html`
                <div class="loading">
                    <div class="spinner"></div>
                    <p>Loading board...</p>
                </div>
            `;
        }

        if (this.error) {
            return html`
                <div class="error">
                    <strong>Error Loading Board</strong>
                    <p>${this.error}</p>
                </div>
            `;
        }

        if (!this.board) {
            return html`
                <div class="empty-state">
                    <h2>No Board Loaded</h2>
                    <p>Add ?tab0=/boards/your-board.bgl.json to the URL to load a board</p>
                </div>
            `;
        }

        const nodes = Object.entries(this.board.nodes || {});
        const edges = (this.board.edges && this.board.edges.length) || 0;

        return html`
            <div class="header">
                <h1>${this.board.title || 'Untitled Board'}</h1>
                <div class="description">${this.board.description || 'No description'}</div>
            </div>
            
            <div class="container">
                <div class="board-info">
                    <div class="stat-grid">
                        <div class="stat">
                            <div class="stat-label">Nodes</div>
                            <div class="stat-value">${nodes.length}</div>
                        </div>
                        <div class="stat">
                            <div class="stat-label">Edges</div>
                            <div class="stat-value">${edges}</div>
                        </div>
                        <div class="stat">
                            <div class="stat-label">Version</div>
                            <div class="stat-value">${this.board.version || 'N/A'}</div>
                        </div>
                        <div class="stat">
                            <div class="stat-label">Status</div>
                            <div class="stat-value">OK Loaded</div>
                        </div>
                    </div>
                </div>
                
                <div class="nodes-list">
                    <h2>Board Nodes (${nodes.length})</h2>
                    ${nodes.length > 0 ? nodes.map(([id, node]) => html`
                        <div class="node-card">
                            <div class="node-header">
                                <div class="node-id">${id}</div>
                                <div class="node-type">${node.type}</div>
                            </div>
                            ${node.configuration && node.configuration.description ? html`
                                <div class="node-metadata">${node.configuration.description}</div>
                            ` : ''}
                        </div>
                    `) : html`
                        <p>No nodes in this board</p>
                    `}
                </div>
            </div>
        `;
    }
}

customElements.define('breadboard-viewer', BreadboardViewer);
