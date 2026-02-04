

// Mermaid will be loaded dynamically
let mermaid: any = null;

async function initMermaid() {
    try {
        const m = await import('mermaid');
        mermaid = m.default;
        mermaid.initialize({
            startOnLoad: false,
            theme: 'dark',
            securityLevel: 'loose'
        });
    } catch (e) {
        console.error("Failed to load mermaid", e);
    }
}

// Simple SPA Router
function getApp() {
    return document.getElementById('main-content');
}

async function loadBoards() {
    try {
        const response = await fetch('/api/boards.json');
        return await response.json();
    } catch (e) {
        console.error("Failed to load boards manifest", e);
        return [];
    }
}

async function renderHome() {
    const app = getApp();
    if (!app) return;

    app.innerHTML = '<h2>Available Boards</h2><div class="board-grid" id="grid">Loading...</div>';

    const boards = await loadBoards();
    const grid = document.getElementById('grid');

    if (grid) {
        grid.innerHTML = '';
        if (boards.length === 0) {
            grid.innerHTML = '<p>No boards found. Run <code>npm run sync-boards</code> (or serialize script) to generate them.</p>';
            return;
        }

        boards.forEach((board: any) => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <h3>${board.title}</h3>
                <p class="description" style="flex:1; margin-bottom:1rem; color:var(--text-secondary)">${board.description}</p>
                <div class="meta">
                    <span class="chip">${board.version}</span>
                    <span class="chip" style="background:rgba(3, 218, 198, 0.1); color:var(--success-color)">Ready</span>
                </div>
            `;
            card.onclick = () => {
                window.location.hash = `board/${board.slug}`;
            };
            grid.appendChild(card);
        });
    }
}

// Keep track of the current idMap for highlighting
let currentIdMap = new Map<string, string>();

// Keep track of all nodes for inspection
let currentNodes: any[] = [];

function formatNodeLabel(id: string) {
    // Strip trailing digits, dashes, and internal numeric IDs (e.g. directorFlow-0 -> Director Flow)
    const result = id.replace(/[-_]\d+$/, "") // Strip trailing -0, -1, etc.
        .replace(/([A-Z])/g, " $1") // Add space before capitals
        .replace(/[_-]/g, " ") // Replace remaining separators with spaces
        .replace(/\d+/g, "") // Remove any remaining digits
        .trim();
    return result.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function getNodeDescription(node: any) {
    if (node.configuration?.description) return node.configuration.description;

    const type = node.type?.toLowerCase() || '';
    if (type === 'input') return "Asks the user for necessary information to start the process.";
    if (type === 'output') return "Displays the final results and generated content.";
    if (type.includes('director')) return "The 'brain' of the board; coordinates logic and directs other components.";
    if (type.includes('captioner')) return "Creative engine that generates social media captions and post text.";
    if (type.includes('copywriter')) return "Drafting engine that writes high-quality scripts or long-form content.";
    if (type.includes('assembler')) return "Combines various outputs into a single, cohesive final package.";
    if (type.includes('llm') || type.includes('generate')) return "AI processing step that uses a language model to reason or create.";

    return "A functional step in the board's logic flow.";
}

function generateMermaidGraph(nodes: any[], edges: any[]) {
    let graph = 'graph TD\n';

    // Nodes
    currentIdMap.clear();
    nodes.forEach((node, index) => {
        const safeId = `n${index}`;
        currentIdMap.set(node.id, safeId);
        const rawLabel = node.configuration?.title || formatNodeLabel(node.id);
        const label = rawLabel.replace(/"/g, "'");
        graph += `    ${safeId}["${label}<br/><small>(${node.type})</small>"]\n`;
    });

    // Edges
    edges.forEach(edge => {
        const from = currentIdMap.get(edge.from);
        const to = currentIdMap.get(edge.to);
        if (from && to) {
            graph += `    ${from} -->|${edge.out || ''}| ${to}\n`;
        }
    });

    // Styling
    nodes.forEach((node, index) => {
        const safeId = `n${index}`;
        if (node.type === 'input') graph += `    class ${safeId} inputNode\n`;
        else if (node.type === 'output') graph += `    class ${safeId} outputNode\n`;
        else graph += `    class ${safeId} workerNode\n`;
    });

    graph += `    classDef inputNode fill:#2e3b4e,stroke:#03dac6,stroke-width:2px,color:#fff\n`;
    graph += `    classDef outputNode fill:#3e2e2e,stroke:#ffb74d,stroke-width:2px,color:#fff\n`;
    graph += `    classDef workerNode fill:#1f1f2e,stroke:#bb86fc,stroke-width:2px,color:#fff\n`;
    graph += `    classDef activeNode stroke:#fff,stroke-width:4px,stroke-dasharray: 5 5\n`;

    return graph;
}

async function renderBoardDetail(slug: string) {
    const app = getApp();
    if (!app) return;

    app.innerHTML = '<div style="text-align:center">Loading Board...</div>';

    try {
        const response = await fetch(`/api/${slug}.json`);
        const board = await response.json();
        currentNodes = board.nodes || [];
        const edges = board.edges || [];
        const inputs = currentNodes.filter((n: any) => n.type === 'input');

        const graphDef = generateMermaidGraph(currentNodes, edges);

        app.innerHTML = `
            <a href="#" class="back-link">← Back to Boards</a>
            <div class="detail-header">
                <div>
                    <span class="chip" style="margin-bottom:0.5rem">v${board.version || '0.0.1'}</span>
                    <h1>${board.title}</h1>
                </div>
                <p style="color:var(--text-secondary); max-width:800px;">${board.description || "No description available."}</p>
            </div>
            
            <div class="detail-layout">
                <div class="main-panel">
                     <div class="panel" style="margin-bottom: 2rem; min-height:450px; display:flex; flex-direction:column">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem">
                            <h3 style="margin:0">Visual Logic Flow</h3>
                            <span title="A map showing how data moves between different AI and human steps." style="font-size:0.7rem; color:var(--text-secondary); cursor:help; border-bottom:1px dotted var(--text-secondary)">What is this?</span>
                        </div>
                        <div class="mermaid" style="flex:1; display:flex; justify-content:center; padding:1rem;">
                            <!-- SVG will be injected here -->
                        </div>
                        
                        <div class="graph-legend" style="display:flex; gap:1rem; justify-content:center; padding:0.5rem; border-top:1px solid rgba(255,255,255,0.05); font-size:0.75rem; margin-top: auto;">
                            <div style="display:flex; align-items:center; gap:0.4rem">
                                <span style="width:10px; height:10px; background:#2e3b4e; border:1px solid #03dac6; border-radius:2px;"></span>
                                <span style="color:var(--text-secondary)">Input</span>
                            </div>
                            <div style="display:flex; align-items:center; gap:0.4rem">
                                <span style="width:10px; height:10px; background:#1f1f2e; border:1px solid #bb86fc; border-radius:2px;"></span>
                                <span style="color:var(--text-secondary)">Process</span>
                            </div>
                            <div style="display:flex; align-items:center; gap:0.4rem">
                                <span style="width:10px; height:10px; background:#3e2e2e; border:1px solid #ffb74d; border-radius:2px;"></span>
                                <span style="color:var(--text-secondary)">Output</span>
                            </div>
                        </div>
                        <details style="margin-top:1rem; font-size:0.7rem;">
                            <summary style="color:var(--text-secondary); cursor:pointer;">Show Raw Syntax (Debug)</summary>
                            <pre style="background:rgba(0,0,0,0.3); padding:0.5rem; margin-top:0.5rem; color:#888; overflow:auto;">${graphDef}</pre>
                        </details>
                    </div>
                    
                     <div class="panel">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem">
                            <h3 style="margin:0">Board Glossary</h3>
                            <span title="A guide to what each component in this board actually does." style="font-size:0.7rem; color:var(--text-secondary); cursor:help; border-bottom:1px dotted var(--text-secondary)">What is this?</span>
                        </div>
                         <div class="node-list">
                            ${currentNodes.map((node: any) => {
            let typeClass = 'worker';
            if (node.type === 'input') typeClass = 'input';
            if (node.type === 'output') typeClass = 'output';
            const friendlyName = node.configuration?.title || formatNodeLabel(node.id);
            const description = getNodeDescription(node);
            return `
                                <div class="node-item" style="cursor:pointer" onclick="showNodeInspector('${node.id}')">
                                    <div style="display:flex; flex-direction:column">
                                        <span style="font-weight:600">${friendlyName}</span>
                                        <span style="font-size:0.8rem; color:var(--text-secondary); line-height:1.4">${description}</span>
                                    </div>
                                    <span class="node-type ${typeClass}">${node.type}</span>
                                </div>`;
        }).join('')}
                        </div>
                    </div>
                </div>
                
                <div class="side-panel">
                    <div id="inspector-panel" class="panel" style="margin-bottom: 1.5rem; display:none; border-color:var(--accent-color)">
                        <h3 style="display:flex; justify-content:space-between; align-items:center">
                            Inspect Node
                            <button id="close-inspector" style="background:none; border:none; color:var(--text-secondary); cursor:pointer; font-size:1.2rem; line-height:1">&times;</button>
                        </h3>
                        <div id="inspector-content" style="font-size:0.9rem; margin-top:0.5rem"></div>
                    </div>

                    <div class="panel run-panel">
                        <h3 style="color:var(--accent-color)">⚡ Run Board</h3>
                         <div style="margin-bottom:1.5rem">
                             ${inputs.length > 0 ? getInputsForm(inputs) : '<p style="font-size:0.9rem; color:var(--text-secondary)">No inputs required.</p>'}
                        </div>
                        <button id="run-btn" class="btn" style="width:100%;">Run Board</button>
                    </div>
                    
                    <div id="result-panel" class="panel" style="margin-top: 1.5rem; display:none; border-color:var(--success-color)">
                        <h3>Result</h3>
                        <pre id="output-area" style="overflow:auto; max-height:300px; font-size:0.8rem; margin-top:0.5rem"></pre>
                    </div>
                    
                     <div class="panel" style="margin-top: 1.5rem">
                        <h3>Board Details</h3>
                        <ul style="list-style:none; font-size:0.9rem; color:var(--text-secondary);">
                            <li>Nodes: ${currentNodes.length}</li>
                            <li>Edges: ${edges.length}</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;

        const runBtn = document.getElementById('run-btn');
        if (runBtn) {
            runBtn.onclick = () => runBoard(slug, inputs);
        }

        const closeBtn = document.getElementById('close-inspector');
        if (closeBtn) {
            closeBtn.onclick = () => {
                const panel = document.getElementById('inspector-panel');
                if (panel) panel.style.display = 'none';
            };
        }

        // Render Mermaid
        if (mermaid) {
            try {
                const { svg, bindFunctions } = await mermaid.render('mermaid-svg-' + Date.now().toString().replace(/\./g, ''), graphDef);
                const mContainer = app.querySelector('.mermaid');
                if (mContainer) {
                    mContainer.innerHTML = svg;
                    if (bindFunctions) bindFunctions(mContainer);

                    // Add click listeners to nodes
                    mContainer.querySelectorAll('.node').forEach(nodeEl => {
                        (nodeEl as HTMLElement).style.cursor = 'pointer';
                        nodeEl.addEventListener('click', (e) => {
                            e.preventDefault();
                            e.stopPropagation();

                            // Try to find the node ID from currentIdMap
                            // Mermaid IDs look like "mermaid-svg-123-n0" or "flowchart-n0-123"
                            const idAttr = nodeEl.id || '';
                            console.log("Clicked node with ID:", idAttr);

                            for (const [nodeId, safeId] of currentIdMap.entries()) {
                                if (idAttr.includes(safeId) || nodeEl.classList.contains(safeId)) {
                                    showNodeInspector(nodeId);
                                    return;
                                }
                            }
                        });
                    });
                }
            } catch (err) {
                console.error("Mermaid render failed", err);
                const mContainer = app.querySelector('.mermaid');
                if (mContainer) {
                    mContainer.innerHTML = `<div style="padding:1rem; color:#ffb74d; background:rgba(255,183,77,0.1); border-radius:8px;">
                        <strong>Graph rendering error:</strong><br/>
                        <span style="font-size:0.8rem; font-family:monospace">${(err as Error).message}</span>
                    </div>`;
                }
            }
        } else {
            const mContainer = app.querySelector('.mermaid');
            if (mContainer) mContainer.innerHTML = '<div style="color:var(--text-secondary)">Initializing Graph Engine...</div>';
            setTimeout(() => renderBoardDetail(slug), 500);
        }

    } catch (e) {
        app.innerHTML = `<p style="color:red">Error loading board ${slug}: ${(e as Error).message}</p><a href="#" class="btn-secondary">Go Back</a>`;
    }
}

function highlightNode(nodeId: string, status: 'active' | 'done' | 'error' | 'none') {
    const safeId = currentIdMap.get(nodeId);
    if (!safeId) return;

    // Mermaid renders nodes as <g class="node ..."> with an ID like "flowchart-n0-123"
    // We search for elements that contain our safeId in their ID
    const nodeEl = document.querySelector(`.mermaid g.node[id*="-${safeId}-"]`);
    if (!nodeEl) return;

    // Remove existing state classes
    nodeEl.classList.remove('active-step', 'done-step', 'error-step');

    if (status === 'active') nodeEl.classList.add('active-step');
    else if (status === 'done') nodeEl.classList.add('done-step');
    else if (status === 'error') nodeEl.classList.add('error-step');
}

async function runBoard(slug: string, inputsList: any[]) {
    const btn = document.getElementById('run-btn');
    const resultPanel = document.getElementById('result-panel');
    const outputArea = document.getElementById('output-area');

    if (!btn || !resultPanel || !outputArea) return;

    const inputValues: Record<string, any> = {};
    for (const input of inputsList) {
        const el = document.getElementById(`input-${input.id}`) as HTMLInputElement;
        if (el) {
            inputValues[input.id] = el.value;
        }
    }

    // Reset UI
    btn.textContent = '⏹ Stop Run';
    resultPanel.style.display = 'block';
    outputArea.textContent = 'Starting streaming execution...\n';
    outputArea.style.color = 'var(--text-secondary)';

    // Clear previous highlights
    document.querySelectorAll('.mermaid g.node').forEach(el => {
        el.classList.remove('active-step', 'done-step', 'error-step');
    });

    const params = new URLSearchParams();
    params.append('slug', slug);
    params.append('inputs', JSON.stringify(inputValues));

    const eventSource = new EventSource(`/api/run-stream?${params.toString()}`);

    const cleanup = () => {
        eventSource.close();
        btn.textContent = 'Run Board';
        btn.onclick = () => runBoard(slug, inputsList);
    };

    eventSource.addEventListener('node-start', (e) => {
        const data = JSON.parse((e as MessageEvent).data);
        outputArea.textContent += `[Start] ${data.id} (${data.type})\n`;
        highlightNode(data.id, 'active');
        outputArea.scrollTop = outputArea.scrollHeight;
    });

    eventSource.addEventListener('node-end', (e) => {
        const data = JSON.parse((e as MessageEvent).data);
        outputArea.textContent += `[Done] ${data.id}\n`;
        highlightNode(data.id, 'done');
        outputArea.scrollTop = outputArea.scrollHeight;
    });

    eventSource.addEventListener('output', (e) => {
        const data = JSON.parse((e as MessageEvent).data);
        outputArea.textContent += `[Output] ${JSON.stringify(data, null, 2)}\n`;
        outputArea.scrollTop = outputArea.scrollHeight;
    });

    eventSource.addEventListener('error', (e) => {
        const data = JSON.parse((e as MessageEvent).data);
        outputArea.textContent += `[Error] ${data.message}\n`;
        outputArea.style.color = '#cf6679';
        cleanup();
    });

    eventSource.addEventListener('done', () => {
        outputArea.textContent += `--- Execution Complete ---\n`;
        cleanup();
    });

    btn.onclick = () => {
        outputArea.textContent += `[User] Execution stopped.\n`;
        cleanup();
    };
}

function getInputsForm(inputs: any[]) {
    return inputs.map(input => `
        <div style="margin-bottom:1rem">
            <label style="display:block; font-size:0.8rem; margin-bottom:0.3rem; color:var(--text-secondary)">${input.id}</label>
            <input type="text" id="input-${input.id}" 
                   placeholder="Enter value"
                   style="width:100%; padding:0.5rem; background:rgba(0,0,0,0.2); border:1px solid var(--card-border); color:var(--text-primary); border-radius:4px;">
        </div>
    `).join('');
}

function showNodeInspector(nodeId: string) {
    const node = currentNodes.find(n => n.id === nodeId);
    const panel = document.getElementById('inspector-panel');
    const content = document.getElementById('inspector-content');
    if (!node || !panel || !content) return;

    panel.style.display = 'block';

    content.innerHTML = `
        <div style="margin-bottom:1rem">
            <label style="font-size:0.7rem; color:var(--text-secondary); display:block; margin-bottom:0.2rem">ID</label>
            <div style="font-weight:600; font-family:var(--font-mono)">${node.id}</div>
        </div>
        <div style="margin-bottom:1rem">
            <label style="font-size:0.7rem; color:var(--text-secondary); display:block; margin-bottom:0.2rem">TYPE</label>
            <span class="chip">${node.type}</span>
        </div>
        <div>
            <label style="font-size:0.7rem; color:var(--text-secondary); display:block; margin-bottom:0.2rem">CONFIGURATION</label>
            <pre style="background:rgba(0,0,0,0.2); padding:0.5rem; border-radius:4px; font-size:0.75rem; overflow:auto; max-height:250px">${JSON.stringify(node.configuration || {}, null, 2)}</pre>
        </div>
    `;
}

// Router
function handleRoute() {
    try {
        const hash = window.location.hash.substring(1);
        if (hash.startsWith('board/')) {
            const slug = hash.replace('board/', '');
            renderBoardDetail(slug);
        } else {
            renderHome();
        }
    } catch (e) {
        const app = getApp();
        if (app) app.innerHTML = `<div style="color:red; padding:2rem;">Route Error: ${(e as Error).message}</div>`;
        console.error(e);
    }
}

window.addEventListener('hashchange', handleRoute);
window.addEventListener('load', () => {
    try {
        handleRoute();
    } catch (e) {
        const app = getApp();
        if (app) app.innerHTML = `<div style="color:red; padding:2rem;">Init Error: ${(e as Error).message}</div>`;
    }
});

initMermaid();

// Expose to window for inline onclick handlers
(window as any).showNodeInspector = showNodeInspector;

