const fs = require('fs');
const path = require('path');

const WORKSPACE_ROOT = path.resolve(__dirname, '../../../../');
const LOG_FILE = path.join(WORKSPACE_ROOT, 'Agent Ralph Instructions/progress_log.txt');
const CHANGELOG_FILE = path.join(WORKSPACE_ROOT, 'CHANGELOG.md');
const README_FILE = path.join(WORKSPACE_ROOT, 'README.md');

function parseLog(logContent) {
    const entries = [];
    const lines = logContent.split('\n');
    let currentEntry = {};

    lines.forEach(line => {
        const iterationMatch = line.match(/^\[Iteration (.*)\]/);
        const taskMatchLegacy = line.match(/- Task: (\d+) \((.*)\)/);
        const taskMatchHeader = line.match(/^### Task ID (\d+): (.*)/);
        const actionMatch = line.match(/- Action: (.*)/);

        if (iterationMatch || taskMatchHeader) {
            if (currentEntry.id) {
                entries.push(currentEntry);
            }
            currentEntry = {
                date: iterationMatch ? iterationMatch[1] : new Date().toDateString(),
                id: null,
                title: '',
                action: ''
            };
        }

        if (taskMatchLegacy) {
            currentEntry.id = taskMatchLegacy[1];
            currentEntry.title = taskMatchLegacy[2];
        } else if (taskMatchHeader) {
            currentEntry.id = taskMatchHeader[1];
            currentEntry.title = taskMatchHeader[2];
        }

        if (actionMatch) {
            currentEntry.action = actionMatch[1];
        }
    });

    if (currentEntry.id) {
        entries.push(currentEntry);
    }

    return entries;
}

function updateChangelog(entries) {
    let changelogContent = '';
    if (fs.existsSync(CHANGELOG_FILE)) {
        changelogContent = fs.readFileSync(CHANGELOG_FILE, 'utf8');
    } else {
        changelogContent = '# Changelog\n\n';
    }

    let newEntriesCount = 0;
    entries.forEach(entry => {
        const entryHeader = `### Task ${entry.id}: ${entry.title}`;
        if (!changelogContent.includes(entryHeader)) {
            const newEntry = `\n${entryHeader}\n- ${entry.action}\n`;
            changelogContent += newEntry;
            newEntriesCount++;
        }
    });

    if (newEntriesCount > 0) {
        fs.writeFileSync(CHANGELOG_FILE, changelogContent);
        console.log(`[Auto-Docs] Added ${newEntriesCount} entries to CHANGELOG.md`);
    } else {
        console.log('[Auto-Docs] CHANGELOG.md is up to date.');
    }
}

function updateReadme(entries) {
    // Determine the last 5 entries
    const recent = entries.slice(-5).reverse();
    let readmeContent = '';

    if (fs.existsSync(README_FILE)) {
        readmeContent = fs.readFileSync(README_FILE, 'utf8');
    } else {
        readmeContent = '# Project\n\n## Recent Progress\n\n';
    }

    // Construct new Recent Progress section
    let progressSection = '## Recent Progress\n\n';
    recent.forEach(entry => {
        progressSection += `- **Task ${entry.id}**: ${entry.title}\n`;
    });
    progressSection += '\n(Automatically updated by Ralph)\n';

    // Regex to replace existing section or append
    const progressRegex = /## Recent Progress[\s\S]*?(?=\n##|$)/;

    if (progressRegex.test(readmeContent)) {
        readmeContent = readmeContent.replace(progressRegex, progressSection.trim());
    } else {
        readmeContent += '\n' + progressSection;
    }

    fs.writeFileSync(README_FILE, readmeContent);
    console.log('[Auto-Docs] Updated README.md recent progress.');
}

if (fs.existsSync(LOG_FILE)) {
    console.log(`[Auto-Docs] Reading log from ${LOG_FILE}...`);
    const content = fs.readFileSync(LOG_FILE, 'utf8');
    const entries = parseLog(content);
    updateChangelog(entries);
    updateReadme(entries);
} else {
    console.warn(`[Auto-Docs] Log file not found: ${LOG_FILE}`);
}
