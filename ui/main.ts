

// Mermaid will be loaded dynamically
// Poke to force Vite refresh: 01:58
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

    app.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:2rem">
            <h1 style="margin:0">My AI Tools</h1>
            <span style="font-size:0.9rem; color:var(--text-secondary)">Select a tool to get started</span>
        </div>
        <div class="board-grid" id="grid">Loading...</div>
    `;

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
            const friendlyTitle = board.title || formatNodeLabel(board.id || '');
            const displayVersion = (board.version === '0.0.1' || !board.version) ? 'Initial Release' : `v${board.version}`;

            card.innerHTML = `
                <h3 style="margin-bottom:0.5rem">${friendlyTitle}</h3>
                <p class="description" style="flex:1; margin-bottom:1.5rem; color:var(--text-secondary); font-size:0.9rem; line-height:1.5">${board.description || 'Customizable AI workflow for various tasks.'}</p>
                <div class="meta" style="display:flex; justify-content:space-between; align-items:center">
                    <span class="chip" style="font-size:0.65rem; opacity:0.8">${displayVersion}</span>
                    <span style="color:var(--accent-color); font-size:0.8rem; font-weight:600">Open Tool →</span>
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

// Track execution progress
let nodesTotal = 0;
let nodesCompleted = 0;
let executionStartTime = 0;
let timerInterval: any = null;

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

    // New Nodes
    if (type.includes('visualarchitect')) return "Acts as a Motion Designer, defining the visual style, animations, and assets for each scene.";
    if (type.includes('voiceover')) return "Generates AI voiceovers (TTS) for each scene's script.";
    if (type.includes('assetsourcing')) return "Fetches or generates the actual image assets requested by the Visual Architect.";
    if (type.includes('renderer')) return "Sends the final video structure to the Bridge Server to trigger the Remotion render.";

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
        graph += `    ${safeId}["${label}"]\n`;
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

    if (!app.innerHTML.includes('detail-header')) {
        app.innerHTML = '<div style="text-align:center; padding:2rem;">Loading Board...</div>';
    }

    try {
        const response = await fetch(`/api/${slug}.json`);
        const board = await response.json();
        currentNodes = board.nodes || [];
        const edges = board.edges || [];
        const inputs = currentNodes.filter((n: any) => n.type === 'input');

        const graphDef = generateMermaidGraph(currentNodes, edges);

        const isInitialVersion = board.version === '0.0.1' || !board.version;
        const versionBadge = isInitialVersion ? '' : `<span class="chip" style="margin-bottom:0.5rem">v${board.version}</span>`;

        app.innerHTML = `
            <div class="breadcrumb-nav">
                <a href="#">My AI Tools</a>
                <span class="breadcrumb-sep">/</span>
                <span style="color:var(--text-primary)">${board.title || formatNodeLabel(slug)}</span>
            </div>

            <div class="detail-header" style="display:flex; justify-content:space-between; align-items:flex-start">
                <div style="flex:1">
                    ${versionBadge}
                    <h1 style="margin-top:0.5rem">${board.title || formatNodeLabel(slug)}</h1>
                    <p style="color:var(--text-secondary); max-width:800px; font-size:1.1rem; line-height:1.5">${board.description || "Interactive AI assistant powered by Breadboard."}</p>
                </div>
                <button class="btn btn-secondary" onclick="copyToolLink()" style="display:flex; align-items:center; gap:0.5rem; font-size:0.85rem; padding: 0.6rem 1rem">
                    <span>🔗</span> Share tool
                </button>
            </div>
            
            <div class="detail-layout" style="display:block">
                <div id="flow-health" class="health-banner" style="display:none">
                    <div class="health-stat">
                        <span class="health-label">Status</span>
                        <span id="health-status" class="health-value">IDLE</span>
                    </div>
                    <div class="health-stat" style="flex:1">
                        <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem">
                            <span class="health-label">Flow Progress</span>
                            <span id="health-progress-text" class="health-value">0%</span>
                        </div>
                        <div class="progress-container">
                            <div id="health-progress-bar" class="progress-bar"></div>
                        </div>
                    </div>
                    <div class="health-stat">
                        <span class="health-label">Elapsed Time</span>
                        <span id="health-timer" class="health-value">0.0s</span>
                    </div>
                </div>

                <div class="guide-box">
                    <div class="guide-title">
                        <span>👋</span> Quick Start Guide
                    </div>
                    <div class="guide-grid">
                        <div class="guide-step">
                            <h4>1. Read the Flow</h4>
                            <ul>
                                <li><strong>Visual Logic Flow</strong>: A map showing exactly how data moves through this tool.</li>
                                <li><strong>Board Glossary</strong>: A plain-English guide to every component and its role.</li>
                            </ul>
                        </div>
                        <div class="guide-step">
                            <h4>2. Take Action</h4>
                            <ul>
                                <li><strong>Inputs</strong>: Fill in the prompt or settings in the right-hand panel.</li>
                                <li><strong>Run Board</strong>: Click the purple button to start. Watch the flow light up!</li>
                            </ul>
                        </div>
                    </div>
                    <div style="margin-top:1rem; font-size:0.7rem; color:var(--text-secondary); text-align:right">
                        <span style="cursor:pointer; text-decoration:underline" onclick="this.parentElement.parentElement.style.display='none'">Got it, hide help</span>
                    </div>
                </div>

                <div class="detail-grid" style="display: grid; grid-template-columns: 2fr 1fr; gap: 2rem;">
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
                                <div id="glossary-${node.id}" class="node-item" style="cursor:pointer" onclick="showNodeInspector('${node.id}')">
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

                    <div id="historical-results" class="panel" style="margin-top: 1.5rem">
                        <h3 style="display:flex; justify-content:space-between; align-items:center">
                            Run History
                            <span style="font-size:0.7rem; color:var(--text-secondary); cursor:help" title="Previous runs of this board.">ℹ️</span>
                        </h3>
                        <div id="results-list" style="margin-top:0.5rem">
                            <p style="font-size:0.8rem; color:var(--text-secondary)">Scanning for history...</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Fetch Historical Results
        fetch(`/api/results?slug=${slug}`)
            .then(res => res.json())
            .then(results => {
                const listEl = document.getElementById('results-list');
                if (!listEl) return;
                if (results.length === 0) {
                    listEl.innerHTML = '<p style="font-size:0.8rem; color:var(--text-secondary)">No previous runs found.</p>';
                    return;
                }
                listEl.innerHTML = results.slice(0, 5).map((r: any) => `
                    <div style="padding:0.75rem; background:rgba(255,255,255,0.03); border-radius:8px; margin-bottom:0.5rem; cursor:pointer; border:1px solid rgba(255,255,255,0.05); transition:background 0.2s" onclick="window.location.hash='board/${slug}/result/${r.id}'" class="result-history-item">
                        <div style="display:flex; justify-content:space-between; align-items:center">
                            <span style="font-weight:600; font-size:0.8rem; color:var(--text-primary)">Run #${r.id.substring(0, 4)}</span>
                            <span style="font-size:0.6rem; color:var(--text-secondary)">${new Date(r.startTime).toLocaleTimeString()}</span>
                        </div>
                        <div style="font-size:0.7rem; color:var(--text-secondary); margin-top:0.2rem; text-overflow:ellipsis; overflow:hidden; white-space:nowrap">
                            ${JSON.stringify(r.inputs)}
                        </div>
                    </div>
                `).join('');
            });

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
                            const idAttr = nodeEl.id || '';
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
            // Wait for Mermaid without clearing the whole app again
            const mContainer = app.querySelector('.mermaid');
            if (mContainer) mContainer.innerHTML = '<div style="color:var(--text-secondary)">Initializing Graph Engine...</div>';

            // Re-render only the Mermaid part after a delay if needed, 
            // but for now, just wait for the global init to finish.
            let retries = 0;
            const checkMermaid = setInterval(() => {
                if (mermaid || retries > 20) {
                    clearInterval(checkMermaid);
                    if (mermaid) {
                        // Trigger one more full render now that engines are ready
                        renderBoardDetail(slug);
                    }
                }
                retries++;
            }, 500);
        }

    } catch (e) {
        app.innerHTML = `<p style="color:red">Error loading board ${slug}: ${(e as Error).message}</p><a href="#" class="btn-secondary">Go Back</a>`;
    }
}

function highlightNode(nodeId: string, status: 'active' | 'done' | 'error' | 'none') {
    const safeId = currentIdMap.get(nodeId);
    if (!safeId) return;

    // 1. Highlight Mermaid Graph Node
    const nodeEl = document.querySelector(`.mermaid g.node[id*="-${safeId}-"]`);
    if (nodeEl) {
        nodeEl.classList.remove('active-step', 'done-step', 'error-step');
        if (status === 'active') nodeEl.classList.add('active-step');
        else if (status === 'done') nodeEl.classList.add('done-step');
        else if (status === 'error') nodeEl.classList.add('error-step');
    }

    // 2. Highlight Board Glossary Item
    const glossaryEl = document.getElementById(`glossary-${nodeId}`);
    if (glossaryEl) {
        glossaryEl.classList.remove('active-step', 'done-step', 'error-step');
        if (status === 'active') glossaryEl.classList.add('active-step');
        else if (status === 'done') glossaryEl.classList.add('done-step');
        else if (status === 'error') glossaryEl.classList.add('error-step');

        // Highlight logic remains, but we remove the jarring auto-scroll
        // that was shifting the whole page.
    }
}

async function runBoard(slug: string, inputsList: any[]) {
    const btn = document.getElementById('run-btn');
    const resultPanel = document.getElementById('result-panel');
    const outputArea = document.getElementById('output-area');

    // Health UI elements
    const healthBanner = document.getElementById('flow-health');
    const healthStatus = document.getElementById('health-status');
    const healthProgressText = document.getElementById('health-progress-text');
    const healthProgressBar = document.getElementById('health-progress-bar');
    const healthTimer = document.getElementById('health-timer');

    if (!btn || !resultPanel || !outputArea) return;

    const inputValues: Record<string, any> = {};
    for (const input of inputsList) {
        const schema = input.configuration?.schema;
        const properties = schema?.properties || {};
        const propertyEntries = Object.entries(properties);

        if (propertyEntries.length === 0) {
            const el = document.getElementById(`input-${input.id}`) as HTMLInputElement;
            if (el) inputValues[input.id] = el.value;
        } else {
            const nodeInputObj: Record<string, any> = {};
            for (const [key] of propertyEntries) {
                const el = document.getElementById(`input-${input.id}-${key}`) as HTMLInputElement;
                if (el) nodeInputObj[key] = el.value;
            }
            // For Breadboard run(), usually inputs are merged into a flat object 
            // but nested under the node ID if it's a specific input node?
            // Actually Breadboard.run() usually expects the actual values.
            Object.assign(inputValues, nodeInputObj);
        }
    }

    // Reset Execution State
    nodesTotal = currentNodes.length;
    nodesCompleted = 0;
    executionStartTime = Date.now();
    if (timerInterval) clearInterval(timerInterval);

    // Reset UI
    btn.textContent = '⏹ Stop Run';
    resultPanel.style.display = 'block';
    outputArea.innerHTML = ''; // Clear for structured view

    if (healthBanner) healthBanner.style.display = 'flex';
    if (healthStatus) {
        healthStatus.textContent = 'RUNNING';
        healthStatus.style.color = 'var(--accent-color)';
    }

    // Start Timer
    timerInterval = setInterval(() => {
        const elapsed = ((Date.now() - executionStartTime) / 1000).toFixed(1);
        if (healthTimer) healthTimer.textContent = `${elapsed}s`;
    }, 100);

    const updateProgress = () => {
        const percent = Math.round((nodesCompleted / nodesTotal) * 100);
        if (healthProgressText) healthProgressText.textContent = `${percent}%`;
        if (healthProgressBar) healthProgressBar.style.width = `${percent}%`;
    };
    updateProgress();

    // Clear previous highlights
    document.querySelectorAll('.active-step, .done-step, .error-step').forEach(el => {
        el.classList.remove('active-step', 'done-step', 'error-step');
    });

    const params = new URLSearchParams();
    params.append('slug', slug);
    params.append('inputs', JSON.stringify(inputValues));

    const eventSource = new EventSource(`/api/run-stream?${params.toString()}`);

    const cleanup = (finalStatus: 'SUCCESS' | 'ERROR' | 'IDLE') => {
        eventSource.close();
        clearInterval(timerInterval);
        btn.textContent = 'Run Board';
        btn.onclick = () => runBoard(slug, inputsList);

        if (healthStatus) {
            healthStatus.textContent = finalStatus;
            healthStatus.style.color = finalStatus === 'SUCCESS' ? 'var(--success-color)' : (finalStatus === 'ERROR' ? '#cf6679' : 'var(--text-secondary)');
        }
    };

    const getOrCreateNodeBucket = (nodeId: string) => {
        let bucket = document.getElementById(`output-bucket-${nodeId}`);
        if (!bucket) {
            bucket = document.createElement('div');
            bucket.id = `output-bucket-${nodeId}`;
            bucket.className = 'output-bucket';
            bucket.style.marginBottom = '1.5rem';
            bucket.style.padding = '1rem';
            bucket.style.background = 'rgba(255,255,255,0.03)';
            bucket.style.borderRadius = '8px';
            bucket.style.borderLeft = '4px solid var(--accent-color)';

            const label = formatNodeLabel(nodeId);
            bucket.innerHTML = `<div style="font-weight:600; font-size:0.8rem; margin-bottom:0.5rem; color:var(--accent-color)">${label}</div>
                                <pre style="margin:0; font-size:0.75rem; color:var(--text-secondary); white-space:pre-wrap;"></pre>`;
            outputArea.appendChild(bucket);
        }
        return bucket.querySelector('pre');
    };

    eventSource.addEventListener('node-start', (e) => {
        const data = JSON.parse((e as MessageEvent).data);
        highlightNode(data.id, 'active');
        showEdgePill(data.id, 'Starting...');
        const bucketPre = getOrCreateNodeBucket(data.id);
        if (bucketPre) bucketPre.textContent = `[Processing...]\n`;
    });

    eventSource.addEventListener('node-end', (e) => {
        const data = JSON.parse((e as MessageEvent).data);
        highlightNode(data.id, 'done');
        nodesCompleted++;
        updateProgress();
        const bucketPre = getOrCreateNodeBucket(data.id);
        if (bucketPre) {
            const outputs = data.outputs || {};
            bucketPre.textContent = ''; // Clear processing message
            if (Object.keys(outputs).length > 0) {
                bucketPre.textContent += `${JSON.stringify(outputs, null, 2)}\n`;
            }
            bucketPre.textContent += `[Completed]`;
        }
    });

    eventSource.addEventListener('done', (e) => {
        const data = JSON.parse((e as MessageEvent).data);
        nodesCompleted = nodesTotal;
        updateProgress();
        cleanup('SUCCESS');

        // Show final result in the dedicated panel
        if (resultPanel) resultPanel.style.display = 'block';
        if (outputArea) {
            const outputs = data.outputs || {};
            let richContent = '';

            // Check for video_url to render a player
            if (outputs.video_url) {
                richContent += `
                    <div style="margin-top:1rem; margin-bottom:1rem; background:black; border-radius:8px; overflow:hidden">
                        <video controls src="${outputs.video_url}" style="width:100%; display:block;"></video>
                    </div>
                    <div style="text-align:center; margin-bottom:1rem; display:flex; justify-content:center; gap:0.5rem">
                        <a href="${outputs.video_url}" target="_blank" class="btn btn-secondary" style="text-decoration:none; font-size:0.8rem">⬇️ Download</a>
                        <button class="btn" style="font-size:0.8rem; background:var(--accent-color)" onclick="runVisualQA('${data.runId}')">🔍 Quick QA (Frames)</button>
                        <button class="btn" style="font-size:0.8rem; background:#fb8c00" onclick="runDeepAnalysis('${data.runId}')">🎬 Deep Analysis (Video)</button>
                    </div>
                    <div id="analysis-results-${data.runId}" style="margin-top:1rem; display:none; padding:1rem; background:rgba(255,255,255,0.05); border-radius:8px; border:1px solid rgba(255,255,255,0.1)">
                        <div id="analysis-loader-${data.runId}" style="text-align:center; color:var(--text-secondary); font-size:0.9rem">Analyzing...</div>
                        <div id="analysis-content-${data.runId}"></div>
                    </div>
                `;
            }

            const finalBucket = document.createElement('div');
            finalBucket.className = 'output-bucket';
            finalBucket.style.cssText = "border-left: 4px solid var(--success-color); background: rgba(var(--success-color-rgb), 0.1); padding: 1rem; border-radius: 8px; margin-top: 2rem;";
            finalBucket.innerHTML = `<div style="font-weight:700; color:var(--success-color); margin-bottom:0.5rem">✨ BOARD EXECUTION COMPLETE</div>
                                      ${richContent}
                                      <details>
                                          <summary style="fontSize:0.8rem; color:var(--text-secondary); cursor:pointer">View Raw Output JSON</summary>
                                          <pre style="margin:0; font-size:0.8rem; margin-top:0.5rem">${JSON.stringify(outputs, null, 2)}</pre>
                                      </details>`;
            outputArea.appendChild(finalBucket);
            outputArea.scrollTop = outputArea.scrollHeight;
        }

        // Refresh history
        if (data.runId) {
            // ... (keep history logic)
            setTimeout(() => {
                const listEl = document.getElementById('results-list');
                if (listEl) {
                    const item = document.createElement('div');
                    item.className = 'result-history-item';
                    item.style.cssText = "padding:0.75rem; background:rgba(255,255,255,0.03); border-radius:8px; margin-bottom:0.5rem; cursor:pointer; border:1px solid rgba(255,255,255,0.05); transition:background 0.2s;";
                    item.innerHTML = `
                        <div style="display:flex; justify-content:space-between; align-items:center">
                            <span style="font-weight:600; font-size:0.8rem; color:var(--text-primary)">Run #${data.runId.substring(0, 4)}</span>
                            <span style="font-size:0.6rem; color:var(--text-secondary)">Just now</span>
                        </div>
                    `;
                    item.onclick = () => window.location.hash = `board/${slug}/result/${data.runId}`;
                    if (listEl.firstChild && listEl.firstChild.nodeName === 'DIV' && !listEl.firstChild.textContent?.includes('No previous runs')) {
                        listEl.insertBefore(item, listEl.firstChild);
                    } else {
                        listEl.innerHTML = '';
                        listEl.appendChild(item);
                    }
                }
            }, 1000);
        }
    });

    eventSource.addEventListener('output', (e) => {
        // Output event is redundant with node-end for displaying data in buckets
        // but we'll use it to show a pill on the graph
        const data = JSON.parse((e as MessageEvent).data);
        const activeNode = document.querySelector('.node-item.active-step');
        const nodeId = activeNode ? activeNode.id.replace('glossary-', '') : 'unknown';

        if (nodeId !== 'unknown') {
            const snippet = typeof data === 'object' ? Object.keys(data)[0] || 'data' : String(data);
            showEdgePill(nodeId, snippet);
        }
    });

    eventSource.addEventListener('error', (e) => {
        const data = JSON.parse((e as MessageEvent).data);
        const activeNode = document.querySelector('.node-item.active-step');
        const nodeId = activeNode ? activeNode.id.replace('glossary-', '') : 'error';
        highlightNode(nodeId, 'error');
        const bucketPre = getOrCreateNodeBucket(nodeId);
        if (bucketPre) {
            bucketPre.textContent += `[Error] ${data.message}\n`;
            bucketPre.style.color = '#cf6679';
        }
        cleanup('ERROR');
    });

    btn.onclick = () => {
        cleanup('IDLE');
    };
}

function getInputsForm(inputs: any[]) {
    return inputs.map(input => {
        const schema = input.configuration?.schema;
        const properties = schema?.properties || {};
        const propertyEntries = Object.entries(properties);

        if (propertyEntries.length === 0) {
            const friendlyLabel = input.configuration?.title || formatNodeLabel(input.id);
            return `
                <div style="margin-bottom:1.5rem">
                    <label style="display:block; font-size:0.85rem; font-weight:600; margin-bottom:0.5rem; color:var(--text-primary)">${friendlyLabel}</label>
                    <input type="text" id="input-${input.id}" 
                           placeholder="Enter value..."
                           style="width:100%; padding:0.75rem; background:rgba(0,0,0,0.3); border:1px solid var(--card-border); color:var(--text-primary); border-radius:8px; font-size:0.9rem;">
                </div>
            `;
        }

        return propertyEntries.map(([key, prop]: [string, any]) => {
            const friendlyLabel = prop.title || formatNodeLabel(key);
            const isMainPrompt = key.toLowerCase().includes('topic') || key.toLowerCase().includes('prompt');
            const placeholder = isMainPrompt ? "What should the AI write about?" : `Enter ${friendlyLabel.toLowerCase()}...`;
            const defaultValue = prop.default || "";

            return `
                <div style="margin-bottom:1.5rem">
                    <label style="display:block; font-size:0.85rem; font-weight:600; margin-bottom:0.5rem; color:var(--text-primary)">${friendlyLabel}</label>
                    <input type="text" id="input-${input.id}-${key}" 
                           placeholder="${placeholder}"
                           value="${defaultValue}"
                           style="width:100%; padding:0.75rem; background:rgba(0,0,0,0.3); border:1px solid var(--card-border); color:var(--text-primary); border-radius:8px; font-size:0.9rem;">
                    ${prop.description ? `<div style="font-size:0.7rem; color:var(--text-secondary); margin-top:0.3rem">${prop.description}</div>` : ''}
                </div>
            `;
        }).join('');
    }).join('');
}

function showNodeInspector(nodeId: string) {
    const node = currentNodes.find(n => n.id === nodeId);
    const panel = document.getElementById('inspector-panel');
    const content = document.getElementById('inspector-content');
    if (!node || !panel || !content) return;

    panel.style.display = 'block';
    const friendlyTitle = node.configuration?.title || formatNodeLabel(node.id);
    const configEntries = Object.entries(node.configuration || {})
        .filter(([key]) => key !== 'title' && key !== 'description')
        .map(([key, value]) => {
            const friendlyKey = formatNodeLabel(key);
            const displayValue = typeof value === 'object' ? JSON.stringify(value, null, 2) : value;
            return `
                <div style="margin-bottom:1rem">
                    <label style="font-size:0.7rem; color:var(--text-secondary); display:block; margin-bottom:0.2rem; text-transform:uppercase">${friendlyKey}</label>
                    <div style="font-weight:500; font-family:var(--font-mono); font-size:0.85rem; word-break:break-all">${displayValue}</div>
                </div>
            `;
        }).join('');

    content.innerHTML = `
        <div style="margin-bottom:1.5rem">
            <h2 style="margin:0; font-size:1.2rem">${friendlyTitle}</h2>
            <p style="font-size:0.8rem; color:var(--text-secondary); margin-top:0.4rem; line-height:1.4">${getNodeDescription(node)}</p>
        </div>
        
        <div style="margin-bottom:1.5rem">
             <label style="font-size:0.7rem; color:var(--text-secondary); display:block; margin-bottom:0.2rem">ROLE</label>
             <span class="chip" style="text-transform:uppercase; font-size:0.6rem">${node.type}</span>
        </div>

        ${configEntries}

        <details style="margin-top:2rem; border-top:1px solid var(--card-border); padding-top:1rem">
            <summary style="font-size:0.7rem; color:var(--text-secondary); cursor:pointer">Advanced / Developer Settings</summary>
            <div style="margin-top:1rem; font-size:0.7rem; color:var(--text-secondary)">
                <div style="margin-bottom:0.8rem">
                    <strong>Internal Node ID:</strong> <code style="background:rgba(255,255,255,0.05)">${node.id}</code>
                </div>
                <div style="font-size:0.65rem">
                    <strong>Raw Configuration:</strong>
                    <pre style="background:rgba(0,0,0,0.4); padding:0.5rem; margin-top:0.4rem; border-radius:4px; max-height:200px; overflow:auto">${JSON.stringify(node.configuration || {}, null, 2)}</pre>
                </div>
            </div>
        </details>
    `;
}

// Router
function handleRoute() {
    try {
        const hash = window.location.hash.substring(1);
        if (hash.startsWith('board/')) {
            const parts = hash.split('/');
            if (parts.length === 4 && parts[2] === 'result') {
                renderResultDetail(parts[1], parts[3]);
            } else {
                renderBoardDetail(parts[1]);
            }
        } else {
            renderHome();
        }
    } catch (e) {
        const app = getApp();
        if (app) app.innerHTML = `<div style="color:red; padding:2rem;">Route Error: ${(e as Error).message}</div>`;
        console.error(e);
    }
}
async function renderResultDetail(slug: string, resultId: string) {
    const app = getApp();
    if (!app) return;

    app.innerHTML = '<div style="text-align:center; padding:2rem;">Loading Result Trace...</div>';

    try {
        const response = await fetch(`/api/result?id=${resultId}`);
        const result = await response.json();

        app.innerHTML = `
            <div class="breadcrumb-nav">
                <a href="#">My AI Tools</a>
                <span class="breadcrumb-sep">/</span>
                <a href="#board/${slug}">${formatNodeLabel(slug)}</a>
                <span class="breadcrumb-sep">/</span>
                <span style="color:var(--text-primary)">Run History</span>
            </div>

            <div class="detail-header" style="margin-bottom:2rem">
                <h1 style="margin:0">Run History: #${resultId.substring(0, 8)}</h1>
                <div style="display:flex; align-items:center; gap:0.5rem; margin-top:0.5rem">
                    <p style="color:var(--text-secondary); margin:0">Executed on ${new Date(result.startTime).toLocaleString()}</p>
                    <span class="chip" style="font-size:0.6rem; opacity:0.5">UI v1.3 (Smart Filtered)</span>
                </div>
            </div>

            <div class="panel" style="max-width:900px; margin:0 auto">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem">
                    <h3>Execution Trace</h3>
                    ${(() => {
                // Check if we have a valid video structure to render
                const hasVideoStructure = result.trace.some((s: any) =>
                    s.data?.outputs?.video_structure || s.data?.video_structure
                );
                if (hasVideoStructure) {
                    return `<button id="render-btn" class="run-button" style="padding:0.5rem 1rem; font-size:0.8rem">🎬 Render Video</button>`;
                }
                return '';
            })()}
                </div>
                <div id="video-embed-container" style="margin-bottom:2rem; display:none;"></div>
                
                <div id="render-progress-box" style="margin-bottom:2rem; display:none; background:rgba(255,255,255,0.05); padding:1.5rem; border-radius:12px; border:1px solid rgba(255,255,255,0.1)">
                    <div style="display:flex; justify-content:space-between; margin-bottom:0.8rem">
                        <span style="font-weight:600; font-size:0.9rem">🎬 Rendering Video...</span>
                        <span id="render-percent" style="font-family:var(--font-mono); font-size:0.9rem; color:var(--accent-color)">0%</span>
                    </div>
                    <div style="height:8px; background:rgba(0,0,0,0.3); border-radius:4px; overflow:hidden">
                        <div id="render-bar" style="height:100%; width:0%; background:linear-gradient(90deg, var(--accent-color), #03dac6); transition:width 0.3s ease"></div>
                    </div>
                    <p style="font-size:0.75rem; color:var(--text-secondary); margin-top:1rem; margin-bottom:0">This usually takes 30-60 seconds depending on complexity.</p>
                </div>

                <div id="trace-list" style="margin-top:1.5rem">
                    ${(() => {
                const groups: Record<string, any> = {};
                const orderedIds: string[] = [];

                // Pass 1: Group events by node or special type
                result.trace.forEach((step: any) => {
                    if (step.type === 'beforehandler' || step.type === 'afterhandler') {
                        const id = step.data.node.id;
                        if (!groups[id]) {
                            groups[id] = { type: 'node', id, start: step, end: null };
                            orderedIds.push(id);
                        }
                        if (step.type === 'afterhandler') groups[id].end = step;
                    } else if (step.type === 'output' || step.type === 'input') {
                        // Only add board-level output if it's NOT redundant with a node output
                        // Usually board outputs appear near the end. We'll tag them.
                        const pseudoId = `${step.type}-special-${orderedIds.length}`;
                        groups[pseudoId] = { type: 'special', step };
                        orderedIds.push(pseudoId);
                    }
                });

                // Pass 2: Deduplicate Board-level Output against the Output Node
                // If we have an 'output' node and a 'special' output event with the same data, 
                // we'll hide the special one to reduce clutter.
                const finalNodesOutputs = Object.values(groups)
                    .filter((g: any) => g.type === 'node' && g.end?.data?.outputs)
                    .map((g: any) => JSON.stringify(g.end.data.outputs));

                return orderedIds.map((id) => {
                    const group = groups[id];
                    if (!group) return '';

                    let icon = '⚙️';
                    let label = 'Step';
                    let content = '';
                    let color = 'var(--text-secondary)';
                    let timestamp = '';

                    if (group.type === 'special') {
                        const step = group.step;
                        // Skip board-level output if it just repeats what the last node said
                        if (step.type === 'output' && finalNodesOutputs.includes(JSON.stringify(step.data))) {
                            return '';
                        }

                        timestamp = step.timestamp;
                        if (step.type === 'input') {
                            icon = '📥';
                            label = 'Inputs Received';
                            content = `<pre style="font-size:0.75rem; background:rgba(0,0,0,0.2); padding:0.5rem; margin-top:0.5rem; border-radius:4px;">${JSON.stringify(step.data, null, 2)}</pre>`;
                        } else {
                            icon = '📤';
                            label = 'Board Result';
                            content = `<pre style="font-size:0.75rem; background:rgba(0,0,0,0.2); padding:0.5rem; margin-top:0.5rem; border-radius:4px;">${JSON.stringify(step.data, null, 2)}</pre>`;
                        }
                    } else {
                        const start = group.start;
                        const end = group.end;
                        timestamp = start.timestamp;
                        icon = end ? '✅' : '⏳';
                        label = formatNodeLabel(start.data.node.id);
                        color = end ? 'var(--success-color)' : 'var(--accent-color)';

                        if (end) {
                            const rawData = end.data.outputs || {};
                            // DATA CLEANUP: Hide redundant keys like 'fullData' or 'video_structure' 
                            // if they are just wraps of the primary keys.
                            const cleanData: Record<string, any> = {};
                            Object.entries(rawData).forEach(([key, value]) => {
                                if (key === 'fullData' || key === 'video_structure') return; // Skip known redundant containers
                                cleanData[key] = value;
                            });

                            content = `<div style="font-size:0.7rem; color:rgba(255,255,255,0.3); font-family:var(--font-mono); margin-bottom:0.3rem">ID: ${start.data.node.id}</div>
                                               <pre style="font-size:0.75rem; background:rgba(0,0,0,0.2); padding:0.5rem; border-radius:4px; max-height:400px; overflow:auto;">${JSON.stringify(cleanData, null, 2)}</pre>`;
                        } else {
                            content = `<div style="font-size:0.75rem; color:var(--text-secondary); margin-top:0.5rem">No data yielded by this node.</div>`;
                        }
                    }

                    return `
                                <div style="display:flex; gap:1.5rem; margin-bottom:1.5rem; position:relative">
                                    <div style="width:1.5rem; height:1.5rem; border-radius:50%; background:rgba(255,255,255,0.05); display:flex; align-items:center; justify-content:center; flex-shrink:0; font-size:0.8rem; z-index:1">${icon}</div>
                                    <div style="flex:1">
                                        <div style="font-weight:600; font-size:0.9rem; color:${color}">${label}</div>
                                        <div style="font-size:0.65rem; color:var(--text-secondary); margin-top:0.1rem">${new Date(timestamp).toLocaleTimeString()}</div>
                                        ${content}
                                    </div>
                                </div>
                            `;
                }).join('');
            })()}
                </div>
            </div>
        `;

        // Attach event listener for Render Video
        const renderBtn = document.getElementById('render-btn');
        const progressBox = document.getElementById('render-progress-box');
        const progressBar = document.getElementById('render-bar');
        const progressText = document.getElementById('render-percent');
        const videoContainer = document.getElementById('video-embed-container');

        const startPolling = (rId: string, videoUrl: string) => {
            if (progressBox) progressBox.style.display = 'block';
            if (renderBtn) {
                renderBtn.textContent = '⏳ Rendering...';
                renderBtn.setAttribute('disabled', 'true');
            }

            const pollId = setInterval(async () => {
                try {
                    const statusResp = await fetch(`/api/render-status?runId=${rId}`);
                    const status = await statusResp.json();

                    if (progressBar) progressBar.style.width = `${status.progress}%`;
                    if (progressText) progressText.textContent = `${status.progress}%`;

                    if (status.complete || status.error) {
                        clearInterval(pollId);
                        if (progressBox) progressBox.style.display = 'none';

                        if (status.complete) {
                            if (renderBtn) renderBtn.textContent = '✅ Rendered';
                            if (videoContainer) {
                                videoContainer.style.display = 'block';
                                videoContainer.innerHTML = `
                                    <div style="background:black; border-radius:8px; padding:1rem; text-align:center">
                                        <video controls autoplay loop style="max-height:600px; max-width:100%">
                                            <source src="${videoUrl}" type="video/mp4">
                                            Your browser does not support the video tag.
                                        </video>
                                        <div style="margin-top:1rem; font-size:0.8rem; color:var(--text-secondary)">
                                            <a href="${videoUrl}" download style="color:var(--accent-color)">Download Video</a>
                                        </div>
                                    </div>
                                `;
                            }
                        } else {
                            if (renderBtn) {
                                renderBtn.textContent = '❌ Failed';
                                renderBtn.removeAttribute('disabled');
                            }
                            alert("Rendering failed on the server.");
                        }
                    }
                } catch (e) {
                    console.error("Status check failed", e);
                }
            }, 1000);
        };

        // AUTO-CHECK: See if a render is already happening or done
        (async () => {
            try {
                const statusResp = await fetch(`/api/render-status?runId=${resultId}`);
                const status = await statusResp.json();
                const videoUrl = `/videos/${resultId}.mp4`;

                if (status.complete) {
                    if (renderBtn) renderBtn.textContent = '✅ View Video';
                    if (videoContainer) {
                        videoContainer.style.display = 'block';
                        videoContainer.innerHTML = `
                            <div style="background:black; border-radius:8px; padding:1rem; text-align:center">
                                <video controls loop style="max-height:600px; max-width:100%">
                                    <source src="${videoUrl}" type="video/mp4">
                                    Your browser does not support the video tag.
                                </video>
                                <div style="margin-top:1rem; font-size:0.8rem; color:var(--text-secondary)">
                                    <a href="${videoUrl}" download style="color:var(--accent-color)">Download Video</a>
                                </div>
                            </div>
                        `;
                    }
                } else if (status.progress > 0 && status.progress < 100) {
                    startPolling(resultId, videoUrl);
                }
            } catch (e) { /* silent check */ }
        })();

        if (renderBtn) {
            renderBtn.onclick = async () => {
                const videoStruct = result.trace.find((s: any) => s.data?.outputs?.video_structure || s.data?.video_structure);
                if (!videoStruct) {
                    alert("Could not find video structure data in this run.");
                    return;
                }
                const structure = videoStruct.data?.outputs?.video_structure || videoStruct.data?.video_structure;

                renderBtn.textContent = '⏳ Starting Render...';
                renderBtn.setAttribute('disabled', 'true');
                renderBtn.style.opacity = '0.7';

                try {
                    const resp = await fetch('/api/render', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ video_structure: structure, runId: resultId })
                    });
                    const data = await resp.json();

                    if (data.success) {
                        if (data.status === 'complete') {
                            renderBtn.textContent = '✅ Loaded';
                            renderResultDetail(slug, resultId);
                        } else {
                            startPolling(resultId, data.video_url || `/videos/${resultId}.mp4`);
                        }
                    } else {
                        renderBtn.textContent = '❌ Failed';
                        alert("Rendering failed: " + (data.error || 'Unknown error'));
                        renderBtn.removeAttribute('disabled');
                        renderBtn.style.opacity = '1';
                    }
                } catch (e) {
                    renderBtn.textContent = '❌ Error';
                    console.error(e);
                    renderBtn.removeAttribute('disabled');
                    renderBtn.style.opacity = '1';
                }
            };
        }
    } catch (e) {
        app.innerHTML = `<div style="color:red; padding:2rem;">Failed to load result: ${(e as Error).message}</div>`;
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
(window as any).copyToolLink = () => {
    navigator.clipboard.writeText(window.location.href);
    const btn = document.querySelector('.btn-secondary');
    if (btn) {
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span>✅</span> Copied!';
        setTimeout(() => { btn.innerHTML = originalText; }, 2000);
    }
};

function showEdgePill(fromNodeId: string, dataSnippet: string) {
    const safeFromId = currentIdMap.get(fromNodeId);
    if (!safeFromId) return;

    // Try to find the Mermaid node element
    const nodeEl = document.querySelector(`.mermaid g.node[id*="-${safeFromId}-"]`);
    if (!nodeEl) return;

    const rect = nodeEl.getBoundingClientRect();
    const pill = document.createElement('div');
    pill.className = 'edge-pill';
    pill.textContent = dataSnippet.length > 20 ? dataSnippet.substring(0, 20) + '...' : dataSnippet;

    // Position near the node
    pill.style.left = `${rect.left + rect.width / 2}px`;
    pill.style.top = `${rect.top}px`;

    document.body.appendChild(pill);
    setTimeout(() => pill.remove(), 2500);
}

// --- Video Analysis Handlers ---

(window as any).runVisualQA = async (runId: string) => {
    const loader = document.getElementById(`analysis-loader-${runId}`);
    const content = document.getElementById(`analysis-content-${runId}`);
    const panel = document.getElementById(`analysis-results-${runId}`);
    if (!loader || !content || !panel) return;

    panel.style.display = 'block';
    loader.style.display = 'block';
    loader.textContent = 'Capturing Stills & Analyzing Frames...';
    content.innerHTML = '';

    try {
        // Fetch the actual result manifest to get video_structure
        const res = await fetch(`/api/result?id=${runId}`);
        const runData = await res.json();

        // Find the assembler output (video_structure)
        const assemblerNode = runData.trace.findLast((t: any) => t.data?.node?.id?.includes('assembler'))?.data?.outputs;
        const video_structure = assemblerNode?.video_structure;

        if (!video_structure) throw new Error("Could not find video structure in run trace.");

        const response = await fetch('/api/visual-qa', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ video_structure, runId })
        });
        const result = await response.json();

        if (!result.success) throw new Error(result.error || "Analysis failed");

        loader.style.display = 'none';
        renderAnalysisReport(content, result.report, result.screenshots, "Quick Frame Analysis");
    } catch (e: any) {
        loader.textContent = `Error: ${e.message}`;
        loader.style.color = '#cf6679';
    }
};

(window as any).runDeepAnalysis = async (runId: string) => {
    const loader = document.getElementById(`analysis-loader-${runId}`);
    const content = document.getElementById(`analysis-content-${runId}`);
    const panel = document.getElementById(`analysis-results-${runId}`);
    if (!loader || !content || !panel) return;

    panel.style.display = 'block';
    loader.style.display = 'block';
    loader.textContent = 'Uploading Video to Gemini (2.5 Flash)... This may take 30-60s.';
    content.innerHTML = '';

    try {
        const response = await fetch('/api/analyze-video', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ runId })
        });
        const result = await response.json();

        if (!result.success) throw new Error(result.error || "Deep analysis failed");

        loader.style.display = 'none';
        renderAnalysisReport(content, result.report, null, "Native Video Analysis");
    } catch (e: any) {
        loader.textContent = `Error: ${e.message}`;
        loader.style.color = '#cf6679';
    }
};

function renderAnalysisReport(container: HTMLElement, report: any, screenshots: string[] | null, title: string) {
    let shotsHtml = '';
    if (screenshots) {
        shotsHtml = `<div style="display:flex; gap:0.5rem; margin-bottom:1rem; overflow-x:auto; padding-bottom:0.5rem">
            ${screenshots.map(s => `<img src="${s}" style="height:80px; border-radius:4px; border:1px solid rgba(255,255,255,0.1)">`).join('')}
        </div>`;
    }

    const scoreColor = report.score >= 80 ? 'var(--success-color)' : (report.score >= 60 ? '#ffb74d' : '#cf6679');

    container.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem">
            <h4 style="margin:0">${title}</h4>
            <div style="font-size:1.2rem; font-weight:800; color:${scoreColor}">${report.score}/100</div>
        </div>
        ${shotsHtml}
        <div style="font-size:0.85rem; color:var(--text-primary); line-height:1.5; margin-bottom:1rem; white-space:pre-wrap">${report.critique}</div>
        <div style="background:rgba(0,0,0,0.2); padding:0.75rem; border-radius:6px;">
            <div style="font-size:0.7rem; color:var(--text-secondary); text-transform:uppercase; margin-bottom:0.4rem; font-weight:700">Suggestions for Improvement</div>
            <ul style="margin:0; padding-left:1.2rem; font-size:0.8rem; color:var(--text-secondary)">
                ${report.improvement_suggestions.map((s: string) => `<li style="margin-bottom:0.3rem">${s}</li>`).join('')}
            </ul>
        </div>
        <div style="margin-top:1.5rem; text-align:center">
            <button class="btn" style="width:100%; background:var(--success-color); font-weight:700" onclick="applyFeedback('${container.id.split('-').pop()}', \`${report.critique.replace(/`/g, '\\`').replace(/\n/g, '\\n')}\`)">✨ Apply Feedback & Rerender</button>
        </div>
    `;
}

(window as any).applyFeedback = async (runId: string, critique: string) => {
    console.log(`[Feedback Loop] Applying critique for ${runId}...`);

    try {
        // 1. Fetch original run data to get the inputs
        const res = await fetch(`/api/result?id=${runId}`);
        const runData = await res.json();
        const inputs = runData.inputs || {};
        const slug = runData.slug;

        // 2. Prepare new inputs with the critique injected
        const newInputs = {
            ...inputs,
            visual_critique: critique
        };

        // 3. Scroll to the run panel and populate it (visual feedback for user)
        const topicInput = document.querySelector('input[id*="topic"]') as HTMLInputElement;
        const critiqueInput = document.querySelector('input[id*="visual_critique"]') as HTMLInputElement;

        if (topicInput && inputs.topic) topicInput.value = inputs.topic;
        if (critiqueInput) {
            critiqueInput.value = critique;
            critiqueInput.parentElement?.scrollIntoView({ behavior: 'smooth' });

            // Highlight the critique input to show it changed
            critiqueInput.style.borderColor = 'var(--success-color)';
            critiqueInput.style.boxShadow = '0 0 10px var(--success-color)';
            setTimeout(() => {
                critiqueInput.style.borderColor = '';
                critiqueInput.style.boxShadow = '';
            }, 2000);
        }

        // 4. Trigger a new run
        console.log(`[Feedback Loop] Starting Pass 2 for ${slug}...`);
        // We can't easily call the internal runBoard if inputs are not in elements, 
        // but we've populated the elements above, so we can just click "Run Board"
        const runBtn = document.getElementById('run-btn');
        if (runBtn) {
            runBtn.click();
        }
    } catch (e: any) {
        alert(`Failed to apply feedback: ${e.message}`);
    }
};
